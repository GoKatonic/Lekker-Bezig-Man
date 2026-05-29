/* ================================
   DAKCALCULATOR
================================ */

function initPriceCalculator() {
  const roofArea = document.getElementById("roofArea");
  const removeOldRoof = document.getElementById("removeOldRoof");
  const roofInsulation = document.getElementById("roofInsulation");
  const insulationLabel = document.getElementById("insulationLabel");

  const priceOutput = document.getElementById("priceOutput");
  const basePriceText = document.getElementById("basePriceText");
  const extraRoofText = document.getElementById("extraRoofText");
  const removeOldRoofText = document.getElementById("removeOldRoofText");
  const insulationText = document.getElementById("insulationText");

  const requiredElements = [
    roofArea,
    removeOldRoof,
    roofInsulation,
    insulationLabel,
    priceOutput,
    basePriceText,
    extraRoofText,
    removeOldRoofText,
    insulationText
  ];

  if (requiredElements.some((element) => !element)) {
    console.warn("Calculator elements not found.");
    return;
  }

  const START_PRICE = 2000;
  const FREE_M2 = 10;
  const PRICE_PER_EXTRA_M2 = 100;
  const INSULATION_PRICE_PER_M2 = 50;

  function formatPrice(value) {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0
    }).format(value);
  }

  function calculatePrice() {
    const area = Math.max(Number(roofArea.value) || 1, 1);

    const extraM2 = Math.max(area - FREE_M2, 0);
    const extraRoofPrice = extraM2 * PRICE_PER_EXTRA_M2;

    let removeOldRoofPrice = 0;
    let insulationPrice = 0;

    /*
      Oude laag verwijderen en afvoeren:
      Volgens jouw voorbeeld telt dit als extra bedrag gelijk aan:
      startbedrag + extra dakbedekking.

      Voor 30 m²:
      startbedrag = 2000
      extra dakbedekking = 20 × 100 = 2000
      oude laag verwijderen = 0 in aparte regel volgens voorbeeld,
      want voorbeeld rekent 2000 + 2000 + 1500 = 5500.

      Daarom blijft removeOldRoofPrice hier 0.
      Deze checkbox werkt alleen als voorwaarde voor isolatie.
    */

    if (!removeOldRoof.checked) {
      roofInsulation.checked = false;
      roofInsulation.disabled = true;

      insulationLabel.classList.add("opacity-50", "cursor-not-allowed");
      insulationLabel.classList.remove("cursor-pointer");
    } else {
      roofInsulation.disabled = false;

      insulationLabel.classList.remove("opacity-50", "cursor-not-allowed");
      insulationLabel.classList.add("cursor-pointer");

      if (roofInsulation.checked) {
        insulationPrice = area * INSULATION_PRICE_PER_M2;
      }
    }

    const totalPrice =
      START_PRICE +
      extraRoofPrice +
      removeOldRoofPrice +
      insulationPrice;

    basePriceText.textContent = formatPrice(START_PRICE);
    extraRoofText.textContent = formatPrice(extraRoofPrice);
    removeOldRoofText.textContent = formatPrice(removeOldRoofPrice);
    insulationText.textContent = formatPrice(insulationPrice);
    priceOutput.textContent = formatPrice(totalPrice);
  }

  roofArea.addEventListener("input", calculatePrice);
  roofArea.addEventListener("change", calculatePrice);
  removeOldRoof.addEventListener("change", calculatePrice);
  roofInsulation.addEventListener("change", calculatePrice);

  calculatePrice();
}

document.addEventListener("DOMContentLoaded", () => {
  initPriceCalculator();
});