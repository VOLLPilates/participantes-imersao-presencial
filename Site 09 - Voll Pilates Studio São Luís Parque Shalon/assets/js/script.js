const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const menu = document.querySelector("#main-nav");
const menuLabel = menuButton?.querySelector(".sr-only");

const setMenu = (open) => {
  if (!menuButton || !menu || !header) return;

  menuButton.setAttribute("aria-expanded", String(open));
  menu.classList.toggle("is-open", open);
  header.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);

  if (menuLabel) {
    menuLabel.textContent = open ? "Fechar menu" : "Abrir menu";
  }
};

menuButton?.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});

menu?.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});
