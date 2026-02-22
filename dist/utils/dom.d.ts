/**
 * DOM manipulation utilities
 */
import type { Direction } from '../types';
/**
 * Creates and inserts ARIA live region for accessibility
 */
export declare function createLiveRegion(container: HTMLElement, ariaLive?: string): HTMLElement;
/**
 * Updates live region text content
 */
export declare function updateLiveRegion(liveRegion: HTMLElement | null, currentIndex: number, totalItems: number): void;
/**
 * Clones multiple nodes and appends to a document fragment
 */
export declare function cloneNodesToFragment(nodes: HTMLElement[]): DocumentFragment;
/**
 * Sets multiple CSS custom properties on an element
 */
export declare function setCSSProperties(element: HTMLElement, properties: Record<string, string | number>): void;
/**
 * Debounces a function call
 */
export declare function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void;
/**
 * Gets element dimension based on direction
 */
export declare function getElementDimension(element: HTMLElement, direction: Direction): number;
//# sourceMappingURL=dom.d.ts.map