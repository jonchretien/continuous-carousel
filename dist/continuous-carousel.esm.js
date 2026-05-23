/*!
 * Continuous Carousel 🎠 v1.2.0
 * Continuous carousel that uses vanilla JavaScript & CSS animations.
 * @author Jon Chretien
 * @license Released under the MIT license.
 */

//#region src/constants.ts
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
const DEFAULT_EASING = "ease-in-out";
const ARIA_LIVE_POLITE = "polite";
const DEFAULT_CONFIG = {
	direction: DIRECTION_HORIZONTAL,
	numVisible: 1,
	interval: DEFAULT_INTERVAL,
	transitionDuration: DEFAULT_TRANSITION_DURATION,
	resetDuration: DEFAULT_RESET_DURATION,
	easing: DEFAULT_EASING,
	pauseOnHover: false,
	pauseOnFocus: false,
	autoplay: true,
	observeVisibility: true,
	observeResize: true,
	ariaLive: ARIA_LIVE_POLITE,
	announceSlides: true,
	onSlideChange: null,
	onSlideEnd: null,
	onPause: null,
	onPlay: null,
	reverse: false,
	keyboardNav: true,
	onDestroy: null
};

//#endregion
//#region src/utils/validation.ts
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
	if (normalizedDirection !== DIRECTION_HORIZONTAL && normalizedDirection !== DIRECTION_VERTICAL) throw new Error("Invalid direction");
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
	if (numVisible >= itemCount) throw new Error("numVisible must be less than item count");
}

//#endregion
//#region src/utils/dom.ts
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
		element.style.setProperty(key, String(value));
	});
}

//#endregion
//#region src/animation/TransformStrategy.ts
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
	return direction === "horizontal" ? horizontalStrategy : verticalStrategy;
}

//#endregion
//#region src/animation/AnimationController.ts
function createAnimationController(carousel, options = {}) {
	const { interval = 2e3 } = options;
	let animationFrameId = null;
	let lastTimestamp = 0;
	let isPaused = false;
	let isRunning = false;
	/**
	* Animation loop using requestAnimationFrame
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
	*/
	function getIsRunning() {
		return isRunning;
	}
	/**
	* Check if animation is currently paused
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
//#region src/observers/VisibilityObserver.ts
function createVisibilityObserver(carousel, options = {}) {
	const { threshold = .5 } = options;
	let observer = null;
	/**
	* Callback for intersection changes
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
//#region src/observers/ResizeHandler.ts
function createResizeHandler(carousel, options = {}) {
	const { debounceDelay = 150 } = options;
	let observer = null;
	let debouncedResize = null;
	let resizeTimeout = null;
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
		debouncedResize = () => {
			if (resizeTimeout) clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(handleResize, debounceDelay);
		};
		window.addEventListener("resize", debouncedResize);
	}
	function cleanupWindowResizeFallback() {
		if (debouncedResize) {
			window.removeEventListener("resize", debouncedResize);
			debouncedResize = null;
		}
		if (resizeTimeout) {
			clearTimeout(resizeTimeout);
			resizeTimeout = null;
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
//#region src/observers/KeyboardHandler.ts
function createKeyboardHandler(carousel) {
	const KEY_ACTIONS = {
		ArrowRight: () => carousel.advanceSlide(true),
		ArrowDown: () => carousel.advanceSlide(true),
		ArrowLeft: () => carousel.advanceSlide(false),
		ArrowUp: () => carousel.advanceSlide(false),
		" ": () => carousel.togglePause(),
		Enter: () => carousel.togglePause()
	};
	function handleKeydown(event) {
		const action = KEY_ACTIONS[event.key];
		if (!action) return;
		event.preventDefault();
		action();
	}
	function observe() {
		const el = carousel.container;
		el.setAttribute("tabindex", "0");
		el.setAttribute("role", "region");
		el.setAttribute("aria-roledescription", "carousel");
		el.addEventListener("keydown", handleKeydown);
	}
	function disconnect() {
		carousel.container.removeEventListener("keydown", handleKeydown);
	}
	return {
		observe,
		disconnect
	};
}

//#endregion
//#region src/ContinuousCarousel.ts
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
	let keyboardHandler = null;
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
			"--carousel-transition-duration": `${config.transitionDuration}ms`,
			"--carousel-easing": config.easing
		});
		return {
			itemSize,
			containerSize
		};
	}
	/**
	* Apply transform to item group
	*/
	function applyTransform(pos, duration) {
		itemGroup.style.transform = transformStrategy.getTransform(pos);
		if (duration !== undefined) setCSSProperties(container, { "--carousel-transition-duration": `${duration}ms` });
	}
	/**
	* Notify listeners of a slide change
	*/
	function notifySlideChange() {
		const element$1 = items[activeSlideIndex - 1];
		if (liveRegion) updateLiveRegion(liveRegion, activeSlideIndex, itemsLength);
		if (config.onSlideChange) config.onSlideChange(activeSlideIndex, element$1);
		if (config.onSlideEnd) {
			const callback = config.onSlideEnd;
			setTimeout(() => callback(activeSlideIndex, element$1), config.transitionDuration);
		}
	}
	/**
	* Advance to next slide
	*/
	function advanceSlide(forward) {
		const { itemSize } = recalculateDimensions();
		const goForward = forward !== undefined ? forward : !config.reverse;
		const delta = goForward ? -1 : 1;
		const resetPos = goForward ? -(itemSize * itemsLength) : 0;
		const atBoundary = position === resetPos;
		if (atBoundary) {
			position = goForward ? 0 : -(itemSize * itemsLength);
			activeSlideIndex = goForward ? 1 : itemsLength;
			applyTransform(position, config.resetDuration);
			setTimeout(() => {
				position += delta * itemSize * numVisible;
				activeSlideIndex -= delta;
				if (activeSlideIndex < 1) activeSlideIndex = itemsLength;
				if (activeSlideIndex > itemsLength) activeSlideIndex = 1;
				applyTransform(position, config.transitionDuration);
				notifySlideChange();
			}, config.resetDuration + 50);
			return;
		}
		position += delta * itemSize * numVisible;
		activeSlideIndex -= delta;
		if (activeSlideIndex < 1) activeSlideIndex = itemsLength;
		if (activeSlideIndex > itemsLength) activeSlideIndex = 1;
		applyTransform(position, config.transitionDuration);
		notifySlideChange();
	}
	/**
	* Clone items and set initial position based on direction
	*/
	function setupClones() {
		if (config.reverse) {
			const clonedFragment$1 = cloneNodesToFragment(items.slice(-numVisible));
			itemGroup.insertBefore(clonedFragment$1, itemGroup.firstChild);
			const { itemSize } = recalculateDimensions();
			position = -(itemSize * numVisible);
			applyTransform(position, 0);
			return;
		}
		const clonedFragment = cloneNodesToFragment(items.slice(0, numVisible));
		itemGroup.appendChild(clonedFragment);
		recalculateDimensions();
	}
	/**
	* Play/resume the carousel
	*/
	function play() {
		if (!isPaused) return;
		isPaused = false;
		container.setAttribute(ATTR_PAUSED, "false");
		if (animationController) {
			if (animationController.getIsPaused()) animationController.resume();
else if (!animationController.getIsRunning()) animationController.start();
		}
		if (config.onPlay) config.onPlay();
	}
	/**
	* Pause the carousel
	*/
	function pause() {
		if (isPaused) return;
		isPaused = true;
		container.setAttribute(ATTR_PAUSED, "true");
		if (animationController) animationController.pause();
		if (config.onPause) config.onPause();
	}
	/**
	* Toggle between play and pause
	*/
	function togglePause() {
		if (isPaused) return play();
		pause();
	}
	/**
	* Destroy the carousel and cleanup
	*/
	function destroy() {
		if (animationController) animationController.stop();
		if (visibilityObserver) visibilityObserver.disconnect();
		if (resizeHandler) resizeHandler.disconnect();
		if (keyboardHandler) keyboardHandler.disconnect();
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
	* Jump to a specific slide by 0-based index (snaps instantly, then resumes)
	*/
	function goToSlide(index) {
		const targetSlideIndex = Math.max(1, Math.min(index + 1, itemsLength));
		const { itemSize } = recalculateDimensions();
		const offset = config.reverse ? targetSlideIndex : targetSlideIndex - 1;
		const targetPosition = -(offset * numVisible * itemSize);
		applyTransform(targetPosition, 0);
		void container.offsetHeight;
		setCSSProperties(container, { "--carousel-transition-duration": `${config.transitionDuration}ms` });
		position = targetPosition;
		activeSlideIndex = targetSlideIndex;
		notifySlideChange();
	}
	/**
	* Update configuration
	*/
	function updateConfig(newOptions) {
		Object.assign(config, newOptions);
		if (newOptions.transitionDuration !== undefined || newOptions.easing !== undefined) recalculateDimensions();
	}
	/**
	* Initialize the carousel
	*/
	function init() {
		setupClones();
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
		if (config.keyboardNav) {
			keyboardHandler = createKeyboardHandler({
				advanceSlide,
				togglePause,
				container
			});
			keyboardHandler.observe();
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
	init();
	return {
		play,
		pause,
		destroy,
		goToSlide,
		updateConfig,
		container,
		config
	};
}

//#endregion
export { DIRECTION_HORIZONTAL, DIRECTION_VERTICAL, ContinuousCarousel as default };