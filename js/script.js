$(document).ready(function(){
    // SHOW SCHEDULE POPUP
	$('.table td .selected').mouseenter(function(){
		$(this).find('.popup-event').fadeIn();
	});
    // HIDE SCHEDULE POPUP
	$('.table td .selected').mouseleave(function(){
		$(this).find('.popup-event').fadeOut();
	})
    // FAQ TABS
	$('.tabs--btn').on('click', function(){
        let currentTab = $(this).attr('data-tab');
        if($('.tabs--content.active-tab').attr('data-tab') != currentTab){
            $('.tabs--content.active-tab').slideUp(function(){
                $(this).removeClass('active-tab');
                $(`.tabs--content[data-tab=${currentTab}]`).addClass('active-tab');
                $(`.tabs--content[data-tab=${currentTab}]`).slideDown();
            });
        }
    });
    // LIGHTBOX
    $('.lightbox').fancybox({
        toolbar: false,
        btnTpl: {
            arrowLeft:
              '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
              '<div><img src="images/assets/prev.png" alt="Prev" title="Prev"></div>' +
              "</button>",

            arrowRight:
              '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
              '<div><img src="images/assets/next.png" alt="Next" title="Next"></div>' +
              "</button>",
        }
    });
});