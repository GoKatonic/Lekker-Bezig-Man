document.addEventListener("DOMContentLoaded", async () => {
  const savedScroll = sessionStorage.getItem("scrollPosition");

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  if (typeof loadIncludes === "function") {
    await loadIncludes();
  }

  if (typeof initMobileMenu === "function") {
    initMobileMenu();
  }

  if (typeof initPriceCalculator === "function") {
    initPriceCalculator();
  }

  if (typeof initProjectSlider === "function") {
    initProjectSlider();
  }

  if (typeof initOfferteForm === "function") {
    initOfferteForm();
  }

  if (window.lucide) {
    lucide.createIcons({
      attrs: {
        "stroke-width": 1.9
      }
    });
  }

  if (savedScroll !== null) {
    requestAnimationFrame(() => {
      window.scrollTo({
        top: Number(savedScroll),
        left: 0,
        behavior: "instant"
      });
    });
  }
});

window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("scrollPosition", String(window.scrollY));
});