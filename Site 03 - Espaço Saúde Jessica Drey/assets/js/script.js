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

  var reviewCarousel = document.querySelector("[data-reviews-carousel]");
  if (reviewCarousel) {
    var reviewTrack = reviewCarousel.querySelector("[data-carousel-track]");
    var reviewSlides = Array.prototype.slice.call(reviewCarousel.querySelectorAll(".review-card"));
    var previousReview = reviewCarousel.querySelector("[data-carousel-prev]");
    var nextReview = reviewCarousel.querySelector("[data-carousel-next]");
    var reviewStatus = reviewCarousel.querySelector("[data-carousel-status]");
    var reviewDots = Array.prototype.slice.call(document.querySelectorAll("[data-carousel-dot]"));
    var currentReview = 0;

    function visibleReviews() {
      if (window.matchMedia("(max-width: 640px)").matches) return 1;
      if (window.matchMedia("(max-width: 980px)").matches) return 2;
      return 4;
    }

    function maxReviewIndex() {
      return Math.max(0, reviewSlides.length - visibleReviews());
    }

    function updateReviewLayout() {
      var gap = parseFloat(window.getComputedStyle(reviewTrack).gap) || 0;
      var slideWidth = reviewSlides[0] ? reviewSlides[0].getBoundingClientRect().width : 0;
      reviewTrack.style.transform = "translateX(-" + (currentReview * (slideWidth + gap)) + "px)";
      reviewDots.forEach(function (dot, dotIndex) {
        var available = dotIndex <= maxReviewIndex();
        dot.hidden = !available;
        dot.setAttribute("aria-hidden", String(!available));
      });
    }

    function showReview(index) {
      currentReview = Math.max(0, Math.min(index, maxReviewIndex()));
      previousReview.disabled = currentReview === 0;
      nextReview.disabled = currentReview === maxReviewIndex();
      if (reviewStatus) reviewStatus.textContent = (currentReview + 1) + " / " + (maxReviewIndex() + 1);
      reviewDots.forEach(function (dot, dotIndex) {
        var active = dotIndex === currentReview;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-selected", String(active));
      });
      updateReviewLayout();
    }

    previousReview.addEventListener("click", function () { showReview(currentReview - 1); });
    nextReview.addEventListener("click", function () { showReview(currentReview + 1); });
    reviewDots.forEach(function (dot) {
      dot.addEventListener("click", function () { showReview(Number(dot.getAttribute("data-carousel-dot"))); });
    });
    reviewCarousel.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") showReview(currentReview - 1);
      if (event.key === "ArrowRight") showReview(currentReview + 1);
    });
    window.addEventListener("resize", updateReviewLayout);
    showReview(0);
  }

  document.querySelectorAll("[data-year]").forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });
  var year = document.getElementById("ano");
  if (year) year.textContent = String(new Date().getFullYear());
})();
