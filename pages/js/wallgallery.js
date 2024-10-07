var $event = $.event,
$special,
resizeTimeout, userid = sessionStorage.getItem("UserID");

$special = $event.special.debouncedresize = {
	setup: function() {
		$( this ).on( "resize", $special.handler );
	},
	teardown: function() {
		$( this ).off( "resize", $special.handler );
	},
	handler: function( event, execAsap ) {
		// Save the context
		var context = this,
			args = arguments,
			dispatch = function() {
				// set correct event type
				event.type = "debouncedresize";
				$event.dispatch.apply( context, args );
			};

		if ( resizeTimeout ) {
			clearTimeout( resizeTimeout );
		}

		execAsap ?
			dispatch() :
			resizeTimeout = setTimeout( dispatch, $special.threshold );
	},
	threshold: 250
};

var BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

$.fn.imagesLoaded = function( callback ) {
	var $this = this,
		deferred = $.isFunction($.Deferred) ? $.Deferred() : 0,
		hasNotify = $.isFunction(deferred.notify),
		$images = $this.find('img').add( $this.filter('img') ),
		loaded = [],
		proper = [],
		broken = [];

	// Register deferred callbacks
	if ($.isPlainObject(callback)) {
		$.each(callback, function (key, value) {
			if (key === 'callback') {
				callback = value;
			} else if (deferred) {
				deferred[key](value);
			}
		});
	}

	function doneLoading() {
		var $proper = $(proper),
			$broken = $(broken);

		if ( deferred ) {
			if ( broken.length ) {
				deferred.reject( $images, $proper, $broken );
			} else {
				deferred.resolve( $images );
			}
		}

		if ( $.isFunction( callback ) ) {
			callback.call( $this, $images, $proper, $broken );
		}
	}

	function imgLoaded( img, isBroken ) {
		// don't proceed if BLANK image, or image is already loaded
		if ( img.src === BLANK || $.inArray( img, loaded ) !== -1 ) {
			return;
		}

		// store element in loaded images array
		loaded.push( img );

		// keep track of broken and properly loaded images
		if ( isBroken ) {
			broken.push( img );
		} else {
			proper.push( img );
		}

		// cache image and its state for future calls
		$.data( img, 'imagesLoaded', { isBroken: isBroken, src: img.src } );

		// trigger deferred progress method if present
		if ( hasNotify ) {
			deferred.notifyWith( $(img), [ isBroken, $images, $(proper), $(broken) ] );
		}

		// call doneLoading and clean listeners if all images are loaded
		if ( $images.length === loaded.length ){
			setTimeout( doneLoading );
			$images.unbind( '.imagesLoaded' );
		}
	}

	// if no images, trigger immediately
	if ( !$images.length ) {
		doneLoading();
	} else {
		$images.bind( 'load.imagesLoaded error.imagesLoaded', function( event ){
			// trigger imgLoaded
			imgLoaded( event.target, event.type === 'error' );
		}).each( function( i, el ) {
			var src = el.src;

			var cached = $.data( el, 'imagesLoaded' );
			if ( cached && cached.src === src ) {
				imgLoaded( el, cached.isBroken );
				return;
			}

		if ( el.complete && el.naturalWidth !== undefined ) {
				imgLoaded( el, el.naturalWidth === 0 || el.naturalHeight === 0 );
				return;
			}

		if ( el.readyState || el.complete ) {
				el.src = BLANK;
				el.src = src;
			}
		});
	}

	return deferred ? deferred.promise( $this ) : $this;
};
var $gallery, $itemsContainer, $items, $resultArray;
var Gallery = (function() {
	
	var $window = $( window ),
		winsize = getWindowSize(),

		defaults = {
			speed : 800,
			easing : 'ease-in-out',
			margin : 400
		},
		// css transitions and 3d transforms support
		support = { transitions : Modernizr.csstransitions, transforms3d : Modernizr.csstransforms3d },
		transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		},
		transformNames = {
			'WebkitTransform' : '-webkit-transform',
			'MozTransform' : '-moz-transform',
			'OTransform' : '-o-transform',
			'msTransform' : '-ms-transform',
			'transform' : 'transform'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ] + '.cbpFWSlider',
		transformName = transformNames[ Modernizr.prefixed( 'transform' ) ];

	
	function init(settings, jumpToIndex) {
        Gallery.settings = $.extend(true, {}, defaults, settings);
        // preload images
        $itemsContainer.imagesLoaded(function() {
            buildRoom();
            if (jumpToIndex !== undefined && jumpToIndex >= 0 && jumpToIndex < Gallery.room.totalItems) {
                Gallery.room.jump(jumpToIndex);
            }
        });
    }

	function buildRoom() {
		// create room with 4 walls
		Gallery.room = new Room( $items );
		// now show first wall (show elements of first wall)
		Gallery.room.renderWall();
		//console.log($items);
		initEvents();
	}

	function Room( $items ) {

		this.$el = $( '<div class="gr-room"><div class="gr-wall-main"><div class="gr-floor"></div></div></div>' ).insertAfter( $itemsContainer );
		if( winsize.width > 1300 ) {
			this.$el.css( 'perspective', 1700 );
		}
		this.transitionSettings = transformName + ' ' + Gallery.settings.speed + 'ms ' + Gallery.settings.easing;
		// element representing the wall
		this.$mainWall = this.$el.find( 'div.gr-wall-main' ).css( 'transition', this.transitionSettings );
		// 4 walls (or 1 if no support for 3dtransforms)
		this.walls = [];
		// current rendered wall
		this.currentWall = 0; // 0,1,2,3
		// current item being shown
		this.currentItem = 0;
		// total number of items
		this.totalItems = $items.length;
		// is walking
		this.walking = false;
		this.caption = -1;
		this.create();

	}

	Room.prototype = {

		create : function() {

			// check on settings.layout
			this.layout = typeof Gallery.settings.layout != 'undefined' && Gallery.settings.layout instanceof Array && support.transforms3d ? Gallery.settings.layout : this.getLayoutSettings();
			
			var pos = 0, max = 0, prev = 0,
				wallsCount = support.transforms3d ? 4 : 1;

			for( var i = 0; i < wallsCount; ++i ) {

				var nmb = this.layout[ i ];
				max = nmb + prev;
				prev += nmb;
				var wall = new Wall( $items.slice( pos, max ).clone() );
				pos = max;
				this.walls.push( wall );

			}

			// add navigation
			if( this.totalItems > 1 ) {
				this.$navPrev = $( '<span class="gr-prev">prev</span>' ).on( 'click', $.proxy( this.navigate, this, 'prev' ) );
				this.$navNext = $( '<span class="gr-next">next</span>' ).on( 'click', $.proxy( this.navigate, this, 'next' ) );
				this.$nav = $( '<nav/>' ).append( this.$navPrev, this.$navNext ).appendTo( $gallery );
			}

			// add caption container
			this.$caption = $( '<div class="gr-caption"><span class="gr-caption-close">x</span></div>' ).appendTo( $gallery );
			this.$caption.find( 'span.gr-caption-close' ).on( 'click', $.proxy( this.hideDescription, this ) );

			// click on item's caption
			var self = this;
			this.$el.on( 'click', 'figure > figcaption', function() {
				var $caption = $( this ),
					$item = $caption.parent(), 
					idx = $item.index() - 1;
				
				if( self.caption === self.currentItem && idx === self.currentItem ) {
					return false;
				}
				else if( idx !== self.currentItem ) {
					self.jump( idx, function() {
						self.showDescription( $caption, idx );
					} );
				}
				else {
					self.showDescription( $caption, idx );
				}
				
			} );

			// click items
            this.$el.on('click', 'figure > div > .ltab > .fa-comment', function () {
				var commentIconId = $(this).attr('id');
				//console.log("Clicked on second ltab div");
				//console.log("Comment Icon ID:", commentIconId);
				openCommentsDiv(commentIconId, imgArrayPencil);
			});
			
			

			this.$el.on('click', 'figure > div > .ltab > .fa-thumbs-up', function () {
				//console.log($(this).attr("id"));
				if(userid){
				var picID = $(this).attr("id");
				var thumbsUpIcon = $(this);
				var likesCountSpan = thumbsUpIcon.siblings().filter(function() {
					return $(this).attr('id') && $(this).attr('id').startsWith('sl');
				});
				var likesLabelSpan = thumbsUpIcon.siblings().filter(function() {
					return $(this).attr('id') && $(this).attr('id').startsWith('nl');
				});
				
				//var likesLabelSpan = thumbsUpIcon.siblings('#nl1');
			
				if (thumbsUpIcon.hasClass("unliked")) {
					thumbsUpIcon.removeClass("unliked").addClass("liked");
					likesCountSpan.text(parseInt(likesCountSpan.text()) + 1);
				} else {
					thumbsUpIcon.removeClass("liked").addClass("unliked");
					likesCountSpan.text(parseInt(likesCountSpan.text()) - 1);
				}
			
				likesLabelSpan.text(parseInt(likesCountSpan.text()) < 2 ? "Like" : "Likes");
				updateLike(picID, imgArrayPencil, likesCountSpan);
			} else {
                showConfirmationDialog("Please log in to like or post a comment", 'Message', function () {
                    $("#authDiv").fadeIn(500);
                });  
        }
			});
			
			this.$el.on( 'click', 'figure > div', function() {
				var $item = $( this ).parent(), idx = $item.index() - 1;
				if( idx === self.currentItem ) {
					return false;
				}
				self.jump( idx );
			} );

		},
		getLayoutSettings: function() {
			var $resultArrayLength = $resultArray.length;
			var perwall = Math.floor(this.totalItems / 4);
			var lastwall = perwall + this.totalItems % 4;
			var wallConfig = [];
		
			if ($resultArrayLength === 1) {
				wallConfig.push(support.transforms3d ? perwall : this.totalItems);
			} else {
				for (var i = 0; i < Math.min($resultArrayLength, 4); i++) {
					wallConfig.push(perwall);
				}
				wallConfig[wallConfig.length - 1] = lastwall;
			}
		
			return wallConfig;
		}
		,
		// displays the items of a wall on a container $wallElem
		renderWall : function( $wallElem ) {

			var $wallElem = $wallElem || this.$mainWall,
				wallH = $wallElem.height(),
				wallmargins = 150,
				wall = this.walls[ this.currentWall ],
				totalLeft = 0, lastItemW = 0,
				wallMarginLeft = 0, sumWidths = 0;

			for( var i = 0; i < wall.itemsCount; ++i ) {

				var $item = wall.$items.eq( i );

				$item.appendTo( $wallElem );

				var itemH = $item.height(),
					figcaptionH = $item.find( 'figcaption' ).outerHeight( true );

				if( itemH > wallH - wallmargins ) {
					$item.find('img').height( wallH - wallmargins - figcaptionH );
					$item.css( 'top', ( wallmargins / 2 ));
				}
				else {
					$item.css( 'top', ( wallH - itemH ) / 2 );
				}
				
				var itemW = wall.widths[i] || $item.width();
				
				sumWidths += itemW;

				if( i === 0 ) {
					totalLeft = winsize.width / 2 - itemW / 2;
					wallMarginLeft = Math.ceil(totalLeft);
				}
				else {
					totalLeft += lastItemW + Gallery.settings.margin;
				}

				lastItemW = itemW;

				$item.css( { left : totalLeft } );
				wall.widths[i] = itemW;

			};

			// update wall element's width
			var wallWidth = wallMarginLeft === 0 ? winsize.width : Math.ceil( wallMarginLeft + ( wall.itemsCount - 1 ) * Gallery.settings.margin + sumWidths + winsize.width / 2 - lastItemW / 2 );
			$wallElem.css( 'width', wallWidth ).find( 'div.gr-floor' ).css( 'width', wallWidth );

		},
		changeWall : function( dir ) {

			// set origins
			// change current wall's width to windows width and reorganize items accordingly:
			this.$mainWall.css( {
				transition : 'none',
				transformOrigin : dir === 'next' ? '100% 50%' : '0% 50%',
				width : winsize.width,
				transform : 'translateX(0px)',
				backgroundPosition : this.$mainWall.data( 'translationVal' ) + 'px 0px'
			} );
	
			this.walls[ this.lastWall ].$items.css( 'left','+=' + this.$mainWall.data( 'translationVal' ) );

			// update floor
			this.$mainWall.find( 'div.gr-floor' ).css( {
				width : winsize.width,
				backgroundPosition : this.$mainWall.data( 'translationVal' ) + 'px 0px'
			} );
			
			// set transition again
			this.$mainWall.css('transition', this.transitionSettings );

			// the incoming wall..
			this.$auxWall = $( '<div class="gr-wall-other"><div class="gr-floor"></div></div>' ).insertAfter( this.$mainWall );
			var auxfloor = this.$auxWall.find( 'div.gr-floor' );

			// add next wall's items to $auxWall
			this.renderWall( this.$auxWall );

			var auxWallWidth = this.$auxWall.width(),
				auxWallInitialTranslationVal = dir === 'next' ? winsize.width : auxWallWidth * -1 + ( auxWallWidth - winsize.width ) * 1,
				auxWallInitialAngle = dir === 'next' ? -90 : 90,
				auxWallTransform = support.transforms3d ?
					'translate3d(' + auxWallInitialTranslationVal + 'px,0px,0px) rotate3d(0,1,0,' + auxWallInitialAngle + 'deg)' :
					'translate(' + auxWallInitialTranslationVal + 'px)';
			
			this.$auxWall.css( {
				transform : auxWallTransform,
				transformOrigin : dir === 'next' ? '0% 50%' : '100% 50%'
			} );

			// change aux wall's width to windows width and reorganize items accordingly:
			this.$auxWall.data( 'width', auxWallWidth ).css( 'width', winsize.width );
			auxfloor.css( 'width', winsize.width );

			if(dir === 'prev') {
				this.walls[ this.currentWall ].$items.css( 'left', '-=' + ( auxWallWidth - winsize.width ) );
				var bgpos = ( ( auxWallWidth - winsize.width ) * -1 ) + 'px 0px';
				this.$auxWall.css( 'background-position', bgpos );
				auxfloor.css( 'background-position', bgpos );
			}

			setTimeout( $.proxy( function() {
				
				var translationVal = this.$mainWall.data( 'translationVal' ) || 0,
					mainWallFinalTranslationVal = dir === 'next' ? - winsize.width : (translationVal - winsize.width) * -1,
					mainWallFinalAngle = dir === 'next' ? 90 : -90,
					mainWallFinalTransform = support.transforms3d ?
						'translate3d(' + mainWallFinalTranslationVal + 'px,0px,0px) rotate3d(0,1,0,' + mainWallFinalAngle + 'deg)' :
						'translate(' + mainWallFinalTranslationVal + 'px)';

					auxWallFinalTranslationVal = dir === 'next' ? 0 : 0,
					auxWallFinalAngle = 0,
					auxWallFinalTransform = support.transforms3d ?
						'translate3d(' + auxWallFinalTranslationVal + 'px,0px,0px) rotate3d(0,1,0,' + auxWallFinalAngle + 'deg)' :
						'translate(' + auxWallFinalTranslationVal + 'px)';

				this.$mainWall.css( 'transform', mainWallFinalTransform );
				
				this.$auxWall.css( {
					transition : this.transitionSettings,
					transform : auxWallFinalTransform
				} ).on( transEndEventName, $.proxy( function() {
					
					// set original width
					this.$auxWall.off( transEndEventName ).css( 'width', this.$auxWall.data( 'width' ) );
					auxfloor.css( 'width', this.$auxWall.data( 'width' ) );

					if( dir === 'prev' ) {
						
						// reset transform value and reorganize items accordingly
						this.$auxWall.css( {
							transition : 'none',
							transform : 'translateX(' + ( ( auxWallWidth - winsize.width ) * -1 ) + 'px)',
							backgroundPosition : '0px 0px'
						} );

						var wall = this.walls[ this.currentWall ],
							$lastItem = wall.$items.eq( wall.itemsCount - 1 );
						
						// reorganize items accordingly
						wall.$items.css( 'left', '+=' + ( auxWallWidth - winsize.width ) );
						auxfloor.css( 'background-position', '0px 0px' );

						// set transition again
						this.$auxWall.css( 'transition', this.transitionSettings );

						var translationVal = $lastItem.length > 0 ? - ( $lastItem.position().left + $lastItem.width() / 2 - winsize.width / 2 ) : 0;
						this.$auxWall.data( 'translationVal', translationVal );

					}

					this.switchWalls();
					this.walking = false;

				}, this ) );

			}, this ), 25 );

		},
		switchWalls : function() {

			this.$mainWall.remove();
			this.$mainWall = this.$auxWall.addClass( 'gr-wall-main' ).removeClass( 'gr-wall-other' );

		},
		navigate : function( dir ) {

			// if animating return
			if( this.walking ) {
				return false;
			}

			this.walking = true;
			
			var wall = this.walls[ this.currentWall ],
				wallItemsCount = wall.itemsCount,
				changeWall = false;

			// check on direction and update currentItem and currentWall value
			if( dir === 'next' ) {

				if( support.transforms3d ) {
					if( this.currentItem < wallItemsCount - 1 ) {
						++this.currentItem;
					}
					else {

						this.lastWall = this.currentWall;
						// update current wall
						this.currentWall < 3 ? ++this.currentWall : this.currentWall = 0;
						// update wall
						wall = this.walls[ this.currentWall ];
						changeWall = true;
						// reset currentItem
						this.currentItem = 0;

					}
				}
				else if( this.currentItem < wallItemsCount - 1 ) {
					++this.currentItem;
				}
				else {
					this.walking = false;
					return false;
				}

			}
			else if( dir === 'prev' ) {

				if( support.transforms3d ) {
					if( this.currentItem > 0 ) {
						--this.currentItem;
					}
					else {

						this.lastWall = this.currentWall;
						// update current wall
						this.currentWall > 0 ? --this.currentWall : this.currentWall = 3;			
						// update wall
						wall = this.walls[ this.currentWall ];
						changeWall = true;
						// reset currentItem
						this.currentItem = wall.itemsCount - 1;

					}
				}
				else if( this.currentItem > 0 ) {
					--this.currentItem;
				}
				else {
					this.walking = false;
					return false;
				}

			}

			if( changeWall ) {
				changeWall = false;
				this.changeWall( dir );
			}
			else {
				this.jump();
			}

		},

        jump: function(pos, callback) {
			var jumpnow = $.proxy(function() {
				if (typeof pos !== 'undefined') {
					this.currentItem = pos;
				}
		
				var wall = this.walls[this.currentWall];
				if (this.currentItem >= 0 && this.currentItem < wall.itemsCount) {
					var $item = wall.$items.eq(this.currentItem),
						translationVal = -($item.position().left + $item.width() / 2 - winsize.width / 2),
						transformVal = 'translate3d(' + translationVal + 'px,0px,0px)',
						afterAnim = function() {
							this.$mainWall.off(transEndEventName);
							this.walking = false;
							if (callback) {
								callback.call();
							}
						};
		
					this.$mainWall.data('translationVal', translationVal);
		
					if (support.transitions && support.transforms3d) {
						this.$mainWall.css('transform', transformVal).on(transEndEventName, $.proxy(afterAnim, this));
					} else {
						this.$mainWall.stop().animate({ left: translationVal }, Gallery.settings.speed, $.proxy(afterAnim, this));
					}
				}
			}, this);
		
			if (this.caption !== -1) {
				this.hideDescription(jumpnow);
			} else {
				jumpnow.call();
			}
		},
		

		destroy : function() {
			this.$el.remove();
			this.hideDescription();
			this.$nav.remove();
			this.$caption.remove();
			Gallery.room = null;
		},
		showDescription : function( $descriptionEl, idx ) {
			
			var showdescfn = $.proxy( function() {

				this.$caption
					.find( 'div.gr-caption-inner' )
					.remove()
					.end()
					.append( '<div class="gr-caption-inner">' + $descriptionEl.html() + '</div>' )
					.css( 'transform', 'translateY(0px)' );
				this.caption = idx;	

			}, this );

			if( this.caption !== -1 ) {
				this.hideDescription( showdescfn );
			}
			else {
				showdescfn.call();
			}

		},
		hideDescription : function( callback ) {

			this.$caption.css( 'transform', 'translateY(310px)' );
			
			var hidedescfn = $.proxy( function() {
				this.$caption.off( transEndEventName );
				this.caption = -1;
				if( callback && typeof callback === 'function' ) {
					callback.call();
				}
			}, this );

			if( support.transitions ) {
				this.$caption.on( transEndEventName, hidedescfn );
			}
			else {
				hidedescfn.call();
			}

		},
		removeDescription : function() {
			this.$caption.children( 'div' ).remove();
			this.caption = -1;
		}

	}

	function Wall( $items ) {
		this.$items = $items;
		this.itemsCount = this.$items.length;
		this.widths = [];
	}

	function initEvents() {		
		$( window ).off( 'debouncedresize' ).on( 'debouncedresize', function() {
			winsize = getWindowSize();
			Gallery.room.destroy();
			buildRoom();
		} );
	}

	function getWindowSize() {
		return { width : $window.width(), height : $window.height() }
	}

	return { init : init };

})();
