/*
var Page = (function () {
    
    var $navArrows = $( '#nav-arrows' ).hide(),
        $shadow = $( '#shadow' ).hide(),
        slicebox = $( '#sb-slider' ).slicebox( {
          onReady : function() {
            
            $navArrows.show();
            $shadow.show();
            
          },
          orientation : 'r',
          cuboidsRandom : true,
          disperseFactor : 30
        } ),
        
        init = function() {
          
          initEvents();
          
        },
        initEvents = function() {
          
          // add navigation events
          $navArrows.children( ':first' ).on( 'click', function() {
            
            slicebox.next();
            return false;
            
          } );
          
          $navArrows.children( ':last' ).on( 'click', function() {
            
            slicebox.previous();
            return false;
            
          } );
          
        };
    
    return { init : init };
    
  })();
  
Page.init();
 */
// Function to apply the class rules

var Page = (function() {
    
    var $navArrows = $( '#nav-arrows' ).hide(),
        $shadow = $( '#shadow' ).hide(),
        slicebox,
        
        init = function(startIndex) {
          slicebox = $( '#sb-slider' ).slicebox( {
            onReady : function() {
              $navArrows.show();
              $shadow.show();
              // Jump to the specified index when the slider is ready
                  
                  setTimeout(function() {
                    slicebox.jump(startIndex);
                }, 500);
            },
            orientation : 'r',
            cuboidsRandom : true,
            disperseFactor : 30
          } );
          
          initEvents();
        },
        
        initEvents = function() {
          
          // add navigation events
          $navArrows.children( ':first' ).on( 'click', function() {
            slicebox.next();
            return false;
          } );
          
          $navArrows.children( ':last' ).on( 'click', function() {
            slicebox.previous();
            return false;
          } );
          
        };
    
    return { init : init };
    
})();
var desiredindex = 0;
// Initialize the Slicebox slider with a specific index
//Page.init(desiredindex); // Pass the desired index here
const box = document.getElementById('slicediv');
$("#sliceBtnClose").on('click', function () {
  box.classList.add('animate');

  // Listen for the end of the CSS animation
  box.addEventListener('transitionend', onAnimationEnd, { once: true });
});

function onAnimationEnd() {
  // Hide the box
  box.style.display = 'none';

  // Remove the animate class
  box.classList.remove('animate');
}




function applyClassRules() {
    const sliderElement = document.querySelector('.sb-slider');
  
    if (sliderElement) {
      sliderElement.style.margin = '10px auto';
      sliderElement.style.position = 'relative';
      sliderElement.style.overflow = 'hidden';
      sliderElement.style.width = '65vw';
      sliderElement.style.height = '70vh';
      sliderElement.style.listStyleType = 'none';
      sliderElement.style.padding = '0';
      sliderElement.style.marginTop = '0';
      sliderElement.style.marginBottom = '0';
      sliderElement.style.top = '50%';
      sliderElement.style.transform = 'translateY(15%)';
    }
  }
  
  // Apply class rules initially
  applyClassRules();
  
  // Listen for the resize event and reapply class rules
  window.addEventListener('resize', applyClassRules);
  