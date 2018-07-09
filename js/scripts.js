$(function() {
	var device = 'desktop';
	var justSwitched = false;
	function detectDevice() {
		var temp = device;
		if ( Modernizr.mq('(min-width:960px)') ) {
			device = 'desktop'
		} else if ( Modernizr.mq('(max-width:959px)') && Modernizr.mq('(min-width:768px)') ) {
			device = 'tablet'
		} else if ( Modernizr.mq('(max-width:767px)') ) {
			device = 'mobile'
		}
		if ( temp == device ) {
			justSwitched = false;
		} else {
			justSwitched = true;
		}
	}
	function startApp() {
		detectDevice();
		if ( justSwitched ) {
			if ( device !== 'desktop' ) {
				$('.gallery__col_3').detach().appendTo($('.gallery__col_1'));
			} else {
				$('.gallery__col_3').detach().insertAfter($('.gallery__col_2'));
			}
			if ( device == 'mobile' ) {
				$('.gallery__col_1').detach().insertAfter($('.gallery__col_2'));
			} else {
				$('.gallery__col_1').detach().insertBefore($('.gallery__col_2'));
			}
		}
	}
	startApp();
	var lastWidth = $(window).width();
	$(window).on('resize', _.debounce(function() {
		if ( $(window).width() != lastWidth ) {
			startApp();
			lastWidth = $(window).width();
		}
	}, 10));
});