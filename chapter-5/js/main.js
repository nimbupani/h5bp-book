/* Author: Divya Manian

*/




$(function() {

	$('.js-scrollitem').smoothScroll();

	var $navlinks = $('#lineup .js-tabitem');	
	var $tabs = $('.t-tab__body');

	var hiddenClass = 'hidden';
	var activeClass = 't-tab__navitem--active';

	var $lastactivetab = null;
	var $lastactivenav = null;

	$navlinks.click(function() {
		var $this = $(this);
		//take note of what was the immediately previous tab and tab nav that was active
		$lastactivetab = $lastactivetab || $tabs.not('.' + hiddenClass);
		$lastactivenav = $lastactivenav || $navlinks.filter('.' + activeClass);

		// our code for showing or hiding the current day’s line up
	   	$lastactivetab.addClass(hiddenClass);   	
		$(this.hash).removeClass(hiddenClass);   
		$lastactivetab = $(this.hash);

		// change active navigation item	
		$lastactivenav.removeClass(activeClass);		
		$this.addClass(activeClass);
		$lastactivenav = $this;

	   return false;
	});

	$maplink = $('.js-map-link');
	$maplinkText = $maplink.text();

	$maplink.toggle(function() {
		$('#venue-map').removeClass(hiddenClass);
		$maplink.text('Hide Map');
	}, function() {
		$('#venue-map').addClass(hiddenClass);
		$maplink.text($maplinkText);
	});

	if(Modernizr.svg == false) {
		$('img[src$=".svg"]').each(function() {
			this.src = /(.*)\.svg$/.exec(this.src)[1] + '.png';
		});
	}


	Modernizr.load({
        test: Modernizr.audio,
        nope: {	
        	'mediaelementjs': 'js/vendor/mediaelement/mediaelement-and-player.min.js'
        },
        callback: {        
          'mediaelementjs': function() {
            $('audio').mediaelementplayer();
          }
        } 
    });  
});

