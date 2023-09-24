import { appendSVG, updateClasses, delay, debounce } from "./functions.js";

const menuBtn = document.querySelector("#ham-menu");
const menu = document.querySelector("nav");
const menuListItems = document.querySelectorAll(".menu-link");
let pathA = null;
let pathB = null;
let pathC = null;
let hamburger = null;
const myName = document.querySelector("#my-name");
const slideElements = document.querySelectorAll(".slide");

appendSVG(menuBtn, "../Images/svg/hamburger_menu.svg").then(() => {
  pathA = document.querySelector("#pathA");
  pathB = document.querySelector("#pathB");
  pathC = document.querySelector("#pathC");
  hamburger = document.querySelector("#hamburger");
});

appendSVG(myName, "../Images/svg/my_name.svg").then(() => {
  window.scrollTo(0, 0);
});

let isMenuOpen = false;

menuBtn.addEventListener("mousedown", debounce(toggleMenu, 550));

async function toggleMenu() {
  if (isMenuOpen === false) {
    updateClasses(pathA, ["pathA-to-open"], ["pathA-start", "pathA-to-closed"]);

    updateClasses(pathB, ["pathB-to-open"], ["pathB-start", "pathB-to-closed"]);

    updateClasses(pathC, ["pathC-to-open"], ["pathC-start", "pathC-to-closed"]);

    updateClasses(hamburger, ["hamburger-open"], ["hamburger-closed"]);

    isMenuOpen = true;
  } else {
    if (isMenuOpen === true) {
      updateClasses(
        pathA,
        ["pathA-to-closed"],
        ["pathA-start", "pathA-to-open"]
      );

      updateClasses(
        pathB,
        ["pathB-to-closed"],
        ["pathB-start", "pathB-to-open"]
      );

      updateClasses(
        pathC,
        ["pathC-to-closed"],
        ["pathC-start", "pathC-to-open"]
      );

      updateClasses(hamburger, ["hamburger-closed"], ["hamburger-open"]);
    }
    isMenuOpen = false;
  }
  if (isMenuOpen) {
    updateClasses(menu, ["right_fade_in"], ["right_fade_out"]);
    await delay(50);
    menuListItems.forEach(async (item, i) => {
      await delay(50 * i);
      updateClasses(item, ["right_fade_in"], ["right_fade_out"]);
    });
  } else {
    menuListItems.forEach(async (item, i) => {
      await delay(50 * i);
      updateClasses(item, ["right_fade_out"], ["right_fade_in"]);
    });
    await delay(250);
    updateClasses(menu, ["right_fade_out"], ["right_fade_in"]);
  }
}

menuListItems.forEach((item) => {
  const btn = item.querySelector(".menu-link-btn");
  btn.addEventListener("mousedown", function (e) {
    const sectionId = e.target.getAttribute("data-section"); // get the section id from data attribute
    const section = document.getElementById(sectionId); // get the section element
    const sectionRect = section.getBoundingClientRect();
    window.scrollTo({
      top: sectionRect.top + window.scrollY,
      behavior: "smooth",
    });

    // run toggleMenu with debouncer
    debounce(toggleMenu, 550)();
  });
});

const options = {
  root: null,
  threshold: 1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.toggle("slide-in-left");
    observer.unobserve(entry.target);
  });
}, options);

slideElements.forEach((element) => {
  observer.observe(element);
});
