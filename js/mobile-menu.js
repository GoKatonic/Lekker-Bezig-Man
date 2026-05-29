function initMobileMenu() {
  const button = document.getElementById("mobileMenuButton");
  const menu = document.getElementById("mobileMenu");

  if (!button || !menu) return;

  function closeMenu() {
    menu.classList.add("hidden");
    button.setAttribute("aria-expanded", "false");
  }

  button.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("hidden");

    if (isOpen) {
      closeMenu();
    } else {
      menu.classList.remove("hidden");
      button.setAttribute("aria-expanded", "true");
    }
  });

  menu.addEventListener("mouseleave", closeMenu);

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}