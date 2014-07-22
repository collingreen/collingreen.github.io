/*---------------------------------------------- 
				     Social icons hover
------------------------------------------------*/
jQuery(document).ready(function(){
	  $('.up').hover(function() {
	  $(this).animate({ opacity : 1 }, 100);
	}, function() {
	  $(this).animate({ opacity : 0.6 }, 100);
	})
	
	$(".up").click(function(event){
	  event.preventDefault();
		$("html, body").animate({ scrollTop: 0 }, 600);
	});
	

	$('.socialmedia .social li').hover(function() {
		$(this).find('a').clone().addClass('hover').appendTo($(this));
	  $(this).find('a:first-child').stop().animate({ marginTop: -25 }, 150);
	}, function() {
	  $(this).find('a:first-child').stop().animate({ marginTop: 0, opacity: 0.99 }, 150);
	  setTimeout(function() { $(this).find('a.hover').remove(); }, 150);
	});


/*---------------------------------------------- 
				prettyPhoto Plugin Settings 
------------------------------------------------*/	
		function prettyPhoto(){
        jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({
				animation_speed: 'fast', // fast/slow/normal 
				opacity: 0.70, // Value between 0 and 1 
				show_title: true, // true/false 
				allow_resize: true, // Resize the photos bigger than viewport. true/false 
				default_width: 500,
				default_height: 344,
				theme: 'pp_default', // light_rounded / dark_rounded / light_square / dark_square / facebook 
				overlay_gallery: false, // If set to true, a gallery will overlay the fullscreen image on mouse over 
				deeplinking: false, // Allow prettyPhoto to update the url to enable deeplinking. 
				social_tools: false
			})
			return false;
		}
		
		prettyPhoto();



/*---------------------------------------------- 
				   Isotope   (masonry)
------------------------------------------------*/
var $container = $('#masonry, .portfolio-grid ul li');
	$container.imagesLoaded( function(){
		$container.isotope({
			itemSelector : '.masonry_item, .portfolio-item li'
		});	
	});
/*---------------------------------------------- 
				     Filter
------------------------------------------------*/
	// onclick reinitialise the isotope script
	$('.filter li a').click(function(){
		
		$('.filter li a').removeClass('active');
		$(this).addClass('active');
		
		var selector = $(this).attr('data-option-value');
		$container.isotope({ filter: selector });
		
		return(false);
	});
	
/*---------------------------------------------- 
				Scroll 
------------------------------------------------*/
	
$('.menu a, #logo, .scrol').click(function() {
	var elementClicked = $(this).attr("href");
	var destination = $(elementClicked).offset().top;
	$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination-0}, 1000 );		   
	return false;
});	
		
});

	
var current_nav = 'home';

scroll_function = function(){
	
	$(".scrol-page,").each(function(index) {
		var h = $(this).offset().top;
		var y = $(window).scrollTop();
					
		if(y + 360 >= h && y < h + $(this).height() && $(this).attr('id') != current_nav) {
			
			current_nav = $(this).attr('id');
			
			$('.menu a').removeClass('current');
			$('.nav_' + current_nav).addClass('current').show("fast");	
				
		}
	});	
}
$(window).scroll(function(){
		scroll_function();
});	

$(function() {
                $('.menu a, #logo, .scrol').bind('click',function(event){
                    var $anchor = $(this);
                    
                    $('html, body').stop().animate({
                        scrollTop: $($anchor.attr('href')).offset().top - 150
                    }, 1500,'easeInOutExpo');
                    /*
                    if you don't want to use the easing effects:
                    $('html, body').stop().animate({
                        scrollTop: $($anchor.attr('href')).offset().top
                    }, 1000);
                    */
                    event.preventDefault();
                });
            });
/*---------------------------------------------- 
				Navigation 
------------------------------------------------*/
	$('.menu a').click( function () {
	$('.menu a').removeClass("active");
	$(this).addClass("active");
	}); 

	$('#logo').click( function () {
	$('.menu a').removeClass("active");
	}); 
	

/*---------------------------------------------- 
				Sliding skill graph
------------------------------------------------*/
	function init_skills() {
	$('.block_levels .progress div').each(function() {
		var w = $(this).attr('data-level');
		$(this).animate({width : w + '%'}, 500);
	});
}
$(window).load(function() {
	init_skills();
});

/*---------------------------------------------- 
				Form Validaton Javascript 
------------------------------------------------*/

$(document).ready(function() {
	$('form#contact_form').submit(function() {
		$('form#contact_form .error').remove();
		var hasError = false;
		$('.requiredField').each(function() {
			if(jQuery.trim($(this).val()) == '') {
            	var labelText = $(this).prev('label').text();
            	$(this).parent().append('<span class="error">You forgot to enter your '+labelText+'.</span>');
            	$(this).addClass('inputError');
            	hasError = true;
            } else if($(this).hasClass('email')) {
            	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            	if(!emailReg.test(jQuery.trim($(this).val()))) {
            		var labelText = $(this).prev('label').text();
            		$(this).parent().append('<span class="error">You entered an invalid '+labelText+'.</span>');
            		$(this).addClass('inputError');
            		hasError = true;
            	}
            }
		});
		if(!hasError) {
			$('form#contact_form input.submit').fadeOut('normal', function() {
				$(this).parent().append('');
			});
			var formInput = $(this).serialize();
			$.post($(this).attr('action'),formInput, function(data){
				$('form#contact_form').slideUp("fast", function() {
					$(this).before('<p class="success"><strong>Thanks!</strong> Your email was successfully sent. We will contact you as soon as possible.</p>');
				});
			});
		}

		return false;

	});
});
  