# Continuous Carousel ∞

_Timed continuous carousel that uses vanilla JavaScript & CSS animations. It supports both horizontal and vertical scrolling._

## Markup

Continuous Carousel works with a container element and a set of child elements.

**Horizontal Carousel**

```html
<div
  id="carouselExampleHorizontal"
  <!-- css hooks begin with "c-carousel-..." -->
  class="c-carousel-container"
  <!-- direction must be "horizontal" or "vertical" -->
  data-direction="horizontal"
  <!-- specify how many elements should be visible at once -->
  data-num-visible="1" >
  <ul class="c-carousel-group">
    <li class="c-carousel-item">1</li>
    <li class="c-carousel-item">2</li>
    <li class="c-carousel-item">3</li>
    <li class="c-carousel-item">4</li>
    <li class="c-carousel-item">5</li>
    <li class="c-carousel-item">6</li>
  </ul>
</div>

<script>
  // the carousel id is a required argument for the script
  const horizCarousel = ContinuousCarousel('carouselExampleHorizontal');
</script>
```

**Vertical Carousel**

```html
<div
  id="carouselExampleVertical"
  <!-- css hooks begin with "c-carousel-..." -->
  class="c-carousel-container"
  <!-- direction must be "horizontal" or "vertical" -->
  data-direction="vertical"
  <!-- specify how many elements should be visible at once -->
  data-num-visible="1" >
  <ul class="c-carousel-group">
    <li class="c-carousel-item">1</li>
    <li class="c-carousel-item">2</li>
    <li class="c-carousel-item">3</li>
    <li class="c-carousel-item">4</li>
    <li class="c-carousel-item">5</li>
    <li class="c-carousel-item">6</li>
  </ul>
</div>

<script>
  // the carousel id is a required argument for the script
  const vertCarousel = ContinuousCarousel('carouselExampleVertical');
</script>
```

## Browser Support

As of 10/2020 `ContinuousCarousel` is supported in the latest versions of:

- Edge
- Firefox
- Chrome
- Safari
- Opera

There's currently no support for Internet Explorer.

## License

Continuous Carousel is released under the [MIT license](https://github.com/jonchretien/continuous-carousel/blob/master/LICENSE.txt).
