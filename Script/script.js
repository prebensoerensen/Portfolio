import { appendSVG, updateClasses, delay } from "./functions.js";

const menuBtn = document.querySelector("#ham-menu");
const menu = document.querySelector("nav");
const menuListItem = document.querySelectorAll(".menu-link");

appendSVG(menuBtn, "../images/svg/hamburger_menu.svg").then(() => {
  pathA = document.querySelector("#pathA");
  pathB = document.querySelector("#pathB");
  pathC = document.querySelector("#pathC");
  hamburger = document.querySelector("#hamburger");
});

let isMenuOpen = false;

menuBtn.addEventListener("click", async () => {
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
    await delay(100);
    menuListItem.forEach(async (item, i) => {
      await delay(100 * i);
      updateClasses(item, ["right_fade_in"], ["right_fade_out"]);
    });
  } else {
    menuListItem.forEach(async (item, i) => {
      await delay(100 * i);
      updateClasses(item, ["right_fade_out"], ["right_fade_in"]);
    });
    await delay(500);
    updateClasses(menu, ["right_fade_out"], ["right_fade_in"]);
  }
});
