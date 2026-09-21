document.querySelectorAll(".accordions details").forEach((d) =>
  d.addEventListener("toggle", () => {
    if (d.open)
      document.querySelectorAll(".accordions details[open]").forEach((x) => {
        if (x !== d) x.open = false;
      });
  }),
);
