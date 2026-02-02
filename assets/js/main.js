(function() {
  "use strict";

  /**
   * Disable automatic scroll restoration for hash links
   */
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    if (window.scrollY > 100) {
      selectBody.classList.add('scrolled');
      selectHeader.classList.add('scrolled');
    } else {
      selectBody.classList.remove('scrolled');
      selectHeader.classList.remove('scrolled');
    }
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   * Also handle smooth scroll without changing URL
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', (e) => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }

      // Handle same-page hash links without changing URL
      const href = navmenu.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        e.stopPropagation();
        const section = document.querySelector(href);
        if (section) {
          const scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
          // Keep URL clean
          history.replaceState(null, '', window.location.pathname);
        }
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 500,
      easing: 'ease-out',
      once: true,
      mirror: false,
      offset: 50,
      delay: 0
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /*
   * Pricing Toggle
   */

  const pricingContainers = document.querySelectorAll('.pricing-toggle-container');

  pricingContainers.forEach(function(container) {
    const pricingSwitch = container.querySelector('.pricing-toggle input[type="checkbox"]');
    const monthlyText = container.querySelector('.monthly');
    const yearlyText = container.querySelector('.yearly');
    const pricingItems = container.querySelectorAll('.pricing-item');

    if (pricingSwitch.checked) {
      monthlyText.classList.remove('active');
      yearlyText.classList.add('active');
      pricingItems.forEach(item => {
        item.classList.add('yearly-active');
      });
    } else {
      monthlyText.classList.add('active');
      yearlyText.classList.remove('active');
      pricingItems.forEach(item => {
        item.classList.remove('yearly-active');
      });
    }

    pricingSwitch.addEventListener('change', function() {
      if (this.checked) {
        monthlyText.classList.remove('active');
        yearlyText.classList.add('active');
        pricingItems.forEach(item => {
          item.classList.add('yearly-active');
        });
      } else {
        monthlyText.classList.add('active');
        yearlyText.classList.remove('active');
        pricingItems.forEach(item => {
          item.classList.remove('yearly-active');
        });
      }
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  if (window.location.hash) {
    // Immediately scroll to top to prevent flash at wrong position
    window.scrollTo(0, 0);
  }

  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        // Wait for AOS animations to complete before scrolling
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
          // Clean the URL after scrolling
          history.replaceState(null, '', window.location.pathname);
        }, 600);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);


  /**
   * Hero typed animation
   */
  const typedElement = document.querySelector('.typed');

  if (typedElement) {
    const typedItems = typedElement.getAttribute('data-typed-items');

    if (typedItems) {
      const items = typedItems.split(',').map(item => item.trim()).filter(item => item.length > 0);

      if (items.length > 0 && typeof Typed !== 'undefined') {
        window.typedInstance = new Typed('.typed', {
          strings: items,
          loop: true,
          typeSpeed: 80,
          backSpeed: 30,
          backDelay: 2000
        });
      }
    }
  }

  /**
   * Image viewer carousel
   */
  document.querySelectorAll('[data-image-viewer]').forEach((viewer) => {
    const slides = Array.from(viewer.querySelectorAll('[data-image-viewer-slide]'));
    if (!slides.length) {
      return;
    }

    let activeIndex = slides.findIndex((slide) => slide.classList.contains('is-active') || !slide.hasAttribute('hidden'));
    if (activeIndex === -1) {
      activeIndex = 0;
    }

    const setActiveSlide = (nextIndex) => {
      slides.forEach((slide, index) => {
        const isActive = index === nextIndex;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', (!isActive).toString());
      });
    };

    setActiveSlide(activeIndex);

    const prevButton = viewer.querySelector('[data-image-viewer-prev]');
    const nextButton = viewer.querySelector('[data-image-viewer-next]');

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        activeIndex = (activeIndex - 1 + slides.length) % slides.length;
        setActiveSlide(activeIndex);
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        activeIndex = (activeIndex + 1) % slides.length;
        setActiveSlide(activeIndex);
      });
    }
  });

  /**
   * Single video playback - pause other videos when one starts playing
   */
  const pauseAllYouTubeVideos = (exceptElement) => {
    document.querySelectorAll('lite-youtube iframe').forEach((iframe) => {
      if (iframe !== exceptElement && iframe.contentWindow) {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
    });
  };

  // Listen for clicks on lite-youtube elements to ensure only one video plays at a time
  document.querySelectorAll('lite-youtube').forEach((liteYt) => {
    liteYt.addEventListener('click', () => {
      // Pause all other videos when this one is clicked
      setTimeout(() => {
        const iframe = liteYt.querySelector('iframe');
        pauseAllYouTubeVideos(iframe);
      }, 500);
    });
  });

  /**
   * Workflow connecting line - Dynamic SVG path
   * Creates a serpentine line connecting feature blocks
   */
  function initWorkflowLine() {
    const section = document.querySelector('.features-2');
    const svg = document.querySelector('.workflow-line');
    const path = document.querySelector('.workflow-path');
    const container = document.querySelector('.features-2-container');

    if (!section || !svg || !path || !container) return;

    // Only run on desktop (>991px)
    if (window.innerWidth <= 991) return;

    const featureTexts = container.querySelectorAll('.feature-text');
    if (featureTexts.length < 2) return;

    const sectionRect = section.getBoundingClientRect();
    const sectionTop = section.offsetTop;

    // Collect center points of each feature-text block
    const points = [];
    featureTexts.forEach((text, index) => {
      const rect = text.getBoundingClientRect();
      const row = text.closest('.feature-row');
      const isReversed = row && row.classList.contains('reverse');

      // Calculate position relative to section
      const y = rect.top - sectionRect.top + rect.height / 2;

      // X position: connect from the edge of text block toward the image
      let x;
      if (isReversed) {
        // Text is on the left, line should come from the right side
        x = rect.right - sectionRect.left + 30;
      } else {
        // Text is on the right, line should come from the left side
        x = rect.left - sectionRect.left - 30;
      }

      points.push({ x, y, isReversed });
    });

    // Build SVG path with smooth curves
    if (points.length < 2) return;

    let d = `M ${points[0].x},${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];

      // Calculate control points for smooth S-curve
      const midY = (prev.y + curr.y) / 2;

      // Control points create the S-curve effect
      const cp1x = prev.x;
      const cp1y = midY;
      const cp2x = curr.x;
      const cp2y = midY;

      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`;
    }

    path.setAttribute('d', d);

    // Optional: Animate the line drawing on scroll
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    // Animate when section is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          path.style.transition = 'stroke-dashoffset 2s ease-in-out';
          path.style.strokeDashoffset = '0';
        }
      });
    }, { threshold: 0.2 });

    observer.observe(section);
  }

  // Debounce helper
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Initialize workflow line
  window.addEventListener('load', () => {
    // Small delay to ensure layout is complete
    setTimeout(initWorkflowLine, 100);
  });

  // Recalculate on resize (debounced)
  window.addEventListener('resize', debounce(() => {
    const path = document.querySelector('.workflow-path');
    if (path) {
      path.style.transition = 'none';
      path.style.strokeDashoffset = '0';
    }
    initWorkflowLine();
  }, 250));

})();
