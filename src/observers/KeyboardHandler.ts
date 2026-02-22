/**
 * Keyboard Handler
 * Adds keyboard navigation to carousel (arrows, space/enter)
 */

import type { KeyboardCarouselContext, Observer } from '../types';

/**
 * Creates a keyboard handler for a carousel
 */
export function createKeyboardHandler(carousel: KeyboardCarouselContext): Observer {
  const KEY_ACTIONS: Record<string, () => void> = {
    ArrowRight: () => carousel.advanceSlide(true),
    ArrowDown: () => carousel.advanceSlide(true),
    ArrowLeft: () => carousel.advanceSlide(false),
    ArrowUp: () => carousel.advanceSlide(false),
    ' ': () => carousel.togglePause(),
    Enter: () => carousel.togglePause(),
  };

  function handleKeydown(event: KeyboardEvent): void {
    const action = KEY_ACTIONS[event.key];
    if (!action) return;
    event.preventDefault();
    action();
  }

  function observe(): void {
    const el = carousel.container;
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'region');
    el.setAttribute('aria-roledescription', 'carousel');
    el.addEventListener('keydown', handleKeydown);
  }

  function disconnect(): void {
    carousel.container.removeEventListener('keydown', handleKeydown);
  }

  return {
    observe,
    disconnect
  };
}
