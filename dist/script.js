"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_js_1 = require("./functions.js");
const menuBtn = document.querySelector("#ham-menu");
const menu = document.querySelector("nav");
const menuListItems = document.querySelectorAll(".menu-link");
let pathA = null;
let pathB = null;
let pathC = null;
let hamburger = null;
const myName = document.querySelector("#my-name");
const slideElements = document.querySelectorAll(".slide");
(0, functions_js_1.appendSVG)(menuBtn, "./Images/svg/hamburger_menu.svg").then(() => {
    pathA = document.querySelector("#pathA");
    pathB = document.querySelector("#pathB");
    pathC = document.querySelector("#pathC");
    hamburger = document.querySelector("#hamburger");
});
(0, functions_js_1.appendSVG)(myName, "./Images/svg/my_name.svg").then(() => {
    window.scrollTo(0, 0);
});
let isMenuOpen = false;
menuBtn.addEventListener("mousedown", (0, functions_js_1.debounce)(toggleMenu, 550));
async function toggleMenu() {
    await (0, functions_js_1.delay)(250);
    if (isMenuOpen === false) {
        (0, functions_js_1.updateClasses)(pathA, ["pathA-to-open"], ["pathA-start", "pathA-to-closed"]);
        (0, functions_js_1.updateClasses)(pathB, ["pathB-to-open"], ["pathB-start", "pathB-to-closed"]);
        (0, functions_js_1.updateClasses)(pathC, ["pathC-to-open"], ["pathC-start", "pathC-to-closed"]);
        (0, functions_js_1.updateClasses)(hamburger, ["hamburger-open"], ["hamburger-closed"]);
        isMenuOpen = true;
    }
    else {
        if (isMenuOpen === true) {
            (0, functions_js_1.updateClasses)(pathA, ["pathA-to-closed"], ["pathA-start", "pathA-to-open"]);
            (0, functions_js_1.updateClasses)(pathB, ["pathB-to-closed"], ["pathB-start", "pathB-to-open"]);
            (0, functions_js_1.updateClasses)(pathC, ["pathC-to-closed"], ["pathC-start", "pathC-to-open"]);
            (0, functions_js_1.updateClasses)(hamburger, ["hamburger-closed"], ["hamburger-open"]);
        }
        isMenuOpen = false;
    }
    if (isMenuOpen) {
        (0, functions_js_1.updateClasses)(menu, ["right_fade_in"], ["right_fade_out"]);
        await (0, functions_js_1.delay)(50);
        menuListItems.forEach(async (item, i) => {
            await (0, functions_js_1.delay)(50 * i);
            (0, functions_js_1.updateClasses)(item, ["right_fade_in"], ["right_fade_out"]);
            await (0, functions_js_1.delay)(550);
            item.classList.remove("link-start-pos");
            item.classList.remove("right_fade_in");
        });
    }
    else {
        menuListItems.forEach(async (item, i) => {
            await (0, functions_js_1.delay)(50 * i);
            (0, functions_js_1.updateClasses)(item, ["right_fade_out"], ["right_fade_in"]);
        });
        await (0, functions_js_1.delay)(250);
        (0, functions_js_1.updateClasses)(menu, ["right_fade_out"], ["right_fade_in"]);
    }
}
menuListItems.forEach((item) => {
    const btn = item.querySelector(".menu-link-btn");
    btn.addEventListener("mousedown", async function (e) {
        (0, functions_js_1.debounce)(toggleMenu, 550)();
        await (0, functions_js_1.delay)(550);
        const sectionId = e.target.getAttribute("data-section");
        const section = document.getElementById(sectionId);
        const sectionRect = section.getBoundingClientRect();
        window.scrollTo({
            top: sectionRect.top + window.scrollY - 96,
            behavior: "smooth",
        });
    });
});
const options = {
    root: null,
    threshold: 0.75,
    rootMargin: "0px 0px -25px 0px",
};
const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(async (entry) => {
        if (!entry.isIntersecting) {
            return;
        }
        entry.target.classList.add("slide-in-left");
        await (0, functions_js_1.delay)(1550);
        entry.target.classList.remove("slide-in-left");
        entry.target.classList.remove("slide");
        observer.unobserve(entry.target);
    });
}, options);
slideElements.forEach((element) => {
    observer.observe(element);
});
