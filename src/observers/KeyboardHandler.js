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
  function handleKeydown(event) {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        carousel.advanceSlide(true);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        carousel.advanceSlide(false);
        break;
      case ' ':
      case 'Enter':
        event.preventDefault();
        carousel.togglePause();
        break;
    }
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
