# Infinite Carousel

_Timed infinite carousel that uses vanilla JavaScript & CSS animations. It supports both horizontal and vertical scrolling. It's useful if you need a UI element to continuously scroll (ex: ticker being displayed on a TV monitor)._

[Docs and demos](http://jonchretien.github.io/infinite-carousel-docs/).

## Install

### Download

#### CSS

+ [infinite-carousel.css](https://github.com/jonchretien/infinite-carousel/raw/master/dist/infinite-carousel.css) *or*
+ [infinite-carousel.min.css](https://github.com/jonchretien/infinite-carousel/raw/master/dist/infinite-carousel.min.css)

#### JavaScript

+ [infinite-carousel.js](https://github.com/jonchretien/infinite-carousel/raw/master/dist/infinite-carousel.js) *or*
+ [infinite-carousel.min.js](https://github.com/jonchretien/infinite-carousel/raw/master/dist/infinite-carousel.min.js)

### Markup

Infinite Carousel works with a container element and a set of child item elements.

``` html
<div class="infinite-carousel-shell">
  <div id="container" class="infinite-carousel-group">
    <div class="infinite-carousel-group-item">1</div>
    <div class="infinite-carousel-group-item">2</div>
    <div class="infinite-carousel-group-item">3</div>
    <div class="infinite-carousel-group-item">4</div>
  </div>
</div>
```

### JavaScript

``` js
/**
 * Required arguments are:
 * - a container element (string)
 * - a direction ('horizontal' or 'vertical')
 * - the number of items that are visible at once
 */
var infinitecarousel = new InfiniteCarousel('#container', 'horizontal', 3 {
  // optional options object (defaults are listed)

  timerDuration: 2000,
  // set time between advances in milliseconds

  transitionDuration: '1s'
  // the duration of the animation
});
```

## Browser Support

Tested in the latest versions of:
+ Chrome (v41+)
+ Firefox (v36+)
+ Opera (v27+)
+ Safari (v8+)

## License

Infinite Carousel is released under the [MIT license](https://github.com/jonchretien/infinite-carousel/blob/master/LICENSE.txt).