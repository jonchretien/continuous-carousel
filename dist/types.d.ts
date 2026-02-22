/**
 * Type definitions for Continuous Carousel
 */
export type Direction = 'horizontal' | 'vertical';
export interface ContinuousCarouselConfig {
    direction: Direction;
    numVisible: number;
    interval: number;
    transitionDuration: number;
    resetDuration: number;
    pauseOnHover: boolean;
    pauseOnFocus: boolean;
    autoplay: boolean;
    observeVisibility: boolean;
    observeResize: boolean;
    ariaLive: string;
    announceSlides: boolean;
    reverse: boolean;
    keyboardNav: boolean;
    onSlideChange: ((index: number) => void) | null;
    onPause: (() => void) | null;
    onPlay: (() => void) | null;
    onDestroy: (() => void) | null;
}
export interface ContinuousCarouselInstance {
    play(): void;
    pause(): void;
    destroy(): void;
    updateConfig(options: Partial<ContinuousCarouselConfig>): void;
    container: HTMLElement;
    config: ContinuousCarouselConfig;
}
export interface TransformStrategy {
    getTransform(position: number): string;
    getMeasurement(element: HTMLElement): number;
    getSizeProperty(): string;
    getCSSVariableName(): string;
}
export interface AnimationController {
    start(): void;
    stop(): void;
    pause(): void;
    resume(): void;
    getIsRunning(): boolean;
    getIsPaused(): boolean;
}
export interface Observer {
    observe(): void;
    disconnect(): void;
}
export interface CarouselContext {
    advanceSlide: (forward?: boolean) => void;
    container: HTMLElement;
}
export interface VisibilityCarouselContext {
    play: () => void;
    pause: () => void;
    container: HTMLElement;
}
export interface ResizeCarouselContext {
    recalculateDimensions: () => void;
    container: HTMLElement;
}
export interface KeyboardCarouselContext {
    advanceSlide: (forward: boolean) => void;
    togglePause: () => void;
    container: HTMLElement;
}
//# sourceMappingURL=types.d.ts.map