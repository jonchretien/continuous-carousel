/**
 * DOM manipulation utilities
 */

import { CLASS_NAME_HIDDEN, CLASS_NAME_LIVE_REGION } from '../constants';

/**
 * Creates and inserts ARIA live region for accessibility
 */
export function createLiveRegion(container: HTMLElement, ariaLive: string = 'polite'): HTMLElement {
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', ariaLive);
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.className = `${CLASS_NAME_LIVE_REGION} ${CLASS_NAME_HIDDEN}`;
  container.appendChild(liveRegion);
  return liveRegion;
}

/**
 * Updates live region text content
 */
export function updateLiveRegion(liveRegion: HTMLElement | null, currentIndex: number, totalItems: number): void {
  if (liveRegion) {
    liveRegion.textContent = `Item ${currentIndex} of ${totalItems}`;
  }
}

/**
 * Clones multiple nodes and appends to a document fragment
 */
export function cloneNodesToFragment(nodes: HTMLElement[]): DocumentFragment {
  const fragment = document.createDocumentFragment();
  nodes.forEach((node) => {
    const clone = node.cloneNode(true);
    fragment.appendChild(clone);
  });
  return fragment;
}

/**
 * Sets multiple CSS custom properties on an element
 */
export function setCSSProperties(element: HTMLElement, properties: Record<string, string | number>): void {
  Object.entries(properties).forEach(([key, value]) => {
    element.style.setProperty(key, String(value));
  });
}

