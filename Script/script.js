import { appendSVG, updateClasses } from "./functions.js";
const menuBtn = document.querySelector("#ham-menu");
let pathA = null;
let pathB = null;
let pathC = null;
let hamburger = null;
if (menuBtn instanceof HTMLElement) {
    appendSVG(menuBtn, "../images/svg/hamburger_menu.svg").then(() => {
        pathA = document.querySelector("#pathA");
        pathB = document.querySelector("#pathB");
        pathC = document.querySelector("#pathC");
        hamburger = document.querySelector("#hamburger");
    });
}
else {
    console.error("Menu button not found");
}
let isMenuOpen = false;
menuBtn?.addEventListener("click", () => {
    if (isMenuOpen === false) {
        if (pathA instanceof SVGElement) {
            updateClasses(pathA, ["pathA-to-open"], ["pathA-start", "pathA-to-closed"]);
        }
        if (pathB instanceof SVGElement) {
            updateClasses(pathB, ["pathB-to-open"], ["pathB-start", "pathB-to-closed"]);
        }
        if (pathC instanceof SVGElement) {
            updateClasses(pathC, ["pathC-to-open"], ["pathC-start", "pathC-to-closed"]);
        }
        if (hamburger instanceof SVGElement) {
            updateClasses(hamburger, ["hamburger-open"], ["hamburger-closed"]);
        }
        isMenuOpen = true;
    }
    else {
        if (isMenuOpen === true) {
            if (pathA instanceof SVGElement) {
                updateClasses(pathA, ["pathA-to-closed"], ["pathA-start", "pathA-to-open"]);
            }
            if (pathB instanceof SVGElement) {
                updateClasses(pathB, ["pathB-to-closed"], ["pathB-start", "pathB-to-open"]);
            }
            if (pathC instanceof SVGElement) {
                updateClasses(pathC, ["pathC-to-closed"], ["pathC-start", "pathC-to-open"]);
            }
            if (hamburger instanceof SVGElement) {
                updateClasses(hamburger, ["hamburger-closed"], ["hamburger-open"]);
            }
            isMenuOpen = false;
        }
    }
});
