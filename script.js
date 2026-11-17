/**
 * SHARAN B - EXECUTIVE PORTFOLIO INTERACTIVITY SCRIPT
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Typed.js for dynamic executive capability display
  if (typeof Typed !== "undefined" && document.querySelector(".typed-text")) {
    new Typed(".typed-text", {
      strings: [
        "Autonomous Multi-Agent Systems",
        "Enterprise AI Solutions @ ChainSys",
        "Full-Stack Architecture (Angular & Node)",
        "Predictive Analytics & Machine Learning",
        "Deterministic LLM Orchestration"
      ],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      showCursor: false
    });
  }

  // 2. Initialize AOS (Animate on Scroll) with continuous re-triggering
  if (typeof AOS !== "undefined") {
    AOS.init({
      once: false,
      mirror: true,
      offset: 60,
      duration: 650,
      easing: "ease-out-cubic"
    });
  }

  // 3. Mobile Navigation Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navLinksContainer = document.getElementById("nav-links");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener("click", () => {
      navLinksContainer.classList.toggle("show");
      const icon = menuToggle.querySelector("i");
      if (icon) {
        if (navLinksContainer.classList.contains("show")) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-xmark");
        } else {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      }
    });

    // Close menu when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navLinksContainer.classList.remove("show");
        const icon = menuToggle.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      });
    });
  }

  // 4. Navbar Sticky State & Scrollspy
  const navbar = document.getElementById("navbar");
  const sections = document.querySelectorAll("section[id]");
  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    const scrollPos = window.pageYOffset;

    // Sticky shadow on navbar
    if (navbar) {
      if (scrollPos > 30) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    }

    // Scrollspy for active nav link
    let currentSectionId = "";
    if (scrollPos < 150) {
      currentSectionId = "home";
    } else {
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 110;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute("id");
        }
      });
    }

    if (currentSectionId) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });

  // 5. Smooth scroll click handling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#" || targetId === "#!") return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      if (targetId === "#home") {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      } else {
        const navHeight = navbar ? navbar.offsetHeight : 65;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPos,
          behavior: "smooth"
        });
      }
    });
  });

  // 6. Back to top button click event
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});

/**
 * Copy to clipboard helper with toast feedback
 */
function copyToClipboard(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied "${text}" to clipboard!`);
    
    // Quick visual icon feedback on button
    if (btnElement) {
      const originalHTML = btnElement.innerHTML;
      btnElement.innerHTML = '<i class="fa-solid fa-check" style="color: #10b981;"></i>';
      setTimeout(() => {
        btnElement.innerHTML = originalHTML;
      }, 2000);
    }
  }).catch((err) => {
    console.error("Clipboard copy failed: ", err);
  });
}

/**
 * Toast Notification display
 */
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

/**
 * Executive contact form submit handler
 */
function handleContactSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById("form-name").value;
  const email = document.getElementById("form-email").value;
  const subject = document.getElementById("form-subject").value;
  const message = document.getElementById("form-message").value;

  const mailtoLink = `mailto:sharan1264@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
  
  showToast("Opening email client to dispatch message...");
  setTimeout(() => {
    window.location.href = mailtoLink;
  }, 600);
}
