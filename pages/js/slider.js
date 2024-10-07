var currentposition;
(function (global, jQuery) {
  jQuery.fn.camRollSlider = function(itemIndex) {
    var wrapper      = jQuery('body').find('.crs-wrap');
    var screenRoll   = jQuery('body').find('.crs-wrap .crs-screen .crs-screen-roll');
    var screenItems  = wrapper.find('.crs-screen-item');
    var barRollWrap  = wrapper.find('.crs-bar-roll-wrap');
    var barRoll      = wrapper.find('.crs-bar-roll');
    var barItem      = wrapper.find('.crs-bar-roll-item');
    var barFirstItem = wrapper.find('.crs-bar-roll-item:first-child');
      
    var current;

    function moveScreenTo(index) {
      const mediaElements = document.querySelectorAll('audio, video');
      mediaElements.forEach((media) => {
        if (!media.paused) {
          media.pause();
        }
      });

      screenItems.each(function (i) {
        var caption = jQuery(this).find('.elem-caption');
        if (i === index) {
          caption.show();
        } else {
          caption.hide();
        }
      });

      screenRoll.css('left', -wrapper.width() * index);
    }
      
    function moveBarTo(index) {
      var barRollPos = (barRollWrap.width() / 2) 
        - (barItem.width() / 2)
        - jQuery(barItem[index]).position().left;

      barRoll.css('left', barRollPos);
    }

    function moveToItem(target) {
      var index;

      if (typeof target === 'number') {
        index = target;
      } else if (typeof target === 'string') {
        index = parseInt(target, 10);
      } else {
        index = jQuery(target).index();
      }

      current = index;

      moveScreenTo(index);
      moveBarTo(index);
      const divRegex = /<div\b[^>]*>/i;
      const thumbnailRegex = /thumbnail_([^"]+)/;

      if (target instanceof HTMLDivElement) {
        const thumbnailMatch = target.id.match(thumbnailRegex);
        const thumbnailString = thumbnailMatch && thumbnailMatch[1];
        currentposition = thumbnailString;
        const currentElement = document.getElementById(thumbnailString);
        if (currentElement instanceof HTMLVideoElement || currentElement instanceof HTMLAudioElement) {
          currentElement.autoplay = true;
          currentElement.play();
        }
      } else {
        const container = document.getElementById("slidethumbnail");
        const divs = container.getElementsByClassName("crs-bar-roll-item");
        const targetDiv = divs[index];
        const id = targetDiv.id;
        const thumbnailMatch = id.match(thumbnailRegex);
        const thumbnailString = thumbnailMatch && thumbnailMatch[1];
        currentposition = thumbnailString;
        const currentElement = document.getElementById(thumbnailString);
        if (currentElement instanceof HTMLVideoElement || currentElement instanceof HTMLAudioElement) {
          currentElement.autoplay = true;
          currentElement.play();
        }
      }
    }

    function setSizePos() {
      screenRoll.css('width', screenRoll.children().length * wrapper.width());
      
      // set screen items width
      screenItems.css('width', wrapper.width());
      
      // set bar roll width
      barRoll.css('width', (barRoll.children().length * barFirstItem.width())
        + ((barRoll.children().length - 1) * parseInt(barFirstItem.css('margin-right'))));

      //set bar roll pos
      barRoll.css('transition', 'all');
      screenRoll.css('transition', 'all');

      moveToItem(itemIndex);

      setTimeout(function() {
        barRoll.css('transition', '');
        screenRoll.css('transition', '');
      }, 0);
    }

    // initial
    current = itemIndex;
    setSizePos();

    barItem.click(function() {
      moveToItem(this);
    });

    jQuery(window).resize(function() {
      setSizePos();
    });

    if (typeof callback === 'function') {
      callback();
    }
        
    // return jQuery chain
    //moveToItem(itemIndex); 
    return this;
  };
  global.camRollSlider = jQuery.fn.camRollSlider;
}(window, jQuery));
