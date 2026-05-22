/**
 * DOM manipulation utilities
 */
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
//# sourceMappingURL=dom.d.ts.map