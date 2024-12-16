document.addEventListener("DOMContentLoaded", function () {
  const heroSectionSliders = document.querySelectorAll(".hero__slider");

  if (heroSectionSliders) {
    heroSectionSliders.forEach((slider) => {
      new Splide(slider, {
        perPage: 2,
        perMove: 1,
        gap: "1.5rem",
        arrows: false,
        pagination: true,
        focus: 0,
        speed: 800,
        autoplay: true,
        interval: 5000,
        rewind: true,
        padding: { right: "3rem" },
        breakpoints: {
          991.98: {
            perPage: 1,
            padding: { right: "3.375rem" },
          },
          767.98: {
            perPage: 1,
            gap: "0.875rem",
          },
        },
      }).mount();
    });
  }

  const casesSliders = document.querySelectorAll(".cases-section__slider");

    if (casesSliders) casesSliders.forEach((slider => {
        new Splide(slider, {
            perPage: 2,
            perMove: 1,
            arrows: true,
            autoplay: true,
            interval: 5e3,
            pauseOnHover: true,
            pagination: false,
            gap: "2.125rem",
            breakpoints: {
                1299.98: {
                    perPage: 2
                }
            }
        }).mount();
    }));

  const casesSlidersLong = document.querySelectorAll(".cases-section-long__slider");

  if (casesSlidersLong) casesSlidersLong.forEach((slider => {
      new Splide(slider, {
          perPage: 2,
          perMove: 1,
          arrows: false,
          autoplay: true,
          interval: 5e3,
          pauseOnHover: true,
          pagination: true,
          gap: "2.125rem",
          breakpoints: {
              1299.98: {
                  perPage: 2
              },
              991.98: {
                  perPage: 2,
                  gap: "0.875rem"
              },
              767.98: {
                  perPage: 2,
              },
              449.98: {
                  perPage: 2,
              }
          }
      }).mount();
  }));
  const brandSliders = document.querySelectorAll(".brands-section__slider");

  if (brandSliders) {
    brandSliders.forEach((slider) => {
      new Splide(slider, {
        type: "loop",
        perPage: 7,
        perMove: 1,
        arrows: true,
        autoplay: true,
        interval: 5000,
        pauseOnHover: true,
        pagination: false,
        gap: "2.125rem",
        breakpoints: {
          1299.98: {
            perPage: 6,
          },
          991.98: {
            perPage: 5,
          },
          767.98: {
            perPage: 4,
            gap: "1.5rem",
          },
          449.98: {
            perPage: 3,
            gap: "0.5rem",
            padding: { right: "2.375rem" },
          },
        },
      }).mount();
    });
  }

  const productsSectionSliders = document.querySelectorAll(
    ".products-section__slider"
  );

  if (productsSectionSliders) {
    productsSectionSliders.forEach((slider) => {
      new Splide(slider, {
        perPage: 4,
        perMove: 1,
        gap: "1.25rem",
        arrows: false,
        pagination: false,
        padding: { right: "3.75rem" },
        breakpoints: {
          1399.98: {
            perPage: 3,
          },
          1069.98: {
            perPage: 2,
            gap: "1rem",
          },
          739.98: {
            gap: "0.625rem",
            padding: { right: "3.3125rem" },
          },
          549.98: {
            perPage: 1,
            gap: "0.625rem",
            padding: { right: "2.875rem" },
          },
        },
      }).mount();
    });
  }

  const productsNewsSliders = document.querySelectorAll(
    ".news-article__products-slider"
  );

  if (productsNewsSliders) {
    productsNewsSliders.forEach((slider) => {
      new Splide(slider, {
        perPage: 4,
        perMove: 1,
        gap: "1.5rem",
        arrows: false,
        pagination: false,
        breakpoints: {
          1399.98: {
            perPage: 3,
          },
          739.98: {
            gap: "0.5rem",
          },
          649.98: {
            perPage: 2,
            padding: { right: "1.8125rem" },
          },
        },
      }).mount();
    });
  }

  const itemProductSliders = document.querySelectorAll(".item-product__slider");
  if (itemProductSliders) {
    itemProductSliders.forEach((slider) => {
      new Splide(slider, {
        perPage: 1,
        arrows: true,
        pagination: true,
        drag: false,
      }).mount();
    });
  }

  const checkoutSliders = document.querySelectorAll(".block-aside-ch__slider");
  if (checkoutSliders) {
    checkoutSliders.forEach((slider) => {
      new Splide(slider, {
        perPage: 2,
        arrows: false,
        pagination: false,
        gap: "1.5rem",
        padding: { right: "4rem" },
        breakpoints: {
          767.98: {
            gap: "0.5rem",
            padding: { right: "1.25rem" },
          },
          389.98: {
            perPage: 1,
          },
        },
      }).mount();
    });
  }

  const newsSectionSliders = document.querySelectorAll(".news-section__slider");

  if (newsSectionSliders) {
    newsSectionSliders.forEach((slider) => {
      new Splide(slider, {
        perPage: 2,
        perMove: 1,
        gap: "1.5rem",
        arrows: false,
        destroy: true,
        pagination: false,
        padding: { right: "3.75rem" },
        breakpoints: {
          991.98: {
            destroy: false,
          },
          739.98: {
            perPage: 1,
            gap: "0.875rem",
            padding: { right: "6.875rem" },
          },
          389.98: {
            perPage: 1,
            padding: { right: "2.5rem" },
          },
        },
      }).mount();
    });
  }

  const productSliders = document.querySelectorAll(".main-product__sliders");
  if (productSliders.length) {
    productSliders.forEach((sliderWrapper) => {
      const mainSlider = sliderWrapper.querySelector(
        ".main-product__main-slider"
      );
      const thumbnailSlider = sliderWrapper.querySelector(
        ".main-product__thumbnail-slider"
      );
      if (mainSlider && thumbnailSlider) {
        const mainSplide = new Splide(mainSlider, {
          type: "fade",
          perPage: 1,
          pagination: true,
          arrows: true,
        }).mount();
        const thumbSplide = new Splide(thumbnailSlider, {
          isNavigation: true,
          perPage: 4,
          gap: 10,
          pagination: false,
          arrows: false,
          breakpoints: {
            991.98: {
              perPage: 3,
            },
          },
        }).mount();
        mainSplide.sync(thumbSplide);
      }
    });
  }
});
