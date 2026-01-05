(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
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
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
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
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
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
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
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
   * Demo modal video handling
   */
  const demoModal = document.getElementById('demoModal');
  if (demoModal) {
    const videoFrame = demoModal.querySelector('[data-demo-video]');
    const videoSrc = videoFrame ? videoFrame.getAttribute('data-video-src') : '';

    demoModal.addEventListener('shown.bs.modal', () => {
      if (videoFrame && videoSrc) {
        videoFrame.setAttribute('src', videoSrc);
      }
    });

    demoModal.addEventListener('hidden.bs.modal', () => {
      if (videoFrame) {
        videoFrame.setAttribute('src', '');
      }
    });
  }

  /**
   * Hero typed animation
   */
  const typedElement = document.querySelector('.typed');

  if (typedElement) {
    const typedItems = typedElement.getAttribute('data-typed-items');

    if (typedItems) {
      const items = typedItems.split(',').map(item => item.trim()).filter(item => item.length > 0);

      if (items.length > 0 && typeof Typed !== 'undefined') {
        new Typed('.typed', {
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
   * YouTube Facade - Click to load iframe
   */
  document.querySelectorAll('.youtube-facade').forEach((facade) => {
    facade.addEventListener('click', function() {
      const videoId = this.getAttribute('data-video-id');
      if (!videoId) return;

      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
      iframe.setAttribute('title', this.getAttribute('title') || 'YouTube video');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('allowfullscreen', '');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.position = 'absolute';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.border = 'none';

      this.replaceWith(iframe);
    });
  });

})();
