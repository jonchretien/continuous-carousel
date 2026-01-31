export interface ContinuousCarouselConfig {
  direction?: 'horizontal' | 'vertical';
  numVisible?: number;
  interval?: number;
  transitionDuration?: number;
  resetDuration?: number;
  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
  autoplay?: boolean;
  observeVisibility?: boolean;
  observeResize?: boolean;
  ariaLive?: string;
  announceSlides?: boolean;
  reverse?: boolean;
  keyboardNav?: boolean;
  onSlideChange?: ((index: number) => void) | null;
  onPause?: (() => void) | null;
  onPlay?: (() => void) | null;
  onDestroy?: (() => void) | null;
}

export interface ContinuousCarouselInstance {
  play(): void;
  pause(): void;
  destroy(): void;
  updateConfig(options: Partial<ContinuousCarouselConfig>): void;
  container: HTMLElement;
  config: ContinuousCarouselConfig;
}

export default function ContinuousCarousel(
  element: HTMLElement | string,
  options?: ContinuousCarouselConfig
): ContinuousCarouselInstance;
