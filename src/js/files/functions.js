// Підключення списку активних модулів
import { flsModules } from "./modules.js";

/* Перевірка підтримки webp, додавання класу webp або no-webp для HTML */
export function isWebp() {
  // Проверка поддержки webp
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }
  // Додавання класу _webp або _no-webp для HTML
  testWebP(function (support) {
    let className = support === true ? "webp" : "no-webp";
    document.documentElement.classList.add(className);
  });
}
/* Перевірка мобільного браузера */
export let isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};
/* Додавання класу touch для HTML, якщо браузер мобільний */
export function addTouchClass() {
  // Додавання класу _touch для HTML, якщо браузер мобільний
  if (isMobile.any()) document.documentElement.classList.add("touch");
}
// Додавання loaded для HTML після повного завантаження сторінки
export function addLoadedClass() {
  if (!document.documentElement.classList.contains("loading")) {
    window.addEventListener("load", function () {
      setTimeout(function () {
        document.documentElement.classList.add("loaded");
      }, 0);
    });
  }
}
// Отримання хешу на адресі сайту
export function getHash() {
  if (location.hash) {
    return location.hash.replace("#", "");
  }
}
// Вказівка хеша на адресу сайту
export function setHash(hash) {
  hash = hash ? `#${hash}` : window.location.href.split("#")[0];
  history.pushState("", "", hash);
}
// Допоміжні модулі плавного розкриття та закриття об'єкта ======================================================================================================================================================================
export let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty("height") : null;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      !showmore ? target.style.removeProperty("overflow") : null;
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      // Створюємо подію
      document.dispatchEvent(
        new CustomEvent("slideUpDone", {
          detail: {
            target: target,
          },
        })
      );
    }, duration);
  }
};
export let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty("height") : null;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      // Створюємо подію
      document.dispatchEvent(
        new CustomEvent("slideDownDone", {
          detail: {
            target: target,
          },
        })
      );
    }, duration);
  }
};
export let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};
// Допоміжні модулі блокування прокручування та стрибка ====================================================================================================================================================================================================================================================================================
export let bodyLockStatus = true;
export let bodyLockToggle = (delay = 500) => {
  if (document.documentElement.classList.contains("lock")) {
    bodyUnlock(delay);
  } else {
    bodyLock(delay);
  }
};
export let bodyUnlock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    setTimeout(() => {
      lockPaddingElements.forEach((lockPaddingElement) => {
        lockPaddingElement.style.paddingRight = "";
      });
      document.body.style.paddingRight = "";
      document.documentElement.classList.remove("lock");
    }, delay);
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
};
export let bodyLock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    const lockPaddingValue =
      window.innerWidth - document.body.offsetWidth + "px";
    lockPaddingElements.forEach((lockPaddingElement) => {
      lockPaddingElement.style.paddingRight = lockPaddingValue;
    });

    document.body.style.paddingRight = lockPaddingValue;
    document.documentElement.classList.add("lock");

    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
};
// Модуль роботи зі спойлерами =======================================================================================================================================================================================================================
export function spoilers() {
  const spoilersArray = document.querySelectorAll("[data-spoilers]");
  if (spoilersArray.length > 0) {
    // Подія кліку
    document.addEventListener("click", setspoilerAction);
    // Отримання звичайних слойлерів
    const spoilersRegular = Array.from(spoilersArray).filter(
      function (item, index, self) {
        return !item.dataset.spoilers.split(",")[0];
      }
    );
    // Ініціалізація звичайних слойлерів
    if (spoilersRegular.length) {
      initspoilers(spoilersRegular);
    }
    // Отримання слойлерів з медіа-запитами
    let mdQueriesArray = dataMediaQueries(spoilersArray, "spoilers");
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach((mdQueriesItem) => {
        // Подія
        mdQueriesItem.matchMedia.addEventListener("change", function () {
          initspoilers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        initspoilers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
    // Ініціалізація
    function initspoilers(spoilersArray, matchMedia = false) {
      spoilersArray.forEach((spoilersBlock) => {
        spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
        if (matchMedia.matches || !matchMedia) {
          spoilersBlock.classList.add("_spoiler-init");
          initspoilerBody(spoilersBlock);
        } else {
          spoilersBlock.classList.remove("_spoiler-init");
          initspoilerBody(spoilersBlock, false);
        }
      });
    }
    // Робота з контентом
    function initspoilerBody(spoilersBlock, hidespoilerBody = true) {
      let spoilerItems = spoilersBlock.querySelectorAll("details");
      if (spoilerItems.length) {
        //spoilerItems = Array.from(spoilerItems).filter(item => item.closest('[data-spoilers]') === spoilersBlock);
        spoilerItems.forEach((spoilerItem) => {
          let spoilerTitle = spoilerItem.querySelector("summary");
          if (hidespoilerBody) {
            spoilerTitle.removeAttribute("tabindex");
            if (!spoilerItem.hasAttribute("data-open")) {
              spoilerItem.open = false;
              spoilerTitle.nextElementSibling.hidden = true;
            } else {
              spoilerTitle.classList.add("_spoiler-active");
              spoilerItem.open = true;
            }
          } else {
            spoilerTitle.setAttribute("tabindex", "-1");
            spoilerTitle.classList.remove("_spoiler-active");
            spoilerItem.open = true;
            spoilerTitle.nextElementSibling.hidden = false;
          }
        });
      }
    }
    function setspoilerAction(e) {
      const el = e.target;
      // Якщо натиснуто на елемент з атрибутом data-spoiler-close всередині спойлера
      if (el.closest("[data-spoiler-close-btn]")) {
        const spoilerBlock = el.closest("details");
        const spoilersBlock = el.closest("[data-spoilers]");
        if (
          spoilersBlock &&
          spoilersBlock.classList.contains("_spoiler-init")
        ) {
          const spoilerSpeed = spoilersBlock.dataset.spoilersSpeed
            ? parseInt(spoilersBlock.dataset.spoilersSpeed)
            : 500;

          // Закриваємо спойлер
          const spoilerTitle = spoilerBlock.querySelector("summary");
          spoilerTitle.classList.remove("_spoiler-active");
          _slideUp(spoilerTitle.nextElementSibling, spoilerSpeed);
          setTimeout(() => {
            spoilerBlock.open = false;
          }, spoilerSpeed);

          return; // Завершуємо виконання, щоб уникнути зайвих дій
        }
      }

      if (el.closest("summary") && el.closest("[data-spoilers]")) {
        e.preventDefault();
        if (el.closest("[data-spoilers]").classList.contains("_spoiler-init")) {
          const spoilerTitle = el.closest("summary");
          const spoilerBlock = spoilerTitle.closest("details");
          const spoilersBlock = spoilerTitle.closest("[data-spoilers]");
          const onespoiler = spoilersBlock.hasAttribute("data-one-spoiler");
          const scrollspoiler = spoilerBlock.hasAttribute(
            "data-spoiler-scroll"
          );
          const spoilerSpeed = spoilersBlock.dataset.spoilersSpeed
            ? parseInt(spoilersBlock.dataset.spoilersSpeed)
            : 500;
          if (!spoilersBlock.querySelectorAll("._slide").length) {
            if (onespoiler && !spoilerBlock.open) {
              hidespoilersBody(spoilersBlock);
            }

            !spoilerBlock.open
              ? (spoilerBlock.open = true)
              : setTimeout(() => {
                  spoilerBlock.open = false;
                }, spoilerSpeed);

            spoilerTitle.classList.toggle("_spoiler-active");
            _slideToggle(spoilerTitle.nextElementSibling, spoilerSpeed);

            if (
              scrollspoiler &&
              spoilerTitle.classList.contains("_spoiler-active")
            ) {
              const scrollspoilerValue = spoilerBlock.dataset.spoilerScroll;
              const scrollspoilerOffset = +scrollspoilerValue
                ? +scrollspoilerValue
                : 0;
              const scrollspoilerNoHeader = spoilerBlock.hasAttribute(
                "data-spoiler-scroll-noheader"
              )
                ? document.querySelector(".header").offsetHeight
                : 0;

              //setTimeout(() => {
              window.scrollTo({
                top:
                  spoilerBlock.offsetTop -
                  (scrollspoilerOffset + scrollspoilerNoHeader),
                behavior: "smooth",
              });
              //}, spoilerSpeed);
            }
          }
        }
      }
      // Закриття при кліку поза спойлером
      if (!el.closest("[data-spoilers]")) {
        const spoilersClose = document.querySelectorAll("[data-spoiler-close]");
        if (spoilersClose.length) {
          spoilersClose.forEach((spoilerClose) => {
            const spoilersBlock = spoilerClose.closest("[data-spoilers]");
            const spoilerCloseBlock = spoilerClose.parentNode;
            if (spoilersBlock.classList.contains("_spoiler-init")) {
              const spoilerSpeed = spoilersBlock.dataset.spoilersSpeed
                ? parseInt(spoilersBlock.dataset.spoilersSpeed)
                : 500;
              spoilerClose.classList.remove("_spoiler-active");
              _slideUp(spoilerClose.nextElementSibling, spoilerSpeed);
              setTimeout(() => {
                spoilerCloseBlock.open = false;
              }, spoilerSpeed);
            }
          });
        }
      }
    }
    function hidespoilersBody(spoilersBlock) {
      const spoilerActiveBlock = spoilersBlock.querySelector("details[open]");
      if (
        spoilerActiveBlock &&
        !spoilersBlock.querySelectorAll("._slide").length
      ) {
        const spoilerActiveTitle = spoilerActiveBlock.querySelector("summary");
        const spoilerSpeed = spoilersBlock.dataset.spoilersSpeed
          ? parseInt(spoilersBlock.dataset.spoilersSpeed)
          : 500;
        spoilerActiveTitle.classList.remove("_spoiler-active");
        _slideUp(spoilerActiveTitle.nextElementSibling, spoilerSpeed);
        setTimeout(() => {
          spoilerActiveBlock.open = false;
        }, spoilerSpeed);
      }
    }
  }
}
// Модуль роботи з табами =======================================================================================================================================================================================================================
export function tabs() {
  const tabs = document.querySelectorAll("[data-tabs]");
  let tabsActiveHash = [];

  if (tabs.length > 0) {
    const hash = getHash();
    if (hash && hash.startsWith("tab-")) {
      tabsActiveHash = hash.replace("tab-", "").split("-");
    }
    tabs.forEach((tabsBlock, index) => {
      tabsBlock.classList.add("_tab-init");
      tabsBlock.setAttribute("data-tabs-index", index);
      tabsBlock.addEventListener("click", setTabsAction);
      initTabs(tabsBlock);

      const splideElement = tabsBlock.querySelector("._splide-tabs");
      if (splideElement) {
        const splide = new Splide(splideElement, {
          speed: 300,
          pagination: false,
          updateOnMove: true,
          flickMaxPages: 1,
          flickPower: 100,
        }).mount();

        splideElement.splideInstance = splide;

        splide.on("mounted move", (newIndex) => {
          setActiveTab(tabsBlock, newIndex);
          updateSelect(tabsBlock, newIndex); // Оновлення кастомного селекту при зміні табу
        });

        const tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
        tabsTitles.forEach((title, tabIndex) => {
          title.addEventListener("click", () => {
            splide.go(tabIndex);
          });
        });
        const activeIndex = Array.from(tabsTitles).findIndex((title) =>
          title.classList.contains("_tab-active")
        );
        if (activeIndex >= 0) {
          splide.go(activeIndex);
        }
      }

      // Додаємо логіку для перемикання через кастомний select
      const tabsSelect = tabsBlock.querySelector(".select_tabs");

      if (tabsSelect) {
        document.addEventListener("selectCallback", (e) => {
          if (e.detail.select === tabsSelect.querySelector("select")) {
            const selectedOption = e.detail.select.selectedOptions[0];
            const value = selectedOption.value;

            if (!selectedOption.hasAttribute("data-href")) {
              const tabIndex = parseInt(value, 10) - 1;
              if (splideElement && splideElement.splideInstance) {
                splideElement.splideInstance.go(tabIndex);
              } else {
                setActiveTab(tabsBlock, tabIndex);
              }
            }
          }
        });

        // Синхронізація початково вибраного табу з селектом
        const activeTabIndex = Array.from(
          tabsBlock.querySelectorAll("[data-tabs-title]")
        ).findIndex((title) => title.classList.contains("_tab-active"));
        if (activeTabIndex >= 0) {
          tabsSelect.value = activeTabIndex + 1;
        }
      }
    });

    let mdQueriesArray = dataMediaQueries(tabs, "tabs");
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach((mdQueriesItem) => {
        mdQueriesItem.matchMedia.addEventListener("change", function () {
          setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
  }

  function setTitlePosition(tabsMediaArray, matchMedia) {
    tabsMediaArray.forEach((tabsMediaItem) => {
      tabsMediaItem = tabsMediaItem.item;
      let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
      let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-tabs-title]");
      let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
      let tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
      tabsTitleItems = Array.from(tabsTitleItems).filter(
        (item) => item.closest("[data-tabs]") === tabsMediaItem
      );
      tabsContentItems = Array.from(tabsContentItems).filter(
        (item) => item.closest("[data-tabs]") === tabsMediaItem
      );
      tabsContentItems.forEach((tabsContentItem, index) => {
        if (matchMedia.matches) {
          tabsContent.append(tabsTitleItems[index]);
          tabsContent.append(tabsContentItem);
          tabsMediaItem.classList.add("_tab-spoiler");
        } else {
          tabsTitles.append(tabsTitleItems[index]);
          tabsMediaItem.classList.remove("_tab-spoiler");
        }
      });
    });
  }

  function initTabs(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles] button");
    let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

    if (tabsActiveHashBlock) {
      const tabsActiveTitle = tabsBlock.querySelector(
        "[data-tabs-titles]>._tab-active"
      );
      tabsActiveTitle ? tabsActiveTitle.classList.remove("_tab-active") : null;
    }
    if (tabsContent.length) {
      tabsContent.forEach((tabsContentItem, index) => {
        tabsTitles[index].setAttribute("data-tabs-title", "");
        tabsContentItem.setAttribute("data-tabs-item", "");

        if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
          tabsTitles[index].classList.add("_tab-active");
        }
        tabsContentItem.hidden =
          !tabsTitles[index].classList.contains("_tab-active");
        tabsContentItem.inert =
          !tabsTitles[index].classList.contains("_tab-active");
      });
    }
    const splideElement = tabsBlock.querySelector("._splide-tabs");
    if (splideElement && splideElement.splideInstance) {
      const activeIndex = Array.from(tabsTitles).findIndex((title) =>
        title.classList.contains("_tab-active")
      );
      if (activeIndex >= 0) {
        splideElement.splideInstance.go(activeIndex);
      }
    }
  }

  function setTabsStatus(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
    let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    function isTabsAnimate(tabsBlock) {
      if (tabsBlock.hasAttribute("data-tabs-animate")) {
        return tabsBlock.dataset.tabsAnimate > 0
          ? Number(tabsBlock.dataset.tabsAnimate)
          : 500;
      }
    }
    const tabsBlockAnimate = isTabsAnimate(tabsBlock);
    if (tabsContent.length > 0) {
      const isHash = tabsBlock.hasAttribute("data-tabs-hash");
      tabsContent = Array.from(tabsContent).filter(
        (item) => item.closest("[data-tabs]") === tabsBlock
      );
      tabsTitles = Array.from(tabsTitles).filter(
        (item) => item.closest("[data-tabs]") === tabsBlock
      );
      tabsContent.forEach((tabsContentItem, index) => {
        if (tabsTitles[index].classList.contains("_tab-active")) {
          if (tabsBlockAnimate) {
            _slideDown(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = false;
            tabsContentItem.inert = false;
          }
          if (isHash && !tabsContentItem.closest(".popup")) {
            setHash(`tab-${tabsBlockIndex}-${index}`);
          }
        } else {
          if (tabsBlockAnimate) {
            _slideUp(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = true;
            tabsContentItem.inert = true;
          }
        }
      });
    }
  }

  function setTabsAction(e) {
    const el = e.target;
    if (el.closest("[data-tabs-title]")) {
      const tabTitle = el.closest("[data-tabs-title]");
      const tabsBlock = tabTitle.closest("[data-tabs]");
      const splideElement = tabsBlock.querySelector("._splide-tabs");

      if (splideElement && splideElement.splideInstance) {
        const splide = splideElement.splideInstance;
        const tabIndex = Array.from(tabTitle.parentElement.children).indexOf(
          tabTitle
        );
        splide.go(tabIndex);
      } else {
        if (
          !tabTitle.classList.contains("_tab-active") &&
          !tabsBlock.querySelector("._slide")
        ) {
          let tabActiveTitle = tabsBlock.querySelectorAll(
            "[data-tabs-title]._tab-active"
          );
          tabActiveTitle.length
            ? (tabActiveTitle = Array.from(tabActiveTitle).filter(
                (item) => item.closest("[data-tabs]") === tabsBlock
              ))
            : null;
          tabActiveTitle.length
            ? tabActiveTitle[0].classList.remove("_tab-active")
            : null;
          tabTitle.classList.add("_tab-active");
          setTabsStatus(tabsBlock);

          // Додаємо виклик updateSelect для синхронізації з селектом
          const activeTabIndex = Array.from(
            tabsBlock.querySelectorAll("[data-tabs-title]")
          ).indexOf(tabTitle);
          updateSelect(tabsBlock, activeTabIndex);
        }
      }
      const tabSwitchEvent = new CustomEvent("tabSwitch");
      tabsBlock.dispatchEvent(tabSwitchEvent);
      e.preventDefault();
    }
  }

  function setActiveTab(tabsBlock, index) {
    const tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
    const tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
    tabsTitles.forEach((title, i) => {
      title.classList.toggle("_tab-active", i === index);
      tabsContent[i].hidden = i !== index;
      tabsContent[i].inert = i !== index;
    });
    updateSelect(tabsBlock, index);
  }

  function updateSelect(tabsBlock, index) {
    const tabsSelect = tabsBlock.querySelector(".tabs-select");
    if (tabsSelect) {
      tabsSelect.value = index + 1;
      flsModules.select.selectBuild(tabsSelect);
    }
  }
}

export function showMore() {
  window.addEventListener("load", function (e) {
    const showMoreBlocks = document.querySelectorAll("[data-showmore]");
    let showMoreBlocksRegular;
    let mdQueriesArray;
    if (showMoreBlocks.length) {
      // Отримання звичайних об'єктів
      showMoreBlocksRegular = Array.from(showMoreBlocks).filter(
        function (item, index, self) {
          return !item.dataset.showmoreMedia;
        }
      );
      // Ініціалізація звичайних об'єктів
      showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;

      document.addEventListener("click", showMoreActions);
      window.addEventListener("resize", showMoreActions);

      // Отримання об'єктів з медіа-запитами
      mdQueriesArray = dataMediaQueries(showMoreBlocks, "showmoreMedia");
      if (mdQueriesArray && mdQueriesArray.length) {
        mdQueriesArray.forEach((mdQueriesItem) => {
          // Подія
          mdQueriesItem.matchMedia.addEventListener("change", function () {
            initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
          });
        });
        initItemsMedia(mdQueriesArray);
      }
    }
    function initItemsMedia(mdQueriesArray) {
      mdQueriesArray.forEach((mdQueriesItem) => {
        initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
    function initItems(showMoreBlocks, matchMedia) {
      showMoreBlocks.forEach((showMoreBlock) => {
        initItem(showMoreBlock, matchMedia);
      });
    }
    function initItem(showMoreBlock, matchMedia = false) {
      showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
      const tabsParent = showMoreBlock.closest("[data-tabs]");
      if (tabsParent && !tabsParent.hasListener) {
        tabsParent.addEventListener("tabSwitch", function () {
          var showMoreContent = showMoreBlock.querySelector(
            "[data-showmore-content]"
          );
          if (showMoreContent && showMoreContent.hidden) {
            showMoreContent.hidden = false;
          }
          showMoreActions({ type: "resize" });
        });
        tabsParent.hasListener = true;
      }
      let showMoreContent = showMoreBlock.querySelectorAll(
        "[data-showmore-content]"
      );
      let showMoreButton = showMoreBlock.querySelectorAll(
        "[data-showmore-button]"
      );
      showMoreContent = Array.from(showMoreContent).filter(
        (item) => item.closest("[data-showmore]") === showMoreBlock
      )[0];
      showMoreButton = Array.from(showMoreButton).filter(
        (item) => item.closest("[data-showmore]") === showMoreBlock
      )[0];
      const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
      if (matchMedia.matches || !matchMedia) {
        if (hiddenHeight < getOriginalHeight(showMoreContent)) {
          _slideUp(
            showMoreContent,
            0,
            showMoreBlock.classList.contains("_showmore-active")
              ? getOriginalHeight(showMoreContent)
              : hiddenHeight
          );
          showMoreButton.hidden = false;
        } else {
          _slideDown(showMoreContent, 0, hiddenHeight);
          showMoreButton.hidden = true;
        }
      } else {
        _slideDown(showMoreContent, 0, hiddenHeight);
        showMoreButton.hidden = true;
      }
    }
    function getHeight(showMoreBlock, showMoreContent) {
      let hiddenHeight = 0;
      const showMoreType = showMoreBlock.dataset.showmore
        ? showMoreBlock.dataset.showmore
        : "size";
      const rowGap = parseFloat(getComputedStyle(showMoreContent).rowGap)
        ? parseFloat(getComputedStyle(showMoreContent).rowGap)
        : 0;
      if (showMoreType === "items") {
        const showMoreTypeValue = showMoreContent.dataset.showmoreContent
          ? showMoreContent.dataset.showmoreContent
          : 3;
        const showMoreItems = showMoreContent.children;
        for (let index = 1; index < showMoreItems.length; index++) {
          const showMoreItem = showMoreItems[index - 1];
          const marginTop = parseFloat(getComputedStyle(showMoreItem).marginTop)
            ? parseFloat(getComputedStyle(showMoreItem).marginTop)
            : 0;
          const marginBottom = parseFloat(
            getComputedStyle(showMoreItem).marginBottom
          )
            ? parseFloat(getComputedStyle(showMoreItem).marginBottom)
            : 0;
          hiddenHeight += showMoreItem.offsetHeight + marginTop;
          if (index == showMoreTypeValue) break;
          hiddenHeight += marginBottom;
        }
        rowGap ? (hiddenHeight += (showMoreTypeValue - 1) * rowGap) : null;
      } else {
        const showMoreTypeValue = showMoreContent.dataset.showmoreContent
          ? showMoreContent.dataset.showmoreContent
          : 150;
        hiddenHeight = showMoreTypeValue;
      }
      return hiddenHeight;
    }

    function getOriginalHeight(showMoreContent) {
      let parentHidden;
      let hiddenHeight = showMoreContent.offsetHeight;
      showMoreContent.style.removeProperty("height");
      if (showMoreContent.closest(`[hidden]`)) {
        parentHidden = showMoreContent.closest(`[hidden]`);
        parentHidden.hidden = false;
      }
      let originalHeight = showMoreContent.offsetHeight;
      parentHidden ? (parentHidden.hidden = true) : null;
      showMoreContent.style.height = `${hiddenHeight}px`;
      return originalHeight;
    }
    function showMoreActions(e) {
      const targetEvent = e.target;
      const targetType = e.type;
      if (targetType === "click") {
        if (targetEvent.closest("[data-showmore-button]")) {
          const showMoreButton = targetEvent.closest("[data-showmore-button]");
          const showMoreBlock = showMoreButton.closest("[data-showmore]");
          const showMoreContent = showMoreBlock.querySelector(
            "[data-showmore-content]"
          );
          const showMoreSpeed = showMoreBlock.dataset.showmoreButton
            ? showMoreBlock.dataset.showmoreButton
            : "500";
          const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
          if (!showMoreContent.classList.contains("_slide")) {
            showMoreBlock.classList.contains("_showmore-active")
              ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight)
              : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
            showMoreBlock.classList.toggle("_showmore-active");
          }
        }
      } else if (targetType === "resize") {
        showMoreBlocksRegular && showMoreBlocksRegular.length
          ? initItems(showMoreBlocksRegular)
          : null;
        mdQueriesArray && mdQueriesArray.length
          ? initItemsMedia(mdQueriesArray)
          : null;
      }
    }
  });
}
function getHeight(showMoreBlock, showMoreContent) {
  let hiddenHeight = 0;
  const showMoreType = showMoreBlock.dataset.showmore
    ? showMoreBlock.dataset.showmore
    : "size";
  const rowGap = parseFloat(getComputedStyle(showMoreContent).rowGap)
    ? parseFloat(getComputedStyle(showMoreContent).rowGap)
    : 0;
  if (showMoreType === "items") {
    const showMoreTypeValue = showMoreContent.dataset.showmoreContent
      ? showMoreContent.dataset.showmoreContent
      : 3;
    const showMoreItems = showMoreContent.children;
    for (let index = 1; index < showMoreItems.length; index++) {
      const showMoreItem = showMoreItems[index - 1];
      const marginTop = parseFloat(getComputedStyle(showMoreItem).marginTop)
        ? parseFloat(getComputedStyle(showMoreItem).marginTop)
        : 0;
      const marginBottom = parseFloat(
        getComputedStyle(showMoreItem).marginBottom
      )
        ? parseFloat(getComputedStyle(showMoreItem).marginBottom)
        : 0;
      hiddenHeight += showMoreItem.offsetHeight + marginTop;
      if (index == showMoreTypeValue) break;
      hiddenHeight += marginBottom;
    }
    rowGap ? (hiddenHeight += (showMoreTypeValue - 1) * rowGap) : null;
  } else {
    const showMoreTypeValue = showMoreContent.dataset.showmoreContent
      ? showMoreContent.dataset.showmoreContent
      : 150;
    hiddenHeight = showMoreTypeValue;
  }
  return hiddenHeight;
}

function getOriginalHeight(showMoreContent) {
  let parentHidden;
  let hiddenHeight = showMoreContent.offsetHeight;
  showMoreContent.style.removeProperty("height");
  if (showMoreContent.closest(`[hidden]`)) {
    parentHidden = showMoreContent.closest(`[hidden]`);
    parentHidden.hidden = false;
  }
  let originalHeight = showMoreContent.offsetHeight;
  parentHidden ? (parentHidden.hidden = true) : null;
  showMoreContent.style.height = `${hiddenHeight}px`;
  return originalHeight;
}
function showMoreActions(e) {
  const targetEvent = e.target;
  const targetType = e.type;
  if (targetType === "click") {
    if (targetEvent.closest("[data-showmore-button]")) {
      const showMoreButton = targetEvent.closest("[data-showmore-button]");
      const showMoreBlock = showMoreButton.closest("[data-showmore]");
      const showMoreContent = showMoreBlock.querySelector(
        "[data-showmore-content]"
      );
      const showMoreSpeed = showMoreBlock.dataset.showmoreButton
        ? showMoreBlock.dataset.showmoreButton
        : "500";
      const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
      if (!showMoreContent.classList.contains("_slide")) {
        showMoreBlock.classList.contains("_showmore-active")
          ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight)
          : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
        showMoreBlock.classList.toggle("_showmore-active");
      }
    }
  } else if (targetType === "resize") {
    showMoreBlocksRegular && showMoreBlocksRegular.length
      ? initItems(showMoreBlocksRegular)
      : null;
    mdQueriesArray && mdQueriesArray.length
      ? initItemsMedia(mdQueriesArray)
      : null;
  }
}
// Модуль роботи з меню (бургер) =======================================================================================================================================================================================================================
export function menuInit() {
  if (document.querySelector("[data-menu]")) {
    document.addEventListener("click", function (e) {
      if (bodyLockStatus && e.target.closest("[data-menu]")) {
        bodyLockToggle();
        document.documentElement.classList.toggle("menu-open");
      }
    });
  }
}
export function menuOpen() {
  bodyLock();
  document.documentElement.classList.add("menu-open");
}
export function menuClose() {
  bodyUnlock();
  document.documentElement.classList.remove("menu-open");
}
// Модуль "показати ще" =======================================================================================================================================================================================================================

// Модуль "Ripple effect" =======================================================================================================================================================================================================================
export function rippleEffect() {
  // Подія кліку на кнопці
  document.addEventListener("click", function (e) {
    const targetItem = e.target;
    if (targetItem.closest("[data-ripple]")) {
      // Константи
      const button = targetItem.closest("[data-ripple]");
      const ripple = document.createElement("span");
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      // Формування елементу
      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.style.left = `${
        e.pageX - (button.getBoundingClientRect().left + scrollX) - radius
      }px`;
      ripple.style.top = `${
        e.pageY - (button.getBoundingClientRect().top + scrollY) - radius
      }px`;
      ripple.classList.add("ripple");

      // Видалення існуючого елементу (опціонально)
      button.dataset.ripple === "once" && button.querySelector(".ripple")
        ? button.querySelector(".ripple").remove()
        : null;

      // Додавання елементу
      button.appendChild(ripple);

      // Отримання часу дії анімації
      const timeOut = getAnimationDuration(ripple);

      // Видалення елементу
      setTimeout(() => {
        ripple ? ripple.remove() : null;
      }, timeOut);

      // Функтія отримання часу дії анімації
      function getAnimationDuration() {
        const aDuration = window.getComputedStyle(ripple).animationDuration;
        return aDuration.includes("ms")
          ? aDuration.replace("ms", "")
          : aDuration.replace("s", "") * 1000;
      }
    }
  });
}
// Модуль "Сustom сursor" =======================================================================================================================================================================================================================
export function customCursor(isShadowTrue) {
  const wrapper = document.querySelector("[data-custom-cursor]")
    ? document.querySelector("[data-custom-cursor]")
    : document.documentElement;
  if (wrapper && !isMobile.any()) {
    // Створюємо та додаємо об'єкт курсору
    const cursor = document.createElement("div");
    cursor.classList.add("fls-cursor");
    cursor.style.opacity = 0;
    cursor.insertAdjacentHTML(
      "beforeend",
      `<span class="fls-cursor__pointer"></span>`
    );
    isShadowTrue
      ? cursor.insertAdjacentHTML(
          "beforeend",
          `<span class="fls-cursor__shadow"></span>`
        )
      : null;
    wrapper.append(cursor);

    const cursorPointer = document.querySelector(".fls-cursor__pointer");
    const cursorPointerStyle = {
      width: cursorPointer.offsetWidth,
      height: cursorPointer.offsetHeight,
    };
    let cursorShadow, cursorShadowStyle;
    if (isShadowTrue) {
      cursorShadow = document.querySelector(".fls-cursor__shadow");
      cursorShadowStyle = {
        width: cursorShadow.offsetWidth,
        height: cursorShadow.offsetHeight,
      };
    }
    function mouseActions(e) {
      if (e.type === "mouseout") {
        cursor.style.opacity = 0;
      } else if (e.type === "mousemove") {
        cursor.style.removeProperty("opacity");
        if (
          e.target.closest("button") ||
          e.target.closest("a") ||
          e.target.closest("input") ||
          (window.getComputedStyle(e.target).cursor !== "none" &&
            window.getComputedStyle(e.target).cursor !== "default")
        ) {
          cursor.classList.add("_hover");
        } else {
          cursor.classList.remove("_hover");
        }
      } else if (e.type === "mousedown") {
        cursor.classList.add("_active");
      } else if (e.type === "mouseup") {
        cursor.classList.remove("_active");
      }
      cursorPointer
        ? (cursorPointer.style.transform = `translate3d(${
            e.clientX - cursorPointerStyle.width / 2
          }px, ${e.clientY - cursorPointerStyle.height / 2}px, 0)`)
        : null;
      cursorShadow
        ? (cursorShadow.style.transform = `translate3d(${
            e.clientX - cursorShadowStyle.width / 2
          }px, ${e.clientY - cursorShadowStyle.height / 2}px, 0)`)
        : null;
    }

    window.addEventListener("mouseup", mouseActions);
    window.addEventListener("mousedown", mouseActions);
    window.addEventListener("mousemove", mouseActions);
    window.addEventListener("mouseout", mouseActions);
  }
}
//================================================================================================================================================================================================================================================================================================================
// Інші корисні функції ================================================================================================================================================================================================================================================================================================================
//================================================================================================================================================================================================================================================================================================================
// FLS (Full Logging System)
export function FLS(message) {
  setTimeout(() => {
    if (window.FLS) {
      console.log(message);
    }
  }, 0);
}
// Отримати цифри з рядка
export function getDigFromString(item) {
  return parseInt(item.replace(/[^\d]/g, ""));
}
// Форматування цифр типу 100 000 000
export function getDigFormat(item, sepp = " ") {
  return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, `$1${sepp}`);
}
// Прибрати клас з усіх елементів масиву
export function removeClasses(array, className) {
  for (var i = 0; i < array.length; i++) {
    array[i].classList.remove(className);
  }
}
// Унікалізація масиву
export function uniqArray(array) {
  return array.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}
// Функція отримання індексу всередині батьківського елемента
export function indexInParent(parent, element) {
  const array = Array.prototype.slice.call(parent.children);
  return Array.prototype.indexOf.call(array, element);
}
// Функція перевіряє чи об'єкт видимий
export function isHidden(el) {
  return el.offsetParent === null;
}
// Обробка медіа запитів з атрибутів
export function dataMediaQueries(array, dataSetValue) {
  // Отримання об'єктів з медіа-запитами
  const media = Array.from(array).filter(function (item, index, self) {
    if (item.dataset[dataSetValue]) {
      return item.dataset[dataSetValue].split(",")[0];
    }
  });
  // Ініціалізація об'єктів з медіа-запитами
  if (media.length) {
    const breakpointsArray = [];
    media.forEach((item) => {
      const params = item.dataset[dataSetValue];
      const breakpoint = {};
      const paramsArray = params.split(",");
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });
    // Отримуємо унікальні брейкпоінти
    let mdQueries = breakpointsArray.map(function (item) {
      return (
        "(" +
        item.type +
        "-width: " +
        item.value +
        "px)," +
        item.value +
        "," +
        item.type
      );
    });
    mdQueries = uniqArray(mdQueries);
    const mdQueriesArray = [];

    if (mdQueries.length) {
      // Працюємо з кожним брейкпоінтом
      mdQueries.forEach((breakpoint) => {
        const paramsArray = breakpoint.split(",");
        const mediaBreakpoint = paramsArray[1];
        const mediaType = paramsArray[2];
        const matchMedia = window.matchMedia(paramsArray[0]);
        // Об'єкти з потрібними умовами
        const itemsArray = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true;
          }
        });
        mdQueriesArray.push({
          itemsArray,
          matchMedia,
        });
      });
      return mdQueriesArray;
    }
  }
}
//================================================================================================================================================================================================================================================================================================================
