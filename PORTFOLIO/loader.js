class Loader {
  constructor() {
    // Hide main content initially
    gsap.set([".container", ".theme-toggle"], {
      opacity: 0,
      visibility: "hidden",
    });

    // Get all letters
    this.letters = document.querySelectorAll(".letter");

    // Set initial states for letters
    gsap.set(this.letters, {
      opacity: 0,
      scale: 1.5,
      filter: "blur(10px)",
    });

    // Start the animation sequence
    this.startAnimation();
  }

  startAnimation() {
    // Create the main timeline for the complete animation sequence
    const mainTimeline = gsap.timeline();

    // First timeline: Hello animation
    const helloTimeline = gsap.timeline();

    // Animate letters appearing
    helloTimeline
      .to(this.letters, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.15,
        ease: "power2.out",
      })
      // Hold the letters in place for 1 second
      .to(this.letters, {
        duration: 1,
        ease: "none",
      })
      // Add floating animation
      .to(this.letters, {
        y: -20,
        duration: 2,
        ease: "power1.inOut",
        stagger: {
          each: 0.15,
          repeat: 1,
          yoyo: true,
        },
      })
      // Hold again after floating
      .to(this.letters, {
        duration: 2, // 2-second pause at the end
        ease: "none",
      });

    // Add dot animation separately to run during the sequence
    helloTimeline.to(
      ".dot",
      {
        scale: 1.2,
        opacity: 0.8,
        duration: 1,
        ease: "power1.inOut",
        repeat: 5,
        yoyo: true,
      },
      1
    ); // Start 1 second after beginning

    // Second timeline: Content reveal
    const revealTimeline = gsap.timeline({
      paused: true, // Start paused
    });

    // Content reveal animation
    revealTimeline
      .to(this.letters, {
        opacity: 0,
        y: -50,
        scale: 0.8,
        filter: "blur(10px)",
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.in",
      })
      .to(
        ".loader-container",
        {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            const loader = document.querySelector(".loader-container");
            if (loader) loader.remove();
          },
        },
        "-=0.4"
      )
      .to(".theme-toggle", {
        opacity: 1,
        visibility: "visible",
        duration: 0.8,
      })
      .to(
        ".container",
        {
          opacity: 1,
          visibility: "visible",
          duration: 0.8,
        },
        "-=0.4"
      )
      .add(() => {
        gsap.from([".name", ".title", ".navigation", ".social-links"], {
          opacity: 0,
          y: 20,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
        });

        gsap.from(".content-section", {
          opacity: 0,
          y: 30,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
        });
      });

    // After hello animation completes, wait 3 seconds before revealing content
    helloTimeline.eventCallback("onComplete", () => {
      gsap.delayedCall(3, () => revealTimeline.play()); // 3-second delay before content reveal
    });

    // Add hello animation to main timeline
    mainTimeline.add(helloTimeline);
  }
}

// Initialize loader when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new Loader();
});
