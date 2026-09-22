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

  document.querySelectorAll("[data-testimonial-track]").forEach(function (track) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    Array.prototype.slice.call(track.children).forEach(function (card) {
      var clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
    track.classList.add("is-looping");
  });
})();
