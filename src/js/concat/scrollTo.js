/*!
	* ScrollTo
	*
  */

jQuery(document).on("ready", function ($) {

	$(".csseco_scrollTo").on("clic",  function(e) {
		e.preventDefault();
		var location = $(this).attr('href');
		$("html, body").animate({
			scrollTop: $(location).offset().top
		}, 1000);
	});

});

