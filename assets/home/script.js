const projects = [...document.querySelectorAll(".project")];

projects.forEach((project) => {
  const media = project.querySelector(".project__media");
  const image = project.querySelector("img");
  const number = project.querySelector(".project__number")?.textContent ?? "";

  media.dataset.fallback = number;
  image?.addEventListener("error", () => media.classList.add("is-missing"));
});

if (
  "IntersectionObserver" in window &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 },
  );

  projects.forEach((project) => observer.observe(project));
} else {
  projects.forEach((project) => project.classList.add("is-visible"));
}
