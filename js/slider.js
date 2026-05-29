document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector('[data-slider="over-ons"]');

  if (!slider) {
    console.warn("Slider not found");
    return;
  }

  const track = slider.querySelector("[data-slider-track]");
  const prevButton = slider.querySelector("[data-slider-prev]");
  const nextButton = slider.querySelector("[data-slider-next]");
  const dotsContainer = slider.querySelector("[data-slider-dots]");

  if (!track) {
    console.warn("Slider track not found");
    return;
  }

  const photos = [
    "./assets/photos/1.jpg",
    "./assets/photos/2.jpg",
    "./assets/photos/3.jpg",
    "./assets/photos/4.jpg",
    "./assets/photos/5.jpg",
    "./assets/photos/6.jpg",
    "./assets/photos/7.jpg",
    "./assets/photos/8.jpg",
    "./assets/photos/9.jpg",
    "./assets/photos/10.jpg",
    "./assets/photos/11.jpg",
    "./assets/photos/12.jpg",
    "./assets/photos/13.jpg",
    "./assets/photos/14.jpg",
    "./assets/photos/15.jpg",
    "./assets/photos/16.jpg",
    "./assets/photos/17.jpg",
    "./assets/photos/18.jpg",
  ];

  let currentSlide = 0;
  let autoplay = null;

  function createSlides() {
    track.innerHTML = "";

    photos.forEach((src, index) => {
      const slide = document.createElement("div");

      slide.className = "h-full min-w-full shrink-0";

      slide.innerHTML = `
        <img
          src="${src}"
          alt="Project foto ${index + 1} Lekker Bezig Man"
          class="h-full w-full object-cover object-center"
          loading="${index === 0 ? "eager" : "lazy"}"
        >
      `;

      track.appendChild(slide);
    });
  }

  function createDots() {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = "";

    photos.forEach((_, index) => {
      const dot = document.createElement("button");

      dot.type = "button";
      dot.setAttribute("aria-label", `Ga naar foto ${index + 1}`);
      dot.className = getDotClass(index === currentSlide);

      dot.addEventListener("click", () => {
        currentSlide = index;
        updateSlider();
        restartAutoplay();
      });

      dotsContainer.appendChild(dot);
    });
  }

  function getDotClass(isActive) {
    return isActive
      ? "h-2 w-6 rounded-full bg-[#A8BD8A] shadow-[0_0_14px_rgba(168,189,138,0.55)] transition-all duration-300"
      : "h-2 w-2 rounded-full bg-white/40 transition-all duration-300 hover:bg-white/70";
  }

  function updateDots() {
    if (!dotsContainer) return;

    const dots = dotsContainer.querySelectorAll("button");

    dots.forEach((dot, index) => {
      dot.className = getDotClass(index === currentSlide);
    });
  }

  function updateSlider() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % photos.length;
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + photos.length) % photos.length;
    updateSlider();
  }

  function startAutoplay() {
    stopAutoplay();
    autoplay = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    if (autoplay) {
      clearInterval(autoplay);
      autoplay = null;
    }
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  createSlides();
  createDots();
  updateSlider();
  startAutoplay();

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      nextSlide();
      restartAutoplay();
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      prevSlide();
      restartAutoplay();
    });
  }

  slider.addEventListener("mouseenter", stopAutoplay);
  slider.addEventListener("mouseleave", startAutoplay);

  if (window.lucide) {
    lucide.createIcons();
  }
});