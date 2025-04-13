document.addEventListener("DOMContentLoaded", () => {
  const burgerBtn = document.getElementById("burger-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener("click", () => {
      toggleMobileMenu();
    });

    const menuLinks = mobileMenu.querySelectorAll(".nav__list-link");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (mobileMenu.classList.contains("open")) {
          closeMobileMenu();
        }
      });
    });

    document.addEventListener("click", (event) => {
      const isClickInsideMenu = mobileMenu.contains(event.target);
      const isClickOnBurger = burgerBtn.contains(event.target);
      if (
        !isClickInsideMenu &&
        !isClickOnBurger &&
        mobileMenu.classList.contains("open")
      ) {
        closeMobileMenu();
      }
    });
  }

  function toggleMobileMenu() {
    if (!burgerBtn || !mobileMenu) return;
    const isOpen = mobileMenu.classList.contains("open");
    burgerBtn.classList.toggle("active");
    mobileMenu.classList.toggle("open");
    burgerBtn.setAttribute("aria-expanded", !isOpen);
    mobileMenu.setAttribute("aria-hidden", isOpen);
    document.body.style.overflow = !isOpen ? "hidden" : "";
  }

  function closeMobileMenu() {
    if (!burgerBtn || !mobileMenu) return;

    if (mobileMenu.classList.contains("open")) {
      burgerBtn.classList.remove("active");
      mobileMenu.classList.remove("open");
      burgerBtn.setAttribute("aria-expanded", "false");
      mobileMenu.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }

  const faqItems = document.querySelectorAll(".faq__item");

  faqItems.forEach((item) => {
    const header = item.querySelector(".faq__item-header");
    const details = item.querySelector(".faq__item-details");
    if (!header || !details) {
      if (header) header.style.cursor = "default";
      return;
    }
    header.addEventListener("click", () => {
      const currentlyActive = item.classList.contains("faq__item--active");
      faqItems.forEach((otherItem) => {
        if (
          otherItem !== item &&
          otherItem.classList.contains("faq__item--active")
        ) {
          otherItem.classList.remove("faq__item--active");
        }
      });
      item.classList.toggle("faq__item--active");
    });
    if (details.style.display === "none") {
      details.style.display = "";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("feed-track");
  const wrapper = document.getElementById("feed-wrapper");
  const prevButton = document.getElementById("feed-prev");
  const nextButton = document.getElementById("feed-next");
  const cards = track?.querySelectorAll(".feed__card");

  if (!track || !prevButton || !nextButton || !cards?.length || !wrapper) {
    console.error("Feed slider elements not found!");
    return;
  }

  const getCardWidth = () => cards[0].offsetWidth;
  const getGap = () => parseInt(window.getComputedStyle(track).gap) || 30;
  const getStep = () => getCardWidth() + getGap();
  const getWrapperWidth = () => wrapper.offsetWidth;
  const getMaxTranslateX = () => track.scrollWidth - getWrapperWidth();

  const updateButtons = () => {
    const currentTranslateX = Math.abs(
      parseFloat(
        track.style.transform.replace("translateX(", "").replace("px)", "")
      ) || 0
    );
    prevButton.disabled = currentTranslateX < 1;
    nextButton.disabled = currentTranslateX >= getMaxTranslateX() - 1;
  };

  const slide = (direction) => {
    const currentTranslateX =
      parseFloat(
        track.style.transform.replace("translateX(", "").replace("px)", "")
      ) || 0;
    const step = window.innerWidth <= 780 ? getWrapperWidth() : getStep();
    const newTranslateX =
      direction === "next"
        ? currentTranslateX - step
        : currentTranslateX + step;
    const maxTranslateX = -getMaxTranslateX();

    if (newTranslateX > 0) {
      track.style.transform = `translateX(0px)`;
    } else if (newTranslateX < maxTranslateX) {
      track.style.transform = `translateX(${maxTranslateX}px)`;
    } else {
      track.style.transform = `translateX(${newTranslateX}px)`;
    }
    updateButtons();
  };

  nextButton.addEventListener("click", () => slide("next"));
  prevButton.addEventListener("click", () => slide("prev"));

  updateButtons();
});
