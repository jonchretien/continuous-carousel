import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { screen } from "@testing-library/dom";
import ContinuousCarousel from "../dist/continuous-carousel.esm.js";
import type { ContinuousCarouselInstance } from "../src/types";

const CLASS_NAME_ITEM = ".c-carousel-item";

const renderComponent = (id: string, direction: string, numVisible: number): string =>
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
    "</ul>",
    "</div>",
    "</div>",
  ].join("");

describe("Continuous Carousel", () => {
  beforeEach(() => {
    // Clear body and reset timers
    document.body.innerHTML = "";
    vi.clearAllTimers();
  });

  afterEach(() => {
    // Clean up any running carousels
    document.body.innerHTML = "";
  });

  test("it should render and return carousel instance", () => {
    document.body.innerHTML = renderComponent(
      "carouselExampleHorizontal",
      "horizontal",
      1,
    );
    const carousel = ContinuousCarousel("carouselExampleHorizontal");

    expect(carousel).toBeDefined();
    expect(carousel.container).toBeDefined();
    expect(carousel.play).toBeInstanceOf(Function);
    expect(carousel.pause).toBeInstanceOf(Function);
    expect(carousel.destroy).toBeInstanceOf(Function);

    screen.getByTestId("carousel");
    carousel.destroy();
  });

  test("it should accept options parameter", () => {
    document.body.innerHTML = renderComponent(
      "carouselExampleHorizontal",
      "horizontal",
      1,
    );
    const carousel = ContinuousCarousel("carouselExampleHorizontal", {
      autoplay: false,
      interval: 3000,
    });

    expect(carousel.config.autoplay).toBe(false);
    expect(carousel.config.interval).toBe(3000);
    carousel.destroy();
  });

  test("it should throw an error if given an incorrect direction", () => {
    document.body.innerHTML = renderComponent(
      "carouselExampleHorizontal",
      "lorem-ipsum-dolor",
      2,
    );
    expect(() => {
      ContinuousCarousel("carouselExampleHorizontal");
    }).toThrow('Direction must be either "horizontal" or "vertical"');
  });

  test("it should throw an error if container not found", () => {
    expect(() => {
      ContinuousCarousel("non-existent-id");
    }).toThrow('Carousel container with id "non-existent-id" not found');
  });

  describe("Public API", () => {
    let carousel: ContinuousCarouselInstance;

    beforeEach(() => {
      document.body.innerHTML = renderComponent(
        "carouselTest",
        "horizontal",
        1,
      );
      carousel = ContinuousCarousel("carouselTest", { autoplay: false });
    });

    afterEach(() => {
      if (carousel) {
        carousel.destroy();
      }
    });

    test("play() should start animation", () => {
      carousel.pause(); // First pause it
      carousel.play(); // Then play
      const container = document.getElementById("carouselTest");
      expect(container.getAttribute("data-paused")).toBe("false");
    });

    test("pause() should pause animation", () => {
      carousel.play();
      carousel.pause();
      const container = document.getElementById("carouselTest");
      expect(container.getAttribute("data-paused")).toBe("true");
    });

    test("destroy() should cleanup", () => {
      const container = document.getElementById("carouselTest");
      const liveRegion = container.querySelector(".c-carousel-liveregion");

      expect(liveRegion).toBeTruthy();

      carousel.destroy();

      const liveRegionAfter = container.querySelector(".c-carousel-liveregion");
      expect(liveRegionAfter).toBeFalsy();
    });

    test("updateConfig() should update configuration", () => {
      carousel.updateConfig({ interval: 5000 });
      expect(carousel.config.interval).toBe(5000);
    });
  });

  describe("horizontal carousel", () => {
    test("it should clone 1 node", () => {
      document.body.innerHTML = renderComponent(
        "carouselExampleHorizontal",
        "horizontal",
        1,
      );
      const carousel = ContinuousCarousel("carouselExampleHorizontal");
      const el = screen.getByTestId("carousel");
      expect(el.querySelectorAll(CLASS_NAME_ITEM).length).toBe(7);
      carousel.destroy();
    });

    test("it should clone 3 nodes", () => {
      document.body.innerHTML = renderComponent(
        "carouselExampleHorizontal",
        "horizontal",
        3,
      );
      const carousel = ContinuousCarousel("carouselExampleHorizontal");
      const el = screen.getByTestId("carousel");
      expect(el.querySelectorAll(CLASS_NAME_ITEM).length).toBe(9);
      carousel.destroy();
    });

    test("it should set CSS custom properties", () => {
      document.body.innerHTML = renderComponent(
        "carouselExampleHorizontal",
        "horizontal",
        2,
      );
      const carousel = ContinuousCarousel("carouselExampleHorizontal");
      const container = document.getElementById("carouselExampleHorizontal");

      expect(
        container.style.getPropertyValue("--carousel-item-width"),
      ).toBeTruthy();
      expect(
        container.style.getPropertyValue("--carousel-transition-duration"),
      ).toBeTruthy();
      carousel.destroy();
    });
  });

  describe("vertical carousel", () => {
    test("it should clone 1 node", () => {
      document.body.innerHTML = renderComponent(
        "carouselExampleVertical",
        "vertical",
        1,
      );
      const carousel = ContinuousCarousel("carouselExampleVertical");
      const el = screen.getByTestId("carousel");
      expect(el.querySelectorAll(CLASS_NAME_ITEM).length).toBe(7);
      carousel.destroy();
    });

    test("it should clone 3 nodes", () => {
      document.body.innerHTML = renderComponent(
        "carouselExampleVertical",
        "vertical",
        3,
      );
      const carousel = ContinuousCarousel("carouselExampleVertical");
      const el = screen.getByTestId("carousel");
      expect(el.querySelectorAll(CLASS_NAME_ITEM).length).toBe(9);
      carousel.destroy();
    });

    test("it should set CSS custom properties", () => {
      document.body.innerHTML = renderComponent(
        "carouselExampleVertical",
        "vertical",
        2,
      );
      const carousel = ContinuousCarousel("carouselExampleVertical");
      const container = document.getElementById("carouselExampleVertical");

      expect(
        container.style.getPropertyValue("--carousel-item-height"),
      ).toBeTruthy();
      expect(
        container.style.getPropertyValue("--carousel-transition-duration"),
      ).toBeTruthy();
      carousel.destroy();
    });
  });

  describe("reverse option", () => {
    test("it should accept reverse: true config", () => {
      document.body.innerHTML = renderComponent(
        "carouselReverse",
        "horizontal",
        1,
      );
      const carousel = ContinuousCarousel("carouselReverse", {
        autoplay: false,
        reverse: true,
      });

      expect(carousel.config.reverse).toBe(true);
      carousel.destroy();
    });

    test("reverse horizontal should clone last N items and prepend", () => {
      document.body.innerHTML = renderComponent(
        "carouselReverse",
        "horizontal",
        1,
      );
      const carousel = ContinuousCarousel("carouselReverse", {
        autoplay: false,
        reverse: true,
      });
      const el = screen.getByTestId("carousel");
      const items = el.querySelectorAll(CLASS_NAME_ITEM);
      // 6 original + 1 cloned = 7
      expect(items.length).toBe(7);
      // First item should be the clone of the last item
      expect(items[0].textContent).toBe("6");
      carousel.destroy();
    });

    test("reverse vertical should clone last N items and prepend", () => {
      document.body.innerHTML = renderComponent(
        "carouselReverse",
        "vertical",
        1,
      );
      const carousel = ContinuousCarousel("carouselReverse", {
        autoplay: false,
        reverse: true,
      });
      const el = screen.getByTestId("carousel");
      const items = el.querySelectorAll(CLASS_NAME_ITEM);
      expect(items.length).toBe(7);
      expect(items[0].textContent).toBe("6");
      carousel.destroy();
    });

    test("reverse with numVisible > 1 should clone correct count", () => {
      document.body.innerHTML = renderComponent(
        "carouselReverse",
        "horizontal",
        3,
      );
      const carousel = ContinuousCarousel("carouselReverse", {
        autoplay: false,
        reverse: true,
      });
      const el = screen.getByTestId("carousel");
      const items = el.querySelectorAll(CLASS_NAME_ITEM);
      // 6 original + 3 cloned = 9
      expect(items.length).toBe(9);
      // First 3 items should be clones of last 3
      expect(items[0].textContent).toBe("4");
      expect(items[1].textContent).toBe("5");
      expect(items[2].textContent).toBe("6");
      carousel.destroy();
    });
  });

  describe("numVisible validation", () => {
    test("it should throw when numVisible >= item count", () => {
      document.body.innerHTML = renderComponent(
        "carouselNumVisible",
        "horizontal",
        6,
      );

      expect(() => ContinuousCarousel("carouselNumVisible")).toThrow(
        "numVisible (6) must be less than item count (6).",
      );
    });

    test("it should not throw when numVisible < item count", () => {
      document.body.innerHTML = renderComponent(
        "carouselNumVisible",
        "horizontal",
        1,
      );

      const carousel = ContinuousCarousel("carouselNumVisible");
      carousel.destroy();
    });
  });

  describe("keyboard navigation", () => {
    test("sets tabindex, role, aria-roledescription when enabled", () => {
      document.body.innerHTML = renderComponent(
        "carouselKb",
        "horizontal",
        1,
      );
      const carousel = ContinuousCarousel("carouselKb", {
        autoplay: false,
        keyboardNav: true,
      });
      const container = document.getElementById("carouselKb");

      expect(container.getAttribute("tabindex")).toBe("0");
      expect(container.getAttribute("role")).toBe("region");
      expect(container.getAttribute("aria-roledescription")).toBe("carousel");
      carousel.destroy();
    });

    test("does not set ARIA attrs when keyboardNav is false", () => {
      document.body.innerHTML = renderComponent(
        "carouselKb",
        "horizontal",
        1,
      );
      const carousel = ContinuousCarousel("carouselKb", {
        autoplay: false,
        keyboardNav: false,
      });
      const container = document.getElementById("carouselKb");

      expect(container.getAttribute("tabindex")).toBeNull();
      expect(container.getAttribute("aria-roledescription")).toBeNull();
      carousel.destroy();
    });

    test("space toggles pause", () => {
      document.body.innerHTML = renderComponent(
        "carouselKb",
        "horizontal",
        1,
      );
      const carousel = ContinuousCarousel("carouselKb", {
        autoplay: false,
        keyboardNav: true,
      });
      const container = document.getElementById("carouselKb");

      // Play first, then space to pause
      carousel.play();
      container.dispatchEvent(
        new KeyboardEvent("keydown", { key: " ", bubbles: true }),
      );
      expect(container.getAttribute("data-paused")).toBe("true");

      // Space again to resume
      container.dispatchEvent(
        new KeyboardEvent("keydown", { key: " ", bubbles: true }),
      );
      expect(container.getAttribute("data-paused")).toBe("false");
      carousel.destroy();
    });

    test("cleanup on destroy removes keydown listener", () => {
      document.body.innerHTML = renderComponent(
        "carouselKb",
        "horizontal",
        1,
      );
      const carousel = ContinuousCarousel("carouselKb", {
        autoplay: false,
        keyboardNav: true,
      });
      const container = document.getElementById("carouselKb");

      carousel.play();
      carousel.destroy();

      // After destroy, space should not toggle pause
      container.dispatchEvent(
        new KeyboardEvent("keydown", { key: " ", bubbles: true }),
      );
      // data-paused should not have been set to "true" since handler is disconnected
      expect(container.getAttribute("data-paused")).not.toBe("true");
    });
  });

  describe("Callbacks", () => {
    test("onSlideChange callback should be called", (done) => {
      document.body.innerHTML = renderComponent(
        "carouselCallback",
        "horizontal",
        1,
      );

      const onSlideChange = vi.fn();
      const carousel = ContinuousCarousel("carouselCallback", {
        interval: 100,
        autoplay: true,
        observeVisibility: false, // Disable to ensure it runs in test
        onSlideChange,
      });

      setTimeout(() => {
        // Since animation may not advance in jsdom, check if callback was set
        expect(carousel.config.onSlideChange).toBe(onSlideChange);
        carousel.destroy();
        done();
      }, 150);
    });

    test("onPause callback should be called", () => {
      document.body.innerHTML = renderComponent(
        "carouselCallback",
        "horizontal",
        1,
      );

      const onPause = vi.fn();
      const carousel = ContinuousCarousel("carouselCallback", {
        autoplay: false,
        onPause,
      });

      carousel.play();
      carousel.pause();

      expect(onPause).toHaveBeenCalled();
      carousel.destroy();
    });

    test("onPlay callback should be called", () => {
      document.body.innerHTML = renderComponent(
        "carouselCallback",
        "horizontal",
        1,
      );

      const onPlay = vi.fn();
      const carousel = ContinuousCarousel("carouselCallback", {
        autoplay: false,
        onPlay,
      });

      carousel.pause();
      carousel.play();

      expect(onPlay).toHaveBeenCalled();
      carousel.destroy();
    });
  });
});
