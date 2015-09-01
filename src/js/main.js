/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 *
 * Google CDN, Latest jQuery
 * To use the default WordPress version of jQuery, go to lib/config.php and
 * remove or comment out: add_theme_support('jquery-cdn');
 * ======================================================================== */

(function($) {

// Use this variable to set up the common and page specific functions. If you
// rename this variable, you will also need to rename the namespace below.
var sprig = {
  // All pages
  common: {
    init: function() {

      // JavaScript to be fired on all pages



        svg4everybody();

      // Google Maps Scripts
       // When the window has finished loading create our google map below
       google.maps.event.addDomListener(window, 'load', init);

       function init() {
           // Basic options for a simple Google Map
           // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
           var mapOptions = {
               // How zoomed in you want the map to start at (always required)
               zoom: 15,

               // The latitude and longitude to center the map (always required)
               center: new google.maps.LatLng(59.27081,	18.00412 ), // Älvsjö

               // Disables the default Google Maps UI components
               disableDefaultUI: true,
               scrollwheel: false,
               draggable: false,

               // How you would like to style the map.
               // This is where you would paste any style found on Snazzy Maps.
               styles: [{
        "featureType": "all",
        "stylers": [{
                "saturation": 0
            },
            {
                "hue": "#e7ecf0"
            }
        ]
    },
    {
        "featureType": "road",
        "stylers": [{
                "saturation": -70
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": -60
            }]
    }]
           };

           // Get the HTML DOM element that will contain your map
           // We are using a div with id="map" seen below in the <body>
           var mapElement = document.getElementById('map');

           // Create the Google Map using out element and options defined above
           var map = new google.maps.Map(mapElement, mapOptions);

           // Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
           var image = './wp-content/themes/Krater-Base-Theme/dist/img/map-marker2.png';
           var myLatLng = new google.maps.LatLng(59.27081, 18.00412 );
           var beachMarker = new google.maps.Marker({
               position: myLatLng,
               map: map,
               icon: image
           });
       }



      //ResponsiveMenu

      $(document).ready(function()
      {


        var windw = this;

        $.fn.ResponsiveMenu = function ( pos ) {
            var $this = this,
                $window = $(windw);

            $window.scroll(function(e){
                if ($window.scrollTop() > pos) {

                    $this.addClass('navbar-compact');

                } else {

                    $this.removeClass('navbar-compact');
                }
            });
        };



        // COLLAPSE MENU ON CLICK IN MOBILE VIEW ==========================

        	$(function() {
                // Close bootstrap's dropdown menu after clicking
                $('div.collapse ul.nav li a').each(function() {
                    $(this).on("click", function () {
                        var $obj = $($(this).parents('.in')[0]);
                        $obj.animate({'height': '1px'}, function() {
                            $obj.removeClass('in').addClass('collapse');
                            $('nav').removeClass('in').addClass('collapse');
                        });
                    });
                });
            });

        //=====================================================================






      });



    }
  },
  // Home page
  home: {
    init: function() {
      // JavaScript to be fired on the home page

        $('header').removeClass('navbar-compact');

      function myscroll(myID){
    var offset = jQuery("#"+myID).offset()
    window.scrollTo(0,offset.top);
}

      //localScroll

      $.localScroll({
        target: 'body', // could be a selector or a jQuery object too.
        queue:true,
        duration:1000,
        hash:true,
        offset:-50,
        onBefore:function( e, anchor, $target ){
          // The 'this' is the settings object, can be modified
        },
        onAfter:function( anchor, settings ){
          // The 'this' contains the scrolled element (#content)
        }
      });



      $(document).ready(function()
      {






// overlay handler function


/*      $( window ).scroll(function() {

          var visibleMe = $('#post-19 h1').visible(true);

            if (timer > 500) {
                timer = 0;
    if(visibleMe == true){

      $('#overlayimg').addClass('wipe');


    }else{

      $('#overlayimg').removeClass('wipe');

    }
}




  });

  var timer = 0;
  setInterval(function () { timer += 50; }, 50);
*/

  $(document).on('scroll', function() {

    var pos = $(window).scrollTop();
    var thickness = 1 - pos / $(window).height();
    if(thickness < 0.7){
      $('#overlayimg').css("opacity", thickness);
    }else{
    $('#overlayimg').css("opacity", 0.7);
    }


  })


      // Sticky hero
      var windw = this;

      $.fn.followTo = function ( pos ) {
          var $this = this,
              $window = $(windw);

          $window.scroll(function(e){
              if ($window.scrollTop() > pos) {


                  $this.css({
                      position: 'absolute',
                      top: pos
                  });
              } else {
                // $('#overlayimg').removeClass('wipe');
                  $this.css({
                      position: 'fixed',
                      top: 0
                  });
              }
          });
      };

      var pH = $(window).height();

      $('.hero1').followTo(pH+50);

      $('.navbar-default').ResponsiveMenu(200);


});
    }
  },
  // About us page, note the change from about-us to about_us.
  about_us: {
    init: function() {
      // JavaScript to be fired on the about us page
    }
  }
};

// The routing fires all common scripts, followed by the page specific scripts.
// Add additional events for more control over timing e.g. a finalize event
var UTIL = {
  fire: function(func, funcname, args) {
    var namespace = sprig;
    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
      namespace[func][funcname](args);
    }
  },
  loadEvents: function() {
    UTIL.fire('common');

    $.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
      UTIL.fire(classnm);
    });
  }
};

$(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
