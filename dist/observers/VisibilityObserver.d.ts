/**
 * Visibility Observer
 * Uses IntersectionObserver to pause/play carousel based on viewport visibility
 */
import type { Observer, VisibilityCarouselContext } from '../types';
interface VisibilityObserverOptions {
    threshold?: number;
}
/**
 * Creates a visibility observer for a carousel
 */
export declare function createVisibilityObserver(carousel: VisibilityCarouselContext, options?: VisibilityObserverOptions): Observer;
export {};
//# sourceMappingURL=VisibilityObserver.d.ts.map