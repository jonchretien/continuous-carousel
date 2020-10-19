const domTestingLib = require('@testing-library/dom');
const { screen } = domTestingLib;
const ContinuousCarousel = require('../continuous-carousel');

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
  test('it should render', () => {
    document.body.innerHTML = renderComponent(
      'carouselExampleHorizontal',
      'horizontal',
      1
    );
    ContinuousCarousel('carouselExampleHorizontal');
    screen.getByTestId('carousel');
  });

  test('it should throw an error if given an incorrect direction', () => {
    document.body.innerHTML = renderComponent(
      'carouselExampleHorizontal',
      'lorem-ipsum-dolor',
      2
    );
    expect(() => {
      ContinuousCarousel('carouselExampleHorizontal');
    }).toThrow('Direction must be either vertical or horizontal');
  });

  describe('horizontal carousel', () => {
    test('it should clone 1 node', () => {
      document.body.innerHTML = renderComponent(
        'carouselExampleHorizontal',
        'horizontal',
        1
      );
      ContinuousCarousel('carouselExampleHorizontal');
      const el = screen.getByTestId('carousel');
      expect(el.querySelectorAll(CLASS_NAME_ITEM).length).toBe(7);
    });

    test('it should clone 3 nodes', () => {
      document.body.innerHTML = renderComponent(
        'carouselExampleHorizontal',
        'horizontal',
        3
      );
      ContinuousCarousel('carouselExampleHorizontal');
      const el = screen.getByTestId('carousel');
      expect(el.querySelectorAll(CLASS_NAME_ITEM).length).toBe(9);
    });
  });

  describe('vertical carousel', () => {
    test('it should clone 1 node', () => {
      document.body.innerHTML = renderComponent(
        'carouselExampleVertical',
        'vertical',
        1
      );
      ContinuousCarousel('carouselExampleVertical');
      const el = screen.getByTestId('carousel');
      expect(el.querySelectorAll(CLASS_NAME_ITEM).length).toBe(7);
    });

    test('it should clone 3 nodes', () => {
      document.body.innerHTML = renderComponent(
        'carouselExampleVertical',
        'vertical',
        3
      );
      ContinuousCarousel('carouselExampleVertical');
      const el = screen.getByTestId('carousel');
      expect(el.querySelectorAll(CLASS_NAME_ITEM).length).toBe(9);
    });
  });
});
