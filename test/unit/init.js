(function() {

  'use strict';

  test('init', function() {
    var args = {
      el: '#init',
      direction: 'vertical',
      numVisible: 3
    };

    var carousel = new InfiniteCarousel(args.el, args.direction, args.numVisible);

    ok(typeof(args.el) === 'string', 'container id is a string');
    equal(carousel.container, document.querySelector(args.el), '#container is a proper element');

    ok(typeof(args.numVisible) === 'number', 'numVisible is a number');
    equal(carousel.numVisible, args.numVisible, 'numVisible exists');

    ok(typeof(args.direction) === 'string', 'direction is a string');
    equal(carousel.direction, args.direction, 'direction equals "vertical"');

    equal(carousel.container.getAttribute('data-top'), 0, 'first cell data-top = 0');

    equal(carousel.items.length, 14, 'carousel has 14 items');
  });

})();
