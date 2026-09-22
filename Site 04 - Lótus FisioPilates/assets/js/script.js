(function () {
  "use strict";
  window.__studioSiteJsReady = true;

  var toggles = [
    { button: document.getElementById("burger"), menu: document.getElementById("menu"), className: "is-open" },
    { button: document.getElementById("menuToggle"), menu: document.getElementById("navMobile"), className: "open" },
    { button: document.querySelector("[data-menu-button]"), menu: document.getElementById("main-nav"), className: "is-open" }
  ];

  function setMenu(item, open) {
    if (!item.button || !item.menu) return;
    item.button.setAttribute("aria-expanded", String(open));
    item.button.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    item.button.classList.toggle("open", open);
    item.menu.classList.toggle(item.className, open);
    document.body.classList.toggle("menu-open", open);
  }

  toggles.forEach(function (item) {
    if (!item.button || !item.menu) return;
    item.button.addEventListener("click", function () {
      setMenu(item, item.button.getAttribute("aria-expanded") !== "true");
    });
    item.menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(item, false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") toggles.forEach(function (item) { setMenu(item, false); });
  });

  var header = document.getElementById("header") || document.getElementById("nav") || document.querySelector("[data-header]");
  function updateHeader() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 20);
    header.classList.toggle("is-stuck", window.scrollY > 8);
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  document.querySelectorAll(".reveal").forEach(function (element) {
    element.classList.add("is-in", "visible");
  });

  document.querySelectorAll("[data-year]").forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });
  var year = document.getElementById("ano");
  if (year) year.textContent = String(new Date().getFullYear());

  function initTestimonialsCarousel() {
    var carousel = document.querySelector(".testimonial-marquee");
    if (!carousel) return;

    var track = carousel.querySelector(".testimonial-track");
    var cards = track ? Array.prototype.slice.call(track.querySelectorAll(".testimonial-card")) : [];
    if (!track || !cards.length) return;

    carousel.classList.add("testimonial-carousel");
    carousel.setAttribute("data-testimonial-carousel", "");
    carousel.setAttribute("role", "region");

    var toolbar = document.createElement("div");
    toolbar.className = "testimonial-carousel__toolbar";
    toolbar.innerHTML = '<div><span class="testimonial-carousel__kicker">Experiências reais</span><strong>O cuidado que continua depois da aula.</strong></div><div class="testimonial-carousel__controls"><button class="carousel-button" type="button" data-testimonial-prev aria-label="Depoimento anterior" title="Depoimento anterior">&#8592;</button><button class="carousel-button" type="button" data-testimonial-next aria-label="Próximo depoimento" title="Próximo depoimento">&#8594;</button></div>';

    var viewport = document.createElement("div");
    viewport.className = "testimonial-viewport";
    carousel.insertBefore(toolbar, track);
    carousel.insertBefore(viewport, track);
    viewport.appendChild(track);

    var footer = document.createElement("div");
    footer.className = "testimonial-carousel__footer";
    footer.innerHTML = '<span data-testimonial-status aria-live="polite"></span><span class="testimonial-carousel__hint">Use as setas para ver mais</span>';
    carousel.appendChild(footer);

    var previous = toolbar.querySelector("[data-testimonial-prev]");
    var next = toolbar.querySelector("[data-testimonial-next]");
    var status = footer.querySelector("[data-testimonial-status]");
    var index = 0;
    var timer = null;

    function getVisibleCount() {
      if (window.innerWidth >= 1080) return 3;
      if (window.innerWidth >= 680) return 2;
      return 1;
    }

    function updateCarousel() {
      var visible = Math.min(getVisibleCount(), cards.length);
      var maxIndex = Math.max(0, cards.length - visible);
      index = Math.min(index, maxIndex);
      var gap = parseFloat(window.getComputedStyle(track).columnGap || window.getComputedStyle(track).gap) || 16;
      var step = cards[0].getBoundingClientRect().width + gap;
      track.style.transform = "translate3d(" + (index * step * -1) + "px, 0, 0)";
      previous.disabled = index === 0;
      next.disabled = index === maxIndex;
      status.textContent = (index + 1) + "–" + Math.min(index + visible, cards.length) + " de " + cards.length;
    }

    function move(direction) {
      var visible = Math.min(getVisibleCount(), cards.length);
      var maxIndex = Math.max(0, cards.length - visible);
      index = Math.max(0, Math.min(index + direction, maxIndex));
      updateCarousel();
    }

    function stopAutoplay() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }

    function startAutoplay() {
      stopAutoplay();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      timer = window.setInterval(function () {
        var visible = Math.min(getVisibleCount(), cards.length);
        var maxIndex = Math.max(0, cards.length - visible);
        index = index >= maxIndex ? 0 : index + 1;
        updateCarousel();
      }, 6500);
    }

    previous.addEventListener("click", function () { move(-1); startAutoplay(); });
    next.addEventListener("click", function () { move(1); startAutoplay(); });
    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);
    carousel.addEventListener("focusin", stopAutoplay);
    carousel.addEventListener("focusout", function (event) {
      if (!carousel.contains(event.relatedTarget)) startAutoplay();
    });
    window.addEventListener("resize", updateCarousel, { passive: true });
    updateCarousel();
    startAutoplay();
  }

  initTestimonialsCarousel();
})();
