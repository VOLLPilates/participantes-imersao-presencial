const b = document.querySelector(".nav-toggle"),
  n = document.querySelector("#nav");
b?.addEventListener("click", () => {
  const v = b.getAttribute("aria-expanded") === "true";
  b.setAttribute("aria-expanded", String(!v));
  n.classList.toggle("open", !v);
});
document.querySelectorAll("details").forEach((d) =>
  d.addEventListener("toggle", () => {
    if (d.open)
      document.querySelectorAll("details[open]").forEach((x) => {
        if (x !== d) x.open = false;
      });
  }),
);
