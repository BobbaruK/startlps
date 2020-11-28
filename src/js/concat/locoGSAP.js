/*!
  * Locomotive Scroll
  *     and
  *  GSAP Animations
	*
  */
(function () {

	var locoScroll = new LocomotiveScroll({
		el: document.querySelector("#site-wrapper"),
		smooth: true,
		multiplier: 1,
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#site-wrapper", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : 		locoScroll.scroll.instance.scroll.y;
    }, 
    // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#site-wrapper").style.transform ? "transform" : "fixed"
  });

  const patrat = document.querySelector(".patrat");

  const tl = gsap.timeline({});

  tl
    .from(patrat, {
      x: 500,
      rotate: 360
    })

  ScrollTrigger.create({
    animation: tl,
    scroller: "#site-wrapper",
    trigger: patrat,
    start: "top center",
    end: "bottom center",
    scrub: 5,
    // markers: true,
  });
  
})();
