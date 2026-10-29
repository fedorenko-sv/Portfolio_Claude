/* Accessibility adapter for the existing, isolated presentation bundle. */
(() => {
  const root = document.getElementById("root");
  if (!root) return;
  const normalize = (value) =>
    (value || "").replace(/\s+/g, " ").trim().toLocaleLowerCase("ru");
  function adapt() {
    root
      .querySelector("header + div.overflow-y-auto")
      ?.setAttribute("role", "main");
    const menuTitle = root.querySelector(
      'header button[aria-label="Вернуться в меню"]',
    );
    if (menuTitle) {
      menuTitle.removeAttribute("aria-label");
      menuTitle.title = "Вернуться в меню";
    }
    root.querySelectorAll("nav").forEach((nav, index) => {
      if (!nav.hasAttribute("aria-label"))
        nav.setAttribute(
          "aria-label",
          nav.querySelector('[id^="tab-btn"]')
            ? "Разделы меню"
            : `Разделы ресторана ${index + 1}`,
        );
    });
    root.querySelectorAll("button img[alt]").forEach((img) => {
      if (
        img.alt &&
        normalize(img.alt) === normalize(img.closest("button").textContent)
      )
        img.alt = "";
    });
    root
      .querySelectorAll("article .snap-x.overflow-x-auto")
      .forEach((gallery) => {
        gallery.tabIndex = 0;
        gallery.setAttribute("role", "group");
        const name =
          gallery.closest("article").querySelector("h3")?.textContent ||
          "Блюдо";
        gallery.setAttribute(
          "aria-label",
          `Фото и видео: ${name}. Enter — открыть блюдо`,
        );
      });
  }
  root.addEventListener("keydown", (event) => {
    if (
      event.key === "Enter" &&
      event.target.matches("article .snap-x.overflow-x-auto")
    ) {
      event.preventDefault();
      event.target.closest("article").click();
    }
  });
  new MutationObserver(adapt).observe(root, { childList: true, subtree: true });
  adapt();
})();
