/*! Vanilla js scripts */

//------------------------------------
// GSAP Register Plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

//------------------------------------
// If using pos ie
var ieCont = document.getElementById("ifIE");
var ieMsg = document.getElementById("ifIE_inner");
var ieHideSite = document.getElementById("site-wrapper");

function isItIE() {
  user_agent = navigator.userAgent;
  var is_it_ie = user_agent.indexOf("MSIE ") > -1 || user_agent.indexOf("Trident/") > -1;
  return is_it_ie;
}
if (isItIE()) {
  ieMsg.innerHTML =
    "<p class='notIE'>You are using an <strong>outdated</strong> browser. Please <a href='http://browsehappy.com/'>upgrade your browser</a> to improve your experience.</p>";
  ieHideSite.style.display = "none";
} else {
  ieCont.style.display = "none";
}

//------------------------------------
// Get the year to #lp_year
let lpYear = document.getElementById("lp_year");
lpYear.innerHTML = new Date().getFullYear();
