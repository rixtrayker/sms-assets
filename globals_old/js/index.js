'use strict';

//revolution slider


    $('.select-1').select2();



 $(document).ready(function() {
        
          
                
          $('.tp-banner').show().revolution(
          {
            dottedOverlay:"none",
            delay:16000,
            startwidth:1170,
            startheight:700,
            hideThumbs:200,
            
            thumbWidth:100,
            thumbHeight:50,
            thumbAmount:5,
            
            navigationType:"bullet",
            navigationArrows:"solo",
            navigationStyle:"preview2",
            
            touchenabled:"on",
            onHoverStop:"on",
            
            swipe_velocity: 0.7,
            swipe_min_touches: 1,
            swipe_max_touches: 1,
            drag_block_vertical: false,
                        
                        parallax:"mouse",
            parallaxBgFreeze:"on",
            parallaxLevels:[7,4,3,2,5,4,3,2,1,0],
                        
            keyboardNavigation:"off",
            
            navigationHAlign:"center",
            navigationVAlign:"bottom",
            navigationHOffset:0,
            navigationVOffset:20,

            soloArrowLeftHalign:"left",
            soloArrowLeftValign:"center",
            soloArrowLeftHOffset:20,
            soloArrowLeftVOffset:0,

            soloArrowRightHalign:"right",
            soloArrowRightValign:"center",
            soloArrowRightHOffset:20,
            soloArrowRightVOffset:0,
                
            shadow:0,
            fullWidth:"on",
            fullScreen:"off",

            spinner:"spinner4",
            
            stopLoop:"off",
            stopAfterLoops:-1,
            stopAtSlide:-1,

            shuffle:"off",
            
            autoHeight:"off",           
            forceFullWidth:"off",           
                        
                        
                        
            hideThumbsOnMobile:"off",
            hideNavDelayOnMobile:1500,            
            hideBulletsOnMobile:"off",
            hideArrowsOnMobile:"off",
            hideThumbsUnderResolution:0,
            
            hideSliderAtLimit:0,
            hideCaptionAtLimit:0,
            hideAllCaptionAtLilmit:0,
            startWithSlide:0,
            videoJsPath:"rs-plugin/videojs/",
            fullScreenOffsetContainer: "" 
          });
          
                  
        }); //ready


//owl carousel
  $("#slider-index-owl-demo").owlCarousel({
      autoPlay: 3000, //Set AutoPlay to 3 seconds
      items : 6,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3],
      afterInit : function(elem){
      var that = this;
      that.owlControls.prependTo(elem)
    }
 
  });

  //parallax-slider
 $(function() {

                $('#da-slider').cslider({

                current   : 0,  
                // index of current slide
                
                bgincrement : 50, 
                // increment the background position 
                // (parallax effect) when sliding
                
                autoplay  : true,
                // slideshow on / off
                
                interval  : 5000  
                // time between transitions
  
            });

                
            });


 //wow
 new WOW().init();
