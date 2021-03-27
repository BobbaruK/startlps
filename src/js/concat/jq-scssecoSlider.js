/*! JQuery GSAP Slider */

//------------------------------------
// scssecoSlider carousel pwd by GSAP
(function () {
  const sliders = $(".scssecoSlider"); // Get all sliders

  sliders.each((index, elem) => {
    // Misc vars
    let dataAnimDur = $(elem).data("animduration") ? $(elem).data("animduration") * 1000 : 320; // Animation duration
    let dataBtwnAnimDur = $(elem).data("interval") || $(elem).data("interval") == 0 ? $(elem).data("interval") * 1000 : 3000; // Duration between animations(slide change) (miliseconds)
    let animDurS = dataAnimDur / 1000; // Transform duration for gsap animation in seconds
    let animEase = $(elem).data("ease") ? $(elem).data("ease") : "power4.out"; // Ease
    let dataControls = $(elem).data("controls") ? $(elem).data("controls") : "all"; // Controls: all, dots, buttons, none

    // Wrappers and elements
    let sliderID = $(elem).attr("id"); // Get sliders ID
    let actualSlider = $("#" + sliderID); // Each slider Wrapper
    const slides = actualSlider.find(".scssecoSlider_slides"); // Slides Wrapper
    const controls = actualSlider.find(".scssecoSlider_controls"); // Controls Wrapper
    const dots = actualSlider.find(".scssecoSlider_dots"); // Dots Wrapper

    // Slides and buttons
    const slide = slides.find(".scssecoSlider_slide"); // All Individual Slides (incl .active)
    let slideNotActive = slides.find(".scssecoSlider_slide:not(.active)"); // All Individual Slides but not active
    const prev = controls.find(".scssecoSlider_arrows").find(".scssecoSlider_arrow[data-arrow=prev]"); // Prev
    const next = controls.find(".scssecoSlider_arrows").find(".scssecoSlider_arrow[data-arrow=next]"); // Next

    // Auto slide vars
    let isPaused = true; // true = paused; false = not paused
    let time = 0; // Time

    // Dev tools vars
    $(elem).prepend("<div class='scssecoSlider_dev'></div>");
    let devWrap = $(elem).find(".scssecoSlider_dev").append("<ul class='scssecoSlider_devul'></ul>");
    let devWrapUl = devWrap.find(".scssecoSlider_devul");

    // Slider controls
    switch (dataControls) {
      case "dots":
        // console.log(sliderID + " controls: dots");
        controls.find(".scssecoSlider_arrows").hide();
        addDots();
        break;
      case "buttons":
        // console.log(sliderID + " controls: buttons");
        break;
      case "all":
        // console.log(sliderID + " controls: all");
        addDots();
        break;
      case "none":
        // console.log(sliderID + " controls: none");
        controls.hide();
        break;
      default:
        // console.log(sliderID + " controls: all");
        addDots();
        break;
    }

    // Add Dots
    function addDots() {
      slide.each((index, elem) => {
        let nr = index + 1;
        if (nr === 1) {
          // If is 1st add active
          dots.append("<button class='scssecoSlider_dot js-dot-" + nr + " active' data-dot='" + nr + "'>" + nr + "</button>");
        } else {
          // Else w/o active
          dots.append("<button class='scssecoSlider_dot js-dot-" + nr + "' data-dot='" + nr + "'>" + nr + "</button>");
        }
      });
    }
    const dot = dots.find(".scssecoSlider_dot"); // Get dots

    // Previous slide animation
    function slidePrevious() {
      if (slideAnim.isActive()) {
        return; // If animation is active do nothing
      }
      let slideActive = slides.find(".active"); // Active slide
      let slidePrev = slideActive.prev(); // Get previous slide
      let actualSlidePrev = slideActive.data("slide") === 1 ? $("#" + sliderID + " .js-slide-" + slide.length) : slidePrev; // Set previous slide

      let dotActive = dots.find(".active"); // Active dot
      let dotPrev = dotActive.prev(); // Get previous dot
      let actualDotPrev = dotActive.data("dot") === 1 ? $("#" + sliderID + " .js-dot-" + slide.length) : dotPrev; // Set previous dot

      slideAnim
        // Setup previous animation
        .to(slideActive, {
          // Showing slide
          onStart: () => {
            // Start of animation
            dotActive.removeClass("active"); // Remove active class from active dot
          },
          xPercent: 100, // Move showing slide 100% to the right
          onComplete: () => {
            // End of animation
            slideActive.removeClass("active"); // Remove active class from showing slide
          },
        })
        .fromTo(
          actualSlidePrev,
          // Next slide
          {
            xPercent: -100, // Move the next slide 100% to the left*
          },
          {
            xPercent: 0, // *Move the next slide at 0% left
            onComplete: () => {
              // End of animation
              actualSlidePrev.addClass("active"); // Add active class to the next slide
              actualDotPrev.addClass("active"); // Add active class to the next dot
              time = 0; // Set time to 0
            },
          },
          "<" // Start this animation at the same time as previous animation
        );
    }

    // Next slide animation
    function slideNext() {
      if (slideAnim.isActive()) {
        return; // If animation is active do nothing
      }
      if (document.visibilityState == "visible") {
        // if browser window is focused
        let slideActive = slides.find(".active"); // Active slide
        let nextSlide = slideActive.next(); // Get next slide
        let actualSlideNext = slideActive.data("slide") === slide.length ? $("#" + sliderID + " .js-slide-1") : nextSlide; // Set next slide

        let dotActive = dots.find(".active"); // Active dot
        let dotNext = dotActive.next(); // Get next dot
        let actualDotNext = dotActive.data("dot") === slide.length ? $("#" + sliderID + " .js-dot-1") : dotNext; // Set next dot

        slideAnim
          .to(slideActive, {
            // Showing slide
            onStart: () => {
              // Start of animation
              dotActive.removeClass("active"); // Remove active class from active dot
              // isPaused = true; // Pause the counter on starting animation
              // console.log("incepe animatia");
            },
            xPercent: -100, // Move showing slide 100% to the left
            onComplete: () => {
              // End of animation
              slideActive.removeClass("active"); // Remove active class from showing slide
              // console.log("termina animatia");
            },
          })
          .fromTo(
            actualSlideNext, // Next slide
            {
              xPercent: 100, // Move the next slide 100% to the right*
            },
            {
              xPercent: 0, // *Move the next slide at 0% left
              onComplete: () => {
                // End of animation
                actualSlideNext.addClass("active"); // Add active class to the next slide
                actualDotNext.addClass("active"); // Add active class to the next dot
                time = 0; // Set time to 0
                // isPaused = false; // Resume the counter on finishing animation
                console.log(sliderID + " anim done");
              },
            },
            "<" // Start this animation at the same time as previous animation
          );
      }
    }

    // GSAP Animations
    const slideInVP = gsap.timeline({
      // Set GSAP sliders show when in viewport timeline
      defaults: {
        duration: 0.12,
        ease: "none",
      },
    });

    const slideAnim = gsap.timeline({
      // Set GSAP slide animation timeline
      defaults: {
        duration: animDurS,
        ease: animEase,
      },
    });

    gsap.set(slideNotActive, {
      xPercent: 100,
    });

    ScrollTrigger.create({
      animation: slideInVP,
      trigger: actualSlider,
      start: "top 99%",
      end: "bottom 1%",
      markers: {
        id: "asd",
        startColor: "blue",
        endColor: "orange",
        fontSize: "14px",
      },
      toggleActions: "play reverse play reverse",
      // scrub: 3
      onEnter: () => {
        console.log(sliderID + " am venit");
        isPaused = false;
        slideAnim.resume();
      },
      onLeave: () => {
        console.log(sliderID + " am plecat");
        isPaused = true;
        slideAnim.pause();
      },
      onEnterBack: () => {
        console.log(sliderID + " am revenit");
        isPaused = false;
        slideAnim.resume();
      },
      onLeaveBack: () => {
        console.log(sliderID + " m-am intors si am plecat");
        isPaused = true;
        slideAnim.pause();
      },
    });

    // Dot btns
    dot.on("click", function () {
      // console.log($(this));

      let dotActive = dots.find(".active"); // Active dot
      let dotNext = $("#" + sliderID + " .js-dot-" + $(this).data("dot")); // Next dot

      let slideActive = slides.find(".active"); // Active slide
      let slideNext = slides.find(".js-slide-" + $(this).data("dot")); // Get next slide

      if (slideAnim.isActive() || dotActive.data("dot") == $(this).data("dot")) {
        return; // If animation is active OR If click on the same dot do nothing
      }

      if (dotActive.data("dot") > $(this).data("dot")) {
        // Previous animation
        slideAnim // Showing slide
          .to(slideActive, {
            onStart: () => {
              // Start of animation
              dotActive.removeClass("active"); // Remove active class from active dot
            },
            xPercent: 100, // Move showing slide 100% to the right
            onComplete: () => {
              // End of animation
              slideActive.removeClass("active"); // Remove active class from showing slide
            },
          })
          .fromTo(
            slideNext, // Next slide
            {
              xPercent: -100, // Move the next slide 100% to the left*
            },
            {
              xPercent: 0, // *Move the next slide at 0% left
              onComplete: () => {
                // End of animation
                slideNext.addClass("active"); // Add active class to the next slide
                dotNext.addClass("active"); // Add active class to the next dot
                time = 0; // Set time to 0
              },
            },
            "<" // Start this animation at the same time as previous animation
          );
      } else {
        // Next animation
        slideAnim
          .to(slideActive, {
            // Showing slide
            onStart: () => {
              // Start of animation
              dotActive.removeClass("active"); // Remove active class from active dot
            },
            xPercent: -100, // Move showing slide 100% to the left
            onComplete: () => {
              // End of animation
              slideActive.removeClass("active"); // Remove active class from showing slide
            },
          })
          .fromTo(
            slideNext, // Next slide
            {
              xPercent: 100, // Move the next slide 100% to the right*
            },
            {
              xPercent: 0, // *Move the next slide at 0% left
              onComplete: () => {
                // End of animation
                slideNext.addClass("active"); // Add active class to the next slide
                dotNext.addClass("active"); // Add active class to the next dot
                time = 0; // Set time to 0
                console.log(sliderID + " anim done");
              },
            },
            "<" // Start this animation at the same time as previous animation
          );
      }
    });

    // Prev btn
    prev.on("click", () => {
      slidePrevious();
    });

    // Next btn
    next.on("click", () => {
      slideNext();
    });

    // Auto Slide
    if (!$(elem).data("paused") || $(elem).data("paused") === false) {
      // if data-paused not exist or is false
      timeInt = window.setInterval(() => {
        // Time interval (seconds)
        if (!isPaused) {
          time = time + 10;
          actualSlider.find(".scssecoSlider_time").html(time + "ms");
          if (time >= dataBtwnAnimDur) {
            time = 0;
            slideNext();
          }
        }
      }, 10);
    }

    actualSlider.on("mouseenter", () => {
      isPaused = true;
    });

    actualSlider.on("mouseleave", () => {
      isPaused = false;
    });

    // Dev tools
    function scssecoSlideDev() {
      if ($(elem).data("dev") === true) {
        devWrapUl.html(
          "<li>Name: <b>" +
            sliderID +
            "</b></li><li>Time: <b><span class='scssecoSlider_time'></span></b></li><li>Duration between animations: <b>" +
            dataBtwnAnimDur +
            "ms</b></li><li>Animation duration: <b>" +
            dataAnimDur +
            "ms</b></li><li>Easing: <b>" +
            animEase +
            "</b></li><li>Controls: <b>" +
            dataControls +
            "</b></li><li>Paused: <b>" +
            $(elem).data("paused") +
            "</b></li>"
        );
      }
    }

    scssecoSlideDev();
  });

  sliders.show(); // Resolved issue: slider broke when loading and already hovered
})();
