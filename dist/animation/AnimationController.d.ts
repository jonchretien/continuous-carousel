/**
 * Animation Controller
 * Uses requestAnimationFrame with timestamp tracking for smooth, frame-rate independent animation
 */
import type { AnimationController, CarouselContext } from '../types';
interface AnimationControllerOptions {
    interval?: number;
}
/**
 * Creates an animation controller for a carousel
 */
export declare function createAnimationController(carousel: CarouselContext, options?: AnimationControllerOptions): AnimationController;
export {};
//# sourceMappingURL=AnimationController.d.ts.map