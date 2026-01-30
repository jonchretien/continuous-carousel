/**
 * DOM manipulation utilities
 */

import { CLASS_NAME_HIDDEN, CLASS_NAME_LIVE_REGION } from '../constants.js';

/**
 * Creates and inserts ARIA live region for accessibility
 * @param {HTMLElement} container - Container element
 * @param {string} ariaLive - ARIA live value (polite, assertive, off)
 * @returns {HTMLElement} The created live region element
 */
export function createLiveRegion(container, ariaLive = 'polite') {
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', ariaLive);
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.className = `${CLASS_NAME_LIVE_REGION} ${CLASS_NAME_HIDDEN}`;
  container.appendChild(liveRegion);
  return liveRegion;
}

/**
 * Updates live region text content
 * @param {HTMLElement} liveRegion - Live region element
 * @param {number} currentIndex - Current slide index
 * @param {number} totalItems - Total number of items
 */
export function updateLiveRegion(liveRegion, currentIndex, totalItems) {
  if (liveRegion) {
    liveRegion.textContent = `Item ${currentIndex} of ${totalItems}`;
  }
}

/**
 * Clones multiple nodes and appends to a document fragment
 * @param {Array<HTMLElement>} nodes - Nodes to clone
 * @returns {DocumentFragment} Fragment containing cloned nodes
 */
export function cloneNodesToFragment(nodes) {
  const fragment = document.createDocumentFragment();
  nodes.forEach((node) => {
    const clone = node.cloneNode(true);
    fragment.appendChild(clone);
  });
  return fragment;
}

/**
 * Sets multiple CSS custom properties on an element
 * @param {HTMLElement} element - Target element
 * @param {Object} properties - Object with property names and values
 */
export function setCSSProperties(element, properties) {
  Object.entries(properties).forEach(([key, value]) => {
    element.style.setProperty(key, value);
  });
}

/**
 * Debounces a function call
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Gets element dimension based on direction
 * @param {HTMLElement} element - Element to measure
 * @param {string} direction - 'horizontal' or 'vertical'
 * @returns {number} Width or height in pixels
 */
export function getElementDimension(element, direction) {
  return direction === 'horizontal' ? element.offsetWidth : element.offsetHeight;
}
