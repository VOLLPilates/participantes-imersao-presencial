const tabs = [...document.querySelectorAll('[role="tab"]')];
tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => activate(tab));
  tab.addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
    e.preventDefault();
    const next =
      (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    tabs[next].focus();
    activate(tabs[next]);
  });
});
function activate(tab) {
  tabs.forEach((t) => {
    const selected = t === tab;
    t.setAttribute("aria-selected", String(selected));
    t.tabIndex = selected ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = !selected;
  });
}

tabs.forEach((tab) => {
  tab.tabIndex = tab.getAttribute("aria-selected") === "true" ? 0 : -1;
});
