 function initOfferteForm() {
    const form = document.getElementById("offerteForm");
    const status = document.getElementById("offerteStatus");

    if (!form || !status) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      status.classList.remove("hidden");
      status.textContent =
        "Bedankt! Je aanvraag is voorbereid. Sluit later Formspree, Netlify Forms of backend aan om deze echt te verzenden.";

      form.reset();
    });
  }