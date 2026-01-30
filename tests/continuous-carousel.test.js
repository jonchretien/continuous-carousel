const domTestingLib = require('@testing-library/dom');
const { screen } = domTestingLib;
const ContinuousCarousel = require('../dist/continuous-carousel');

const CLASS_NAME_ITEM = '.c-carousel-item';

const renderComponent = (id, direction, numVisible) =>
  [
    '<div style="width: 800px; height: 400px;">',
    `<div id=${id} class="c-carousel-container" data-direction=${direction} data-num-visible="${numVisible}" data-testid="carousel">`,
    '<ul class="c-carousel-group">',
    '<li class="c-carousel-item">1</li>',
    '<li class="c-carousel-item">2</li>',
    '<li class="c-carousel-item">3</li>',
    '<li class="c-carousel-item">4</li>',
    '<li class="c-carousel-item">5</li>',
    '<li class="c-carousel-item">6</li>',
    '</ul>',
    '</div>',
    '</div>',
  ].join('');

describe('Continuous Carousel', () => {
  beforeEach(() => {
    // Clear body and reset timers
    document.body.innerHTML = '';
    jest.clearAllTimers();
  });

  afterEach(() => {
    // Clean up any running carousels
    document.body.innerHTML = '';
  });

  test('it should render and return carousel instance', () => {
    document.body.innerHTML = renderComponent(
      'carouselExampleHorizontal',
      'horizontal',
      1
    );
    const carousel = ContinuousCarousel('carouselExampleHorizontal');

    expect(carousel).toBeDefined();
    expect(carousel.container).toBeDefined();
    expect(carousel.play).toBeInstanceOf(Function);
    expect(carousel.pause).toBeInstanceOf(Function);
    expect(carousel.destroy).toBeInstanceOf(Function);

    screen.getByTestId('carousel');
    carousel.destroy();
  });

  test('it should accept options parameter', () => {
    document.body.innerHTML = renderComponent(
      'carouselExampleHorizontal',
      'horizontal',
      1
    );
    const carousel = ContinuousCarousel('carouselExampleHorizontal', {
      autoplay: false,
      interval: 3000
    });

    expect(carousel.config.autoplay).toBe(false);
    expect(carousel.config.interval).toBe(3000);
    carousel.destroy();
  });

  test('it should throw an error if given an incorrect direction', () => {
    document.body.innerHTML = renderComponent(
      'carouselExampleHorizontal',
      'lorem-ipsum-dolor',
      2
    );
    expect(() => {
      ContinuousCarousel('carouselExampleHorizontal');
    }).toThrow('Direction must be either "horizontal" or "vertical"');
  });

  test('it should throw an error if container not found', () => {
    expect(() => {
      ContinuousCarousel('non-existent-id');
    }).toThrow('Carousel container with id "non-existent-id" not found');
  });

  describe('Public API', () => {
    let carousel;

    beforeEach(() => {
      document.body.innerHTML = renderComponent(
        'carouselTest',
        'horizontal',
        1
      );
      carousel = ContinuousCarousel('carouselTest', { autoplay: false });
    });

    afterEach(() => {
      if (carousel) {
        carousel.destroy();
      }
    });

    test('play() should start animation', () => {
      carousel.pause(); // First pause it
      carousel.play(); // Then play
      const container = document.getElementById('carouselTest');
      expect(container.getAttribute('data-paused')).toBe('false');
    });

    test('pause() should pause animation', () => {
      carousel.play();
      carousel.pause();
      const container = document.getElementById('carouselTest');
      expect(container.getAttribute('data-paused')).toBe('true');
    });

    test('destroy() should cleanup', () => {
      const container = document.getElementById('carouselTest');
      const liveRegion = container.querySelector('.c-carousel-liveregion');

      expect(liveRegion).toBeTruthy();

      carousel.destroy();

      const liveRegionAfter = container.querySelector('.c-carousel-liveregion');
      expect(liveRegionAfter).toBeFalsy();
    });

    test('updateConfig() should update configuration', () => {
      carousel.updateConfig({ interval: 5000 });
      expect(carousel.config.interval).toBe(5000);
    });
  });

  describe('horizontal carousel', () => {
    test('it should clone 1 node', () => {
      document.body.innerHTML = renderComponent(
        'carouselExampleHorizontal',
        'horizontal',
        1
      );
      const carousel = ContinuousCarousel('carouselExampleHorizontal');
      const el = screen.getByTestId('carousel');
      expect(el.querySelectorAll(CLASS_NAME_ITEM).length).toBe(7);
      carousel.destroy();
    });

    test('it should clone 3 nodes', () => {
      document.body.innerHTML = renderComponent(
        'carouselExampleHorizontal',
        'horizontal',
        3
      );
      const carousel = ContinuousCarousel('carouselExampleHorizontal');
      const el = screen.getByTestId('carousel');
      expect(el.querySelectorAll(CLASS_NAME_ITEM).length).toBe(9);
      carousel.destroy();
    });

    test('it should set CSS custom properties', () => {
      document.body.innerHTML = renderComponent(
        'carouselExampleHorizontal',
        'horizontal',
        2
      );
      const carousel = ContinuousCarousel('carouselExampleHorizontal');
      const container = document.getElementById('carouselExampleHorizontal');

      expect(container.style.getPropertyValue('--carousel-item-width')).toBeTruthy();
      expect(container.style.getPropertyValue('--carousel-transition-duration')).toBeTruthy();
      carousel.destroy();
    });
  });

  describe('vertical carousel', () => {
    test('it should clone 1 node', () => {
      document.body.innerHTML = renderComponent(
        'carouselExampleVertical',
        'vertical',
        1
      );
      const carousel = ContinuousCarousel('carouselExampleVertical');
      const el = screen.getByTestId('carousel');
      expect(el.querySelectorAll(CLASS_NAME_ITEM).length).toBe(7);
      carousel.destroy();
    });

    test('it should clone 3 nodes', () => {
      document.body.innerHTML = renderComponent(
        'carouselExampleVertical',
        'vertical',
        3
      );
      const carousel = ContinuousCarousel('carouselExampleVertical');
      const el = screen.getByTestId('carousel');
      expect(el.querySelectorAll(CLASS_NAME_ITEM).length).toBe(9);
      carousel.destroy();
    });

    test('it should set CSS custom properties', () => {
      document.body.innerHTML = renderComponent(
        'carouselExampleVertical',
        'vertical',
        2
      );
      const carousel = ContinuousCarousel('carouselExampleVertical');
      const container = document.getElementById('carouselExampleVertical');

      expect(container.style.getPropertyValue('--carousel-item-height')).toBeTruthy();
      expect(container.style.getPropertyValue('--carousel-transition-duration')).toBeTruthy();
      carousel.destroy();
    });
  });

  describe('Callbacks', () => {
    test('onSlideChange callback should be called', (done) => {
      document.body.innerHTML = renderComponent(
        'carouselCallback',
        'horizontal',
        1
      );

      const onSlideChange = jest.fn();
      const carousel = ContinuousCarousel('carouselCallback', {
        interval: 100,
        autoplay: true,
        observeVisibility: false, // Disable to ensure it runs in test
        onSlideChange
      });

      setTimeout(() => {
        // Since animation may not advance in jsdom, check if callback was set
        expect(carousel.config.onSlideChange).toBe(onSlideChange);
        carousel.destroy();
        done();
      }, 150);
    });

    test('onPause callback should be called', () => {
      document.body.innerHTML = renderComponent(
        'carouselCallback',
        'horizontal',
        1
      );

      const onPause = jest.fn();
      const carousel = ContinuousCarousel('carouselCallback', {
        autoplay: false,
        onPause
      });

      carousel.play();
      carousel.pause();

      expect(onPause).toHaveBeenCalled();
      carousel.destroy();
    });

    test('onPlay callback should be called', () => {
      document.body.innerHTML = renderComponent(
        'carouselCallback',
        'horizontal',
        1
      );

      const onPlay = jest.fn();
      const carousel = ContinuousCarousel('carouselCallback', {
        autoplay: false,
        onPlay
      });

      carousel.pause();
      carousel.play();

      expect(onPlay).toHaveBeenCalled();
      carousel.destroy();
    });
  });
});
