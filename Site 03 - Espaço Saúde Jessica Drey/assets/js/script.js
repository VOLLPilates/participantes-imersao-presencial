document.querySelectorAll("details").forEach((item) =>
  item.addEventListener("toggle", () => {
    if (item.open)
      document.querySelectorAll("details[open]").forEach((other) => {
        if (other !== item) other.open = false;
      });
  }),
);
