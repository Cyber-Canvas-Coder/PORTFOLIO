// Import GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Loader Animation
function initLoader() {
  const loaderTimeline = gsap.timeline();

  // Animate loader cube
  loaderTimeline.to(".loader-cube", {
    rotateY: 360,
    duration: 2,
    ease: "power1.inOut",
    repeat: -1,
  });

  // Loading sequence
  gsap.to(".loader-text", {
    opacity: 0.5,
    duration: 0.8,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });

  // Hide loader and show content after everything is loaded
  window.addEventListener("load", () => {
    const mainTimeline = gsap.timeline({
      onComplete: () => {
        // Remove loader from DOM after animation
        document.querySelector(".loader-container").remove();
      },
    });

    mainTimeline
      // Fade out loader
      .to(".loader-container", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      })
      // Show theme toggle
      .to(
        ".theme-toggle",
        {
          opacity: 1,
          visibility: "visible",
          duration: 0.5,
        },
        "-=0.3"
      )
      // Show main container
      .to(
        ".container",
        {
          opacity: 1,
          visibility: "visible",
          duration: 0.5,
        },
        "-=0.3"
      )
      // Start content animations
      .add(() => {
        // Initial animations
        gsap.to(".name", {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        });

        gsap.to(".title", {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
        });

        gsap.to(".navigation", {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.6,
          ease: "power3.out",
        });

        gsap.to(".social-links", {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.9,
          ease: "power3.out",
        });

        // Initialize sections
        const sections = document.querySelectorAll(".content-section");
        sections.forEach((section) => {
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.9,
            ease: "power3.out",
          });
        });
      });
  });
}

// Initialize loader
initLoader();

// Cursor Effect
const cursor = document.querySelector(".cursor");
let isHovered = false;

document.addEventListener("mousemove", (e) => {
  // Add a slight lag to make it smoother
  requestAnimationFrame(() => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
});

// Enhanced hover effect for interactive elements
const interactiveElements = document.querySelectorAll(
  "button, a, .project-card, .nav-btn, h2, .experience-item"
);

interactiveElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
    isHovered = true;
  });

  element.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
    isHovered = false;
  });
});

// Hide cursor when leaving the window
document.addEventListener("mouseleave", () => {
  cursor.style.opacity = "0";
});

document.addEventListener("mouseenter", () => {
  cursor.style.opacity = "1";
});

// Prevent cursor flash on click
document.addEventListener("mousedown", () => {
  if (isHovered) {
    cursor.style.transform = "translate(-50%, -50%) scale(0.9)";
  }
});

document.addEventListener("mouseup", () => {
  if (isHovered) {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
  }
});

// Initialize smooth scrolling
function initSmoothScroll() {
  const sections = document.querySelectorAll(".content-section");
  const navButtons = document.querySelectorAll(".nav-btn");

  // Set up ScrollTrigger for each section
  sections.forEach((section, index) => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: "top center+=100",
        end: "bottom center",
        toggleActions: "play none none reverse",
        markers: false,
        scroller: ".right-section",
      },
    });

    // Create scroll trigger for navigation
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      scroller: ".right-section",
      onToggle: ({ isActive }) => {
        if (isActive) {
          navButtons.forEach((btn) => btn.classList.remove("active"));
          navButtons[index].classList.add("active");
        }
      },
    });
  });

  // Handle navigation clicks with improved targeting
  navButtons.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute("data-section");
      const target = document.querySelector(`#${targetId}`);
      const container = document.querySelector(".right-section");

      if (target) {
        // Remove active class from all buttons
        navButtons.forEach((button) => button.classList.remove("active"));
        // Add active class to clicked button
        btn.classList.add("active");

        // Calculate scroll position with offset
        const containerPadding = parseInt(
          window.getComputedStyle(container).paddingTop
        );
        const targetPosition = target.offsetTop - containerPadding;

        // Smooth scroll to target
        gsap.to(container, {
          scrollTop: targetPosition,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            // Update active states after scrolling
            ScrollTrigger.refresh();
          },
        });
      }
    });
  });

  // Add scroll event listener to update active states
  const container = document.querySelector(".right-section");
  container.addEventListener("scroll", () => {
    const scrollPosition = container.scrollTop;

    // Update active states based on scroll position
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop - 200 &&
        scrollPosition < sectionTop + sectionHeight - 200
      ) {
        navButtons.forEach((btn) => btn.classList.remove("active"));
        navButtons[index].classList.add("active");
      }
    });
  });
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Initialize GSAP plugins
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Initialize all animations and interactions
  initSmoothScroll();
  initSectionAnimations();
  wrapLetters();

  // Initial setup for sections
  const sections = document.querySelectorAll(".content-section");
  sections.forEach((section) => {
    section.style.opacity = "1";
    section.style.visibility = "visible";
  });

  // Show the initial section (about)
  const initialSection = document.querySelector("#about");
  if (initialSection) {
    initialSection.classList.add("active");
  }

  // Set up navigation
  const navButtons = document.querySelectorAll(".nav-btn");
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all sections
      document.querySelectorAll(".content-section").forEach((section) => {
        section.classList.remove("active");
      });

      // Add active class to target section
      const targetId = button.getAttribute("data-section");
      const targetSection = document.querySelector(`#${targetId}`);
      if (targetSection) {
        targetSection.classList.add("active");
      }

      // Update navigation button states
      navButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });

  // Handle "Show More" functionality for projects
  const loadMoreBtn = document.querySelector(".load-more-btn");
  const hiddenProjects = document.querySelectorAll(".project-card.hidden");

  if (loadMoreBtn && hiddenProjects.length > 0) {
    loadMoreBtn.addEventListener("click", () => {
      hiddenProjects.forEach((project) => {
        project.classList.remove("hidden");
        project.classList.add("visible");
      });

      // Update button text and icon
      const buttonText = loadMoreBtn.querySelector("span");
      const buttonIcon = loadMoreBtn.querySelector("i");

      if (buttonText && buttonIcon) {
        buttonText.textContent = "Show Less";
        buttonIcon.classList.remove("bi-chevron-down");
        buttonIcon.classList.add("bi-chevron-up");
      }

      loadMoreBtn.classList.add("expanded");
    });
  }
});

// Update ScrollTrigger on resize
window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});

// Initialize section animations
function initSectionAnimations() {
  const scroller = ".right-section";

  // Experience items animation
  gsap.utils.toArray(".experience-item").forEach((item) => {
    gsap.from(item, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: item,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
        scroller: scroller,
      },
    });
  });

  // Project cards animation
  gsap.utils.toArray(".project-card").forEach((card) => {
    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: card,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
        scroller: scroller,
      },
    });
  });
}

// Wrap each letter of the name in a span
function wrapLetters() {
  const nameElement = document.querySelector(".name");
  const text = nameElement.textContent;
  nameElement.textContent = "";

  text.split("").forEach((char, index) => {
    if (char === " ") {
      nameElement.appendChild(document.createTextNode(" "));
    } else {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.animationDelay = `${index * 0.05}s`;
      nameElement.appendChild(span);
    }
  });
}
