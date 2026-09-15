/* ============================================
   A2 Studio Pilates e Fisioterapia
   Scripts de interação
   ============================================ */

(function () {
  'use strict';

  /* ---- Header scroll effect ---- */
  var header = document.getElementById('header');
  var lastScroll = 0;

  function handleScroll() {
    var scrollY = window.pageYOffset;

    if (scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ---- Mobile menu toggle ---- */
  var menuToggle = document.getElementById('menuToggle');
  var navMobile = document.getElementById('navMobile');

  function toggleMenu() {
    var isOpen = navMobile.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  }

  menuToggle.addEventListener('click', toggleMenu);

  /* ---- Close mobile menu on link click ---- */
  var mobileLinks = navMobile.querySelectorAll('a');
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navMobile.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
    });
  });

  /* ---- Close mobile menu on outside click ---- */
  document.addEventListener('click', function (e) {
    if (
      navMobile.classList.contains('open') &&
      !navMobile.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      navMobile.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---- Close mobile menu on Escape ---- */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMobile.classList.contains('open')) {
      navMobile.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    }
  });

  /* ---- Scroll reveal (IntersectionObserver) ---- */
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Fallback: show everything */
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---- Active nav link on scroll ---- */
  var sections = document.querySelectorAll('main section[id]');
  var desktopNavLinks = document.querySelectorAll('.nav-desktop a[href^="#"]');

  function updateActiveLink() {
    var scrollY = window.pageYOffset + 100;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        desktopNavLinks.forEach(function (link) {
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* ---- Smooth scroll fallback for older browsers ---- */
  if (!('scrollBehavior' in document.documentElement.style)) {
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;

        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var headerHeight = header.offsetHeight;
          var targetPosition = target.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /* ---- Initialize ---- */
  handleScroll();
  updateActiveLink();
})();
