jQuery(document).ready(function($){

	var slidesWrapper = $('.cd-hero-slider');



	//check if a .cd-hero-slider exists in the DOM 

	if ( slidesWrapper.length > 0 ) {

		var primaryNav = $('.cd-primary-nav'),

			sliderNav = $('.cd-slider-nav'),

			testTitle = $('h1'),

			navigationMarker = $('.cd-marker'),

			slidesNumber = slidesWrapper.children('li').length,

			visibleSlidePosition = 0,

			autoPlayId,

			autoPlayDelay = 5000;

			


		//upload videos (if not on mobile devices)

		uploadVideo(slidesWrapper);



		//autoplay slider

		setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);



		//on mobile - open/close primary navigation clicking/tapping the menu icon

		primaryNav.on('click', function(event){

			if($(event.target).is('.cd-primary-nav')) $(this).children('ul').toggleClass('is-visible');

		});

		

		//change visible slide

		sliderNav.on('click', 'li', function(event){

			event.preventDefault();

			var selectedItem = $(this);

			if(!selectedItem.hasClass('selected')) {

				// if it's not already selected

				var selectedPosition = selectedItem.index(),

					activePosition = slidesWrapper.find('li.selected').index();

				

				if( activePosition < selectedPosition) {

					nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);

				} else {

					prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);

				}



				//this is used for the autoplay

				visibleSlidePosition = selectedPosition;



				updateSliderNavigation(sliderNav, selectedPosition);

				updateNavigationMarker(navigationMarker, selectedPosition+1);

				//reset autoplay

				setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);

			}

		});

	}



	function nextSlide(visibleSlide, container, pagination, n){

		visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){

			visibleSlide.removeClass('is-moving');

		});



		container.children('li').eq(n).addClass('selected from-right').prevAll().addClass('move-left');

		checkVideo(visibleSlide, container, n);

	}



	function prevSlide(visibleSlide, container, pagination, n){

		visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){

			visibleSlide.removeClass('is-moving');

		});



		container.children('li').eq(n).addClass('selected from-left').removeClass('move-left').nextAll().removeClass('move-left');

		checkVideo(visibleSlide, container, n);

	}



	function updateSliderNavigation(pagination, n) {

		var navigationDot = pagination.find('.selected');

		navigationDot.removeClass('selected');

		pagination.find('li').eq(n).addClass('selected');

	}



	function setAutoplay(wrapper, length, delay) {

		if(wrapper.hasClass('autoplay')) {

			clearInterval(autoPlayId);

			autoPlayId = window.setInterval(function(){autoplaySlider(length)}, delay);

		}

	}

	var isMouseOver = false;
	$(".cd-hero").on("mouseover", function(){isMouseOver = true});
	$(".cd-hero").on("mouseleave", function(){isMouseOver = false});

	// HERO ARROWS

	$(".cd-hero .nav-hero span *").on("click", function(){
		customNavigation($(this).attr('data-direction'));
	});

	$('.cd-hero').on('click', function(){
		console.log('aaa');
	});

	$('.cd-hero').on('swipeleft', function(){
		customNavigation('prev');
		$('.contact-bar').css('background', 'red');
	});

	$('.cd-hero').on('swiperight', function(){
		customNavigation('next');
		$('.contact-bar').css('background', 'green');
	});

	$('.cd-hero, .cd-hero-slider, .cd-hero-slider .selected, .cd-full-width, .slider-title').on('longtap',function(e,data){console.log('bbbb')});

	// END HERO ARROWS
	
	function customNavigation(direction){
		if(direction == 'next'){
			if( visibleSlidePosition < slidesNumber - 1)  {

				nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, visibleSlidePosition + 1);

				visibleSlidePosition +=1;

			} else {

				prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, 0);

				visibleSlidePosition = 0;

			}
		}
		else if(direction == 'prev'){
			if( visibleSlidePosition > 0)  {

				prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, visibleSlidePosition - 1);

				visibleSlidePosition -= 1 ;

				

			} else  {

				nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, slidesNumber - 1);

				visibleSlidePosition = slidesNumber - 1;

			}
		}
	}

	function autoplaySlider(length) {

		if( visibleSlidePosition < length - 1 && !isMouseOver) {

			nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, visibleSlidePosition + 1);

			visibleSlidePosition +=1;

		} else if(!isMouseOver) {

			prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, 0);

			visibleSlidePosition = 0;

		}

		updateNavigationMarker(navigationMarker, visibleSlidePosition+1);

		updateSliderNavigation(sliderNav, visibleSlidePosition);

	}



	function uploadVideo(container) {

		container.find('.cd-bg-video-wrapper').each(function(){

			var videoWrapper = $(this);

			if( videoWrapper.is(':visible') ) {

				// if visible - we are not on a mobile device 

				var	videoUrl = videoWrapper.data('video'),

					video = $('<video loop><source src="'+videoUrl+'.mp4" type="video/mp4" /><source src="'+videoUrl+'.webm" type="video/webm" /></video>');

				video.appendTo(videoWrapper);

				// play video if first slide

				if(videoWrapper.parent('.cd-bg-video.selected').length > 0) video.get(0).play();

			}

		});

	}



	function checkVideo(hiddenSlide, container, n) {

		//check if a video outside the viewport is playing - if yes, pause it

		var hiddenVideo = hiddenSlide.find('video');

		if( hiddenVideo.length > 0 ) hiddenVideo.get(0).pause();



		//check if the select slide contains a video element - if yes, play the video

		var visibleVideo = container.children('li').eq(n).find('video');

		if( visibleVideo.length > 0 ) visibleVideo.get(0).play();

	}



	function updateNavigationMarker(marker, n) {

		marker.removeClassPrefix('item').addClass('item-'+n);

	}



	$.fn.removeClassPrefix = function(prefix) {

		//remove all classes starting with 'prefix'

	    this.each(function(i, el) {

	        var classes = el.className.split(" ").filter(function(c) {

	            return c.lastIndexOf(prefix, 0) !== 0;

	        });

	        el.className = $.trim(classes.join(" "));

	    });

	    return this;

	};

});

$(window).on('load', function(){
	let heroHeight = $('.cd-hero').height();
	let arrowHeight = $('.cd-hero .nav-hero span').height();
	let sliderOffset = parseInt($('.cd-hero li.selected').css('padding-top'));
	$('.cd-hero .nav-hero span').css({
		'top' : ((heroHeight / 2) - (arrowHeight / 2) + (sliderOffset * 0.6 / 2)) + 'px',
		'visibility' : 'visible'
	});
	// $('.cd-hero .nav-hero span:nth-of-type(2)').css('right', $('.cd-hero .nav-hero').css('padding-right'));
});