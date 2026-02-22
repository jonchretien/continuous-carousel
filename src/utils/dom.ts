/**
 * DOM manipulation utilities
 */

import { CLASS_NAME_HIDDEN, CLASS_NAME_LIVE_REGION } from '../constants';
import type { Direction } from '../types';

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

/**
 * Debounces a function call
 */
export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Gets element dimension based on direction
 */
export function getElementDimension(element: HTMLElement, direction: Direction): number {
  return direction === 'horizontal' ? element.offsetWidth : element.offsetHeight;
}
