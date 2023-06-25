const accordions = document.querySelectorAll(".faq-item");
const scrollTopGlobalButton = document.querySelector(
  "#global-scroll-top-button"
);
const $body = document.body;
const burgerMenu = document.querySelector(".mobile-menu");
const burgers = document.querySelectorAll(".burger");
let scrollPosition = 0;

document.addEventListener("DOMContentLoaded", () => {
  accordions.forEach((accordion) => {
    setTimeout(() => {
      const expandedHeight = accordion.offsetHeight;
      const margin = parseFloat(
        window
          .getComputedStyle(accordion.querySelector(".faq-top"))
          .getPropertyValue("margin-bottom")
      );

      const closedHeight =
        accordion.querySelector(".faq-top").offsetHeight + margin + margin;

      accordion.setAttribute("data-expanded-height", expandedHeight);
      accordion.setAttribute("data-height", closedHeight);

      accordion.style.height = `${closedHeight}px`;

      accordion.addEventListener("click", (e) => {
        if (accordion.classList.contains("open")) {
          accordion.classList.remove("open");
          accordion.style.height = `${accordion.getAttribute("data-height")}px`;
        } else {
          accordion.classList.add("open");
          accordion.style.height = `${accordion.getAttribute(
            "data-expanded-height"
          )}px`;
        }
      });
    }, 1000);
  });
});

const scrollLock = {
  enable() {
    scrollPosition = window.pageYOffset;
    $body.style.overflow = "hidden";
    $body.style.position = "fixed";
    $body.style.top = `-${scrollPosition}px`;
    $body.style.width = "100%";
  },
  disable() {
    $body.style.removeProperty("overflow");
    $body.style.removeProperty("position");
    $body.style.removeProperty("top");
    $body.style.removeProperty("width");
    window.scrollTo(0, scrollPosition);
  },
};

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  slidesPerView: 1,
  centeredSlides: true,
  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".reviews .navigation .right",
    prevEl: ".reviews .navigation .left",
  },
});

const links = document.querySelectorAll(".nav a[data-inner-navigation]");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    burgerMenu.classList.remove("open");
    scrollLock.disable();

    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
    });
  });
});

const openModalButtons = document.querySelectorAll("[data-open-modal]");
const closeModalButtons = document.querySelectorAll("[data-close-modal]");
const modals = document.querySelectorAll("[data-modal-name]");

openModalButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const modal = document.querySelector(
      `[data-modal-name=${button.getAttribute("data-open-modal")}]`
    );

    modal.classList.add("visible");
    scrollLock.enable();
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const modal = document.querySelector(
      `[data-modal-name=${button.getAttribute("data-close-modal")}]`
      // `[data-modal-name=${button.getAttribute("#close-form")}]`
    );
    modal.classList.remove("visible");
    scrollLock.disable();
  });
});

burgers.forEach((burger) => {
  burger.addEventListener("click", (e) => {
    e.preventDefault();

    if (burger.classList.contains("is-active")) {
      burgerMenu.classList.remove("open");
      scrollLock.disable();
    } else {
      burgerMenu.classList.add("open");
      scrollLock.enable();
    }
  });
});

modals.forEach((modal) => {
  const toTopButton = modal.querySelector(".button-to-top");

  modal.addEventListener("scroll", () => {
    if (toTopButton) {
      if (modal.scrollTop > 100) {
        toTopButton.style.display = "block";
      } else {
        toTopButton.style.display = "none";
      }
    }
  });

  if (toTopButton) {
    toTopButton.addEventListener("click", () => {
      modal.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

window.addEventListener("scroll", () => {
  const TOP = 695;
  if (
    document.body.scrollTop > TOP ||
    document.documentElement.scrollTop > TOP
  ) {
    scrollTopGlobalButton.style.display = "block";
  } else {
    scrollTopGlobalButton.style.display = "none";
  }
});

scrollTopGlobalButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
