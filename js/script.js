$(document).ready(function(){
  // SHOW SCHEDULE POPUP
	$('.table td .selected').mouseenter(function(){
		$(this).find('.popup-event').fadeIn();
	});
  // HIDE SCHEDULE POPUP
	$('.table td .selected').mouseleave(function(){
		$(this).find('.popup-event').fadeOut();
	})
  // GALLERY & SCORE TABS
  $('.tabs-fade .tabs--btn a').on('click', function(){
      let currentTab = $(this);
      if(currentTab.closest('.tabs-fade').find('.tabs--content .active-tab').attr('data-tab') != currentTab.attr('data-tab')){
        currentTab.closest('.tabs-fade').find('.tabs--btn .btn-active').removeClass('btn-active');
        currentTab.addClass('btn-active');
        currentTab.closest('.tabs-fade').find('.tabs--content .active-tab').fadeOut(function(){
            $(this).removeClass('active-tab');
            currentTab.closest('.tabs-fade').find(`.tabs--content [data-tab=${currentTab.attr('data-tab')}]`).addClass('active-tab');
            currentTab.closest('.tabs-fade').find(`.tabs--content [data-tab=${currentTab.attr('data-tab')}]`).fadeIn();
        });
      }
  });
  // FAQ TABS
  $('.tabs-faq .tabs--btn').on('click', function(){
      let currentTab = $(this).attr('data-tab');
      if($('.tabs-faq .tabs--content.active-tab').attr('data-tab') != currentTab){
        $('.tabs-faq .tabs--content.active-tab').slideUp(function(){
          $(this).removeClass('active-tab');
          $(`.tabs-faq .tabs--content[data-tab=${currentTab}]`).addClass('active-tab');
          $(`.tabs-faq .tabs--content[data-tab=${currentTab}]`).slideDown();
        });
      }
  });
  // BACKGROUND HEIGHT BY TITLE HEIGHT WORKAROUND
  let titleHeights = [];
    $('.bg-specs h2').each(function(){
    titleHeights.push($(this).outerHeight(true));
  });
  let maxTitleHeight = Math.max.apply(null, titleHeights);
  $('.bg-specs').attr('style', `--data-bg-height: ${maxTitleHeight}px`);
  $('.bg-specs h2').each(function(){
    $(this).outerHeight(maxTitleHeight);
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
  // WHATSAPP MOBILE
  if($(window).width() <= 765){
    $('a[data-whatsapp]').each(function(){
      $(this).attr('href', 'https://api' + $(this).attr('href').split('https://web')[1]);
    });
  }
  // DROPDOWN BUTTON FOR SCORES GENRE FILTER
  $('.btn-dropdown').on('click', function(){
    $(this).toggleClass('active-dropdown');
    $(this).children('.dropdown-content').slideToggle();
  });
  $('.btn-dropdown .dropdown-content *').on('click', function(){
    if($(this).attr('data-genre') == ''){
      $(this).closest('.btn-dropdown').find('> span').text('CATEGORIAS & GÊNEROS');
      $('.table-score tr').each(function(){
        $(this).show();
      });
    }
    else{
      $(this).closest('.btn-dropdown').find('> span').text($(this).text());
      let genreFilter = $(this).attr('data-genre');
      $('.table-score tr').each(function(){
        if($(this).attr('data-genre') != genreFilter) $(this).hide();
        else $(this).show();
      });
    }
  });
});