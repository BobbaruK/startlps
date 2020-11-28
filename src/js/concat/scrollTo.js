/*!
	* ScrollTo
	*
  */

(function () {

	$(".csseco_scrollTo").on("click",  function(e) {
		e.preventDefault();
		var location = $(this).attr('href');
		$("html, body").animate({
			scrollTop: $(location).offset().top
		}, 1000);
	});

})();

