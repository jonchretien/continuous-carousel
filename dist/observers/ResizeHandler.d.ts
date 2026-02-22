/**
 * Resize Handler
 * Uses ResizeObserver to recalculate carousel dimensions on container resize
 */
import type { Observer, ResizeCarouselContext } from '../types';
interface ResizeHandlerOptions {
    debounceDelay?: number;
}
/**
 * Creates a resize handler for a carousel
 */
export declare function createResizeHandler(carousel: ResizeCarouselContext, options?: ResizeHandlerOptions): Observer;
export {};
//# sourceMappingURL=ResizeHandler.d.ts.map