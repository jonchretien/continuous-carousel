/**
 * Keyboard Handler
 * Adds keyboard navigation to carousel (arrows, space/enter)
 */

/**
 * Creates a keyboard handler for a carousel
 * @param {Object} carousel - Carousel interface
 * @param {Function} carousel.advanceSlide - Advance slide (forward=true, reverse=false)
 * @param {Function} carousel.togglePause - Toggle pause/play
 * @param {HTMLElement} carousel.container - Carousel container element
 * @returns {Object} Handler interface with observe() and disconnect()
 */
export function createKeyboardHandler(carousel) {
  const KEY_ACTIONS = {
    ArrowRight: () => carousel.advanceSlide(true),
    ArrowDown: () => carousel.advanceSlide(true),
    ArrowLeft: () => carousel.advanceSlide(false),
    ArrowUp: () => carousel.advanceSlide(false),
    ' ': () => carousel.togglePause(),
    Enter: () => carousel.togglePause(),
  };

  function handleKeydown(event) {
    const action = KEY_ACTIONS[event.key];
    if (!action) return;
    event.preventDefault();
    action();
  }

  function observe() {
    const el = carousel.container;
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'region');
    el.setAttribute('aria-roledescription', 'carousel');
    el.addEventListener('keydown', handleKeydown);
  }

  function disconnect() {
    carousel.container.removeEventListener('keydown', handleKeydown);
  }

  return {
    observe,
    disconnect
  };
}
