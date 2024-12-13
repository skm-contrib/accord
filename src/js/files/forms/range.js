// Підключення з node_modules
import * as noUiSlider from "nouislider";

// Підключення стилів з scss/base/forms/range.scss
// у файлі scss/forms/forms.scss

// Підключення стилів з node_modules
//import 'nouislider/dist/nouislider.css';

export function rangeInit() {
  const sliders = document.querySelectorAll("[data-range-wrapper]");

  sliders.forEach((slider) => {
    const priceSlider = slider.querySelector("[data-range]");
    if (priceSlider) {
      var textFrom = +priceSlider.getAttribute("data-from");
      var textTo = +priceSlider.getAttribute("data-to");

      let formatOptions = {};

      if (slider.dataset.rangeWrapper === "price") {
        formatOptions = {
          decimals: 0,
          suffix: " ₴",
          thousand: " ",
        };
      } else if (slider.dataset.rangeWrapper === "power") {
        formatOptions = {
          decimals: 2,
          suffix: " кВт",
        };
      }

      noUiSlider.create(priceSlider, {
        start: [textFrom, textTo],
        connect: true,
        range: {
          min: [textFrom],
          max: [textTo],
        },
        format: wNumb(formatOptions),
      });

      const priceStart = slider.querySelector("[data-price-start]");
      const priceEnd = slider.querySelector("[data-price-end]");

      priceStart.addEventListener("change", () =>
        setPriceValues(priceSlider, priceStart, priceEnd)
      );
      priceEnd.addEventListener("change", () =>
        setPriceValues(priceSlider, priceStart, priceEnd)
      );
      priceSlider.noUiSlider.on("update", function (values, handle) {
        priceStart.value = `${values[0]}`;
        priceEnd.value = `${values[1]}`;
      });
    }
  });

  function setPriceValues(priceSlider, priceStart, priceEnd) {
    let priceStartValue = priceStart.value !== "" ? priceStart.value : null;
    let priceEndValue = priceEnd.value !== "" ? priceEnd.value : null;
    priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);
  }
}
rangeInit();
