// Підключення функціоналу "Чертоги Фрілансера"
import {
  isMobile,
  bodyLock,
  bodyLockToggle,
  bodyUnlock,
  _slideToggle,
} from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

function updateHeaderHeights() {
  const headerEl = document.querySelector("header.header");
  if (headerEl) {
    const headerHeight = headerEl.offsetHeight;
    document.documentElement.style.setProperty(
      "--header-height",
      `${headerHeight}px`
    );
  }
}

window.addEventListener("load", function () {
  updateHeaderHeights();
});
window.addEventListener("resize", updateHeaderHeights);

document.addEventListener("click", function (e) {
  if (
    !e.target.closest(".catalog-header") &&
    !e.target.closest("[data-catalog-header]") &&
    document.documentElement.classList.contains("catalog-header-open")
  ) {
    document.documentElement.classList.remove("catalog-header-open");
  } else if (e.target.closest("[data-catalog-header]")) {
    document.documentElement.classList.toggle("catalog-header-open");
  }
  if (
    !e.target.closest(".filter-catalog") &&
    !e.target.closest("[data-filter-button]") &&
    document.documentElement.classList.contains("filter-open")
  ) {
    document.documentElement.classList.remove("filter-open");
    bodyUnlock();
  } else if (e.target.closest("[data-filter-button]")) {
    document.documentElement.classList.add("filter-open");
    bodyLock();
  } else if (e.target.closest("[data-filter-close]")) {
    document.documentElement.classList.remove("filter-open");
    bodyUnlock();
  }

  const categoryHeader = document.querySelectorAll(".categories-header__item");
  categoryHeader.forEach(function (categoryHeader) {
    e.target.closest(".categories-header__item") === categoryHeader
      ? categoryHeader.classList.add("_active")
      : categoryHeader.classList.remove("_active");
  });

  if (e.target.closest(".video-block__button")) {
    const videoButton = e.target.closest(".video-block__button");
    const videoBody = videoButton.closest(".video-block__body");
    const videoPlaceholder = videoBody.querySelector(
      ".video-block__placeholder"
    );
    if (videoBody && videoPlaceholder) {
      const codeVideo = videoBody.dataset.video;
      const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
      const iframe = document.createElement("iframe");
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("allow", `autoplay; encrypted-media`);
      iframe.setAttribute("src", urlVideo);
      videoPlaceholder.hidden = true;
      videoBody.appendChild(iframe);
    }
  }
  if (e.target.closest(".header-offer") && !e.target.closest("a")) {
    const offerHeader = e.target.closest(".header-offer");
    const offerBlock = offerHeader.closest(".offer-account__block");
    if (offerBlock) {
      const offerBody = offerBlock.querySelector(".offer-account__body");
      const offerImages = offerHeader.querySelector(
        ".header-offer__images._dynamic_adapt_"
      );
      if (!offerBody.classList.contains("_slide")) {
        _slideToggle(offerBody);
        offerHeader.classList.toggle("_active");
      }
      if (offerImages && !offerImages.classList.contains("_slide")) {
        _slideToggle(offerImages);
      }
    }
  }
  if (e.target.closest("[data-pswd-hide]")) {
    const hideBtn = e.target.closest("[data-pswd-hide]");
    const inputEl = hideBtn
      .closest(".field__input-wrapper")
      .querySelector("input");
    if (inputEl) {
      if (inputEl.type === "password") {
        inputEl.type = "text";
        hideBtn.classList.add("_show");
      } else {
        inputEl.type = "password";
        hideBtn.classList.remove("_show");
      }
    }
  }
});

const numberInputs = document.querySelectorAll(".counter");
if (numberInputs) {
  numberInputs.forEach((wrapperInput) => {
    const input = wrapperInput.querySelector("input");
    const btnPlus = wrapperInput.querySelector(".counter__btn--increment");
    const btnMinus = wrapperInput.querySelector(".counter__btn--decrement");
    const min = parseInt(wrapperInput.getAttribute("data-min"));
    const max = parseInt(wrapperInput.getAttribute("data-max"));

    const validateInput = () => {
      let value = parseInt(input.value);
      if (isNaN(value)) {
        value = min;
      }
      if (value < min) {
        value = min;
      } else if (value > max) {
        value = max;
      }
      input.value = value;
    };

    btnPlus.addEventListener("click", function () {
      let newValue = parseInt(input.value) + 1;
      if (newValue <= max) input.value = newValue;
      input.dispatchEvent(new Event("input"));
    });
    btnMinus.addEventListener("click", function () {
      let newValue = parseInt(input.value) - 1;
      if (newValue >= min) input.value = newValue;
      input.dispatchEvent(new Event("input"));
    });

    input.addEventListener("input", validateInput);
    input.addEventListener("blur", validateInput);
  });
}

const scrollContainer = document.querySelector(".body-comparison");
if (scrollContainer) {
  const btnPrev = document.querySelector(".body-comparison__button--prev");
  const btnNext = document.querySelector(".body-comparison__button--next");
  const scrollStep =
    scrollContainer.querySelector(".body-comparison__item").offsetWidth +
    parseFloat(
      getComputedStyle(scrollContainer.querySelector(".body-comparison__item"))
        .marginRight
    );
  scrollContainer.style = `--scrollWidth: ${scrollContainer.offsetWidth}px`;
  function checkButtons() {
    if (scrollContainer.scrollLeft > scrollStep / 3) {
      btnPrev.disabled = false;
    } else {
      btnPrev.disabled = true;
    }

    if (
      scrollContainer.scrollLeft <
      scrollContainer.scrollWidth - scrollContainer.clientWidth - scrollStep / 3
    ) {
      btnNext.disabled = false;
    } else {
      btnNext.disabled = true;
    }
  }

  checkButtons();

  btnPrev.addEventListener("click", () => {
    scrollContainer.scrollBy({
      left: -scrollStep,
      behavior: "smooth",
    });
  });

  btnNext.addEventListener("click", () => {
    scrollContainer.scrollBy({
      left: scrollStep,
      behavior: "smooth",
    });
  });

  scrollContainer.addEventListener("scroll", () => {
    checkButtons();
  });
}
