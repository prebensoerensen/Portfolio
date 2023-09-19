export function appendSVG(element: HTMLElement, url: string): Promise<void> {
  return fetch(url)
    .then((response) => response.text())
    .then((svgContent) => {
      const svgDocument = new DOMParser().parseFromString(
        svgContent,
        "image/svg+xml"
      );
      const svgElement = svgDocument.documentElement;
      element.append(svgElement);
    })
    .catch((error) => {
      console.error("Error loading SVG:", error);
    });
}

/**
 * update classes of a DOM element by adding or removing specific class names.
 *
 * @param {Element} element - the DOM element to update.
 * @param {string[]} [add=[]] - an array of class names to add to the element.
 * @param {string[]} [remove=[]] - an array of class names to remove from the element.
 * @returns {void}
 */
export function updateClasses(
  element: Element,
  add: string[] = [],
  remove: string[] = []
) {
  add.forEach((cls) => element.classList.add(cls));
  remove.forEach((cls) => element.classList.remove(cls));
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
