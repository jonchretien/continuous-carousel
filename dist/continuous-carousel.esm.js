/*!
 * Continuous Carousel 🎠 v0.4.1
 * Continuous carousel that uses vanilla JavaScript & CSS animations.
 * @author Jon Chretien
 * @license Released under the MIT license.
 */

//#region src/constants.js
const DIRECTION_HORIZONTAL = "horizontal";
const DIRECTION_VERTICAL = "vertical";
const CLASS_NAME_HIDDEN = "c-carousel-visuallyhidden";
const CLASS_NAME_LIVE_REGION = "c-carousel-liveregion";
const SELECTOR_GROUP = ".c-carousel-group";
const SELECTOR_ITEM = ".c-carousel-item";
const ATTR_DIRECTION = "data-direction";
const ATTR_NUM_VISIBLE = "data-num-visible";
const ATTR_PAUSED = "data-paused";
const ATTR_REVERSE = "data-reverse";
const DEFAULT_INTERVAL = 2e3;
const DEFAULT_TRANSITION_DURATION = 1e3;
const DEFAULT_RESET_DURATION = 1;
const ARIA_LIVE_POLITE = "polite";
const DEFAULT_CONFIG = {
	direction: DIRECTION_HORIZONTAL,
	numVisible: 1,
	interval: DEFAULT_INTERVAL,
	transitionDuration: DEFAULT_TRANSITION_DURATION,
	resetDuration: DEFAULT_RESET_DURATION,
	pauseOnHover: false,
	pauseOnFocus: false,
	autoplay: true,
	observeVisibility: true,
	observeResize: true,
	ariaLive: ARIA_LIVE_POLITE,
	announceSlides: true,
	onSlideChange: null,
	onPause: null,
	onPlay: null,
	reverse: false,
	onDestroy: null
};

//#endregion
//#region src/utils/validation.js
function validateElement(element) {
	let el = element;
	if (typeof element === "string") {
		el = document.getElementById(element);
		if (!el) throw new Error(`Carousel container with id "${element}" not found`);
	}
	if (!(el instanceof HTMLElement)) throw new Error("Carousel container must be an HTMLElement or valid element ID");
	return el;
}
function validateDirection(direction) {
	const normalizedDirection = direction.toLowerCase().trim();
	if (normalizedDirection !== DIRECTION_HORIZONTAL && normalizedDirection !== DIRECTION_VERTICAL) throw new Error(`Direction must be either "${DIRECTION_HORIZONTAL}" or "${DIRECTION_VERTICAL}"`);
	return normalizedDirection;
}
function validateNumVisible(numVisible) {
	const num = Number(numVisible);
	if (isNaN(num) || num < 1 || !Number.isInteger(num)) throw new Error("numVisible must be a positive integer");
	return num;
}
function validateReverse(value) {
	if (typeof value === "string") return value.toLowerCase() === "true";
	return Boolean(value);
}
function validateNumVisibleCount(numVisible, itemCount) {
	if (numVisible >= itemCount) console.warn(`numVisible (${numVisible}) must be less than item count (${itemCount}). Carousel may not behave correctly.`);
}

//#endregion
//#region src/utils/dom.js
function createLiveRegion(container, ariaLive = "polite") {
	const liveRegion = document.createElement("div");
	liveRegion.setAttribute("aria-live", ariaLive);
	liveRegion.setAttribute("aria-atomic", "true");
	liveRegion.className = `${CLASS_NAME_LIVE_REGION} ${CLASS_NAME_HIDDEN}`;
	container.appendChild(liveRegion);
	return liveRegion;
}
function updateLiveRegion(liveRegion, currentIndex, totalItems) {
	if (liveRegion) liveRegion.textContent = `Item ${currentIndex} of ${totalItems}`;
}
function cloneNodesToFragment(nodes) {
	const fragment = document.createDocumentFragment();
	nodes.forEach((node) => {
		const clone = node.cloneNode(true);
		fragment.appendChild(clone);
	});
	return fragment;
}
function setCSSProperties(element, properties) {
	Object.entries(properties).forEach(([key, value]) => {
		element.style.setProperty(key, value);
	});
}
function debounce(fn, delay) {
	let timeoutId;
	return function(...args) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn.apply(this, args), delay);
	};
}

//#endregion
//#region src/animation/TransformStrategy.js
/**
* Horizontal transform strategy
* Handles left-to-right carousel movement
*/
const horizontalStrategy = {
	getTransform(position) {
		return `translate3d(${position}px, 0, 0)`;
	},
	getMeasurement(element) {
		return element.offsetWidth;
	},
	getSizeProperty() {
		return "width";
	},
	getCSSVariableName() {
		return "--carousel-item-width";
	}
};
/**
* Vertical transform strategy
* Handles top-to-bottom carousel movement
*/
const verticalStrategy = {
	getTransform(position) {
		return `translate3d(0, ${position}px, 0)`;
	},
	getMeasurement(element) {
		return element.offsetHeight;
	},
	getSizeProperty() {
		return "height";
	},
	getCSSVariableName() {
		return "--carousel-item-height";
	}
};
function createTransformStrategy(direction) {
	const strategies = {
		[DIRECTION_HORIZONTAL]: horizontalStrategy,
		[DIRECTION_VERTICAL]: verticalStrategy
	};
	const strategy = strategies[direction];
	if (!strategy) throw new Error(`Invalid direction: ${direction}. Must be "${DIRECTION_HORIZONTAL}" or "${DIRECTION_VERTICAL}"`);
	return strategy;
}

//#endregion
//#region src/animation/AnimationController.js
function createAnimationController(carousel, options = {}) {
	const { interval = 2e3 } = options;
	let animationFrameId = null;
	let lastTimestamp = 0;
	let isPaused = false;
	let isRunning = false;
	/**
	* Animation loop using requestAnimationFrame
	* @param {number} timestamp - High-resolution timestamp from rAF
	*/
	function animate(timestamp) {
		if (isPaused) {
			animationFrameId = requestAnimationFrame(animate);
			return;
		}
		if (lastTimestamp === 0) lastTimestamp = timestamp;
		const elapsed = timestamp - lastTimestamp;
		if (elapsed >= interval) {
			if (carousel.advanceSlide) carousel.advanceSlide();
			lastTimestamp = timestamp;
		}
		animationFrameId = requestAnimationFrame(animate);
	}
	/**
	* Start the animation loop
	*/
	function start() {
		if (isRunning) return;
		isRunning = true;
		isPaused = false;
		lastTimestamp = 0;
		animationFrameId = requestAnimationFrame(animate);
	}
	/**
	* Stop the animation loop and reset state
	*/
	function stop() {
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}
		isRunning = false;
		isPaused = false;
		lastTimestamp = 0;
	}
	/**
	* Pause the animation (keeps loop running but doesn't advance slides)
	*/
	function pause() {
		isPaused = true;
	}
	/**
	* Resume the animation from paused state
	*/
	function resume() {
		if (isPaused) {
			isPaused = false;
			lastTimestamp = 0;
		}
	}
	/**
	* Check if animation is currently running
	* @returns {boolean}
	*/
	function getIsRunning() {
		return isRunning;
	}
	/**
	* Check if animation is currently paused
	* @returns {boolean}
	*/
	function getIsPaused() {
		return isPaused;
	}
	return {
		start,
		stop,
		pause,
		resume,
		getIsRunning,
		getIsPaused
	};
}

//#endregion
//#region src/observers/VisibilityObserver.js
function createVisibilityObserver(carousel, options = {}) {
	const { threshold = .5 } = options;
	let observer = null;
	/**
	* Callback for intersection changes
	* @param {IntersectionObserverEntry[]} entries - Observer entries
	*/
	function handleIntersection(entries) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) carousel.play();
else carousel.pause();
		});
	}
	/**
	* Start observing the carousel container
	*/
	function observe() {
		if (!("IntersectionObserver" in window)) {
			console.warn("IntersectionObserver not supported. Carousel will run continuously.");
			return;
		}
		if (!observer) observer = new IntersectionObserver(handleIntersection, { threshold });
		observer.observe(carousel.container);
	}
	/**
	* Stop observing and cleanup
	*/
	function disconnect() {
		if (observer) {
			observer.disconnect();
			observer = null;
		}
	}
	return {
		observe,
		disconnect
	};
}

//#endregion
//#region src/observers/ResizeHandler.js
function createResizeHandler(carousel, options = {}) {
	const { debounceDelay = 150 } = options;
	let observer = null;
	let debouncedResize = null;
	/**
	* Callback for resize events
	*/
	function handleResize() {
		if (carousel.recalculateDimensions) carousel.recalculateDimensions();
	}
	/**
	* Setup fallback using window resize event
	*/
	function setupWindowResizeFallback() {
		debouncedResize = debounce(handleResize, debounceDelay);
		window.addEventListener("resize", debouncedResize);
	}
	/**
	* Cleanup window resize fallback
	*/
	function cleanupWindowResizeFallback() {
		if (debouncedResize) {
			window.removeEventListener("resize", debouncedResize);
			debouncedResize = null;
		}
	}
	/**
	* Start observing the carousel container for resize
	*/
	function observe() {
		if (!("ResizeObserver" in window)) {
			console.warn("ResizeObserver not supported. Using window resize fallback.");
			setupWindowResizeFallback();
			return;
		}
		if (!observer) observer = new ResizeObserver(() => {
			handleResize();
		});
		observer.observe(carousel.container);
	}
	/**
	* Stop observing and cleanup
	*/
	function disconnect() {
		if (observer) {
			observer.disconnect();
			observer = null;
		}
		cleanupWindowResizeFallback();
	}
	return {
		observe,
		disconnect
	};
}

//#endregion
//#region src/ContinuousCarousel.js
function ContinuousCarousel(element, userOptions = {}) {
	const container = validateElement(element);
	const dataDirection = container.getAttribute(ATTR_DIRECTION);
	const dataNumVisible = container.getAttribute(ATTR_NUM_VISIBLE);
	const dataReverse = container.getAttribute(ATTR_REVERSE);
	const config = {
		...DEFAULT_CONFIG,
		...dataDirection && { direction: validateDirection(dataDirection) },
		...dataNumVisible && { numVisible: validateNumVisible(dataNumVisible) },
		...dataReverse !== null && { reverse: validateReverse(dataReverse) },
		...userOptions
	};
	const direction = validateDirection(config.direction);
	const numVisible = validateNumVisible(config.numVisible);
	const itemGroup = container.querySelector(SELECTOR_GROUP);
	const items = Array.from(container.querySelectorAll(SELECTOR_ITEM));
	const itemsLength = items.length;
	validateNumVisibleCount(numVisible, itemsLength);
	let activeSlideIndex = 1;
	let position = 0;
	let liveRegion = null;
	let isPaused = false;
	const transformStrategy = createTransformStrategy(direction);
	let animationController = null;
	let visibilityObserver = null;
	let resizeHandler = null;
	/**
	* Calculate and update CSS custom properties for layout
	*/
	function recalculateDimensions() {
		const containerSize = transformStrategy.getMeasurement(container);
		const itemSize = containerSize / numVisible;
		const totalItems = itemsLength + numVisible;
		setCSSProperties(container, {
			"--carousel-item-width": direction === "horizontal" ? `${itemSize}px` : "auto",
			"--carousel-item-height": direction === "vertical" ? `${itemSize}px` : "auto",
			"--carousel-item-count": totalItems,
			"--carousel-transition-duration": `${config.transitionDuration}ms`
		});
		return {
			itemSize,
			containerSize
		};
	}
	/**
	* Apply transform to item group
	* @param {number} pos - Position in pixels
	* @param {number} duration - Transition duration in ms
	*/
	function applyTransform(pos, duration) {
		itemGroup.style.transform = transformStrategy.getTransform(pos);
		if (duration !== undefined) setCSSProperties(container, { "--carousel-transition-duration": `${duration}ms` });
	}
	/**
	* Advance to next slide
	*/
	function advanceSlide() {
		const { itemSize } = recalculateDimensions();
		if (config.reverse) {
			const endPosition = 0;
			if (position === endPosition) {
				position = -(itemSize * itemsLength);
				activeSlideIndex = itemsLength;
				applyTransform(position, config.resetDuration);
				setTimeout(() => {
					position = position + itemSize * numVisible;
					activeSlideIndex--;
					if (activeSlideIndex < 1) activeSlideIndex = itemsLength;
					applyTransform(position, config.transitionDuration);
					if (liveRegion) updateLiveRegion(liveRegion, activeSlideIndex, itemsLength);
					if (config.onSlideChange) config.onSlideChange(activeSlideIndex);
				}, config.resetDuration + 50);
			} else {
				position = position + itemSize * numVisible;
				activeSlideIndex--;
				if (activeSlideIndex < 1) activeSlideIndex = itemsLength;
				applyTransform(position, config.transitionDuration);
				if (liveRegion) updateLiveRegion(liveRegion, activeSlideIndex, itemsLength);
				if (config.onSlideChange) config.onSlideChange(activeSlideIndex);
			}
		} else {
			const endPosition = -(itemSize * itemsLength);
			if (position === endPosition) {
				position = 0;
				activeSlideIndex = 1;
				applyTransform(position, config.resetDuration);
				setTimeout(() => {
					position = position - itemSize * numVisible;
					activeSlideIndex++;
					applyTransform(position, config.transitionDuration);
					if (liveRegion) updateLiveRegion(liveRegion, activeSlideIndex, itemsLength);
					if (config.onSlideChange) config.onSlideChange(activeSlideIndex);
				}, config.resetDuration + 50);
			} else {
				position = position - itemSize * numVisible;
				activeSlideIndex++;
				if (activeSlideIndex > itemsLength) activeSlideIndex = 1;
				applyTransform(position, config.transitionDuration);
				if (liveRegion) updateLiveRegion(liveRegion, activeSlideIndex, itemsLength);
				if (config.onSlideChange) config.onSlideChange(activeSlideIndex);
			}
		}
	}
	/**
	* Initialize the carousel
	*/
	function init() {
		if (config.reverse) {
			const clonedFragment = cloneNodesToFragment(items.slice(-numVisible));
			itemGroup.insertBefore(clonedFragment, itemGroup.firstChild);
			const { itemSize } = recalculateDimensions();
			position = -(itemSize * numVisible);
			applyTransform(position, 0);
		} else {
			const clonedFragment = cloneNodesToFragment(items.slice(0, numVisible));
			itemGroup.appendChild(clonedFragment);
			recalculateDimensions();
		}
		if (config.announceSlides) {
			liveRegion = createLiveRegion(container, config.ariaLive);
			updateLiveRegion(liveRegion, activeSlideIndex, itemsLength);
		}
		animationController = createAnimationController({
			advanceSlide,
			container
		}, { interval: config.interval });
		if (config.observeResize) {
			resizeHandler = createResizeHandler({
				recalculateDimensions,
				container
			});
			resizeHandler.observe();
		}
		if (config.observeVisibility) {
			visibilityObserver = createVisibilityObserver({
				play,
				pause,
				container
			}, { threshold: .5 });
			visibilityObserver.observe();
		}
		if (config.pauseOnHover) {
			container.addEventListener("mouseenter", pause);
			container.addEventListener("mouseleave", play);
		}
		if (config.pauseOnFocus) {
			container.addEventListener("focusin", pause);
			container.addEventListener("focusout", play);
		}
		if (config.autoplay) animationController.start();
	}
	/**
	* Play/resume the carousel
	*/
	function play() {
		if (isPaused) {
			isPaused = false;
			container.setAttribute(ATTR_PAUSED, "false");
			if (animationController) {
				if (animationController.getIsPaused()) animationController.resume();
else if (!animationController.getIsRunning()) animationController.start();
			}
			if (config.onPlay) config.onPlay();
		}
	}
	/**
	* Pause the carousel
	*/
	function pause() {
		if (!isPaused) {
			isPaused = true;
			container.setAttribute(ATTR_PAUSED, "true");
			if (animationController) animationController.pause();
			if (config.onPause) config.onPause();
		}
	}
	/**
	* Destroy the carousel and cleanup
	*/
	function destroy() {
		if (animationController) animationController.stop();
		if (visibilityObserver) visibilityObserver.disconnect();
		if (resizeHandler) resizeHandler.disconnect();
		if (config.pauseOnHover) {
			container.removeEventListener("mouseenter", pause);
			container.removeEventListener("mouseleave", play);
		}
		if (config.pauseOnFocus) {
			container.removeEventListener("focusin", pause);
			container.removeEventListener("focusout", play);
		}
		if (liveRegion) liveRegion.remove();
		if (config.onDestroy) config.onDestroy();
	}
	/**
	* Update configuration
	* @param {Object} newOptions - New options to merge
	*/
	function updateConfig(newOptions) {
		Object.assign(config, newOptions);
		if (newOptions.transitionDuration !== undefined) recalculateDimensions();
	}
	init();
	return {
		play,
		pause,
		destroy,
		updateConfig,
		container,
		config
	};
}

//#endregion
export { ContinuousCarousel as default };