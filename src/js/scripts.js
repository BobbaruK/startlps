jQuery(document).ready(function ($) {
	$(function () {
		$('[data-toggle="popover"]').popover()
	})
	//============
	// Get the year to #lp_year
	//============
	$('#lp_year').html(new Date().getFullYear());

	//============
	// Add Classes to img element
	//============
	$('img').addClass('img-fluid lazyload');

  //============
	// Scroll to...
	//============
	$(".csseco_scrollTo").click(function(e) {
		e.preventDefault();
		var location = $(this).attr('href');
		$("html, body").animate({
			scrollTop: $(location).offset().top
		}, 1000);
	});

});