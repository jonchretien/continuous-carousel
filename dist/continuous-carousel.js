/*!
 * Continuous Carousel 🎠 v1.1.0
 * Continuous carousel that uses vanilla JavaScript & CSS animations.
 * @author Jon Chretien
 * @license Released under the MIT license.
 */
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports =  factory() :
  typeof define === 'function' && define.amd ? define([], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.ContinuousCarousel = factory()));
})(this, function() {
"use strict";

//#region \0rollupPluginBabelHelpers.js
function _OverloadYield(e, d) {
	this.v = e, this.k = d;
}
function _defineProperty(e, r, t) {
	return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r$1) {
			_defineProperty(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _toPrimitive(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function AsyncGenerator(e) {
	var r, t;
	function resume(r$1, t$1) {
		try {
			var n = e[r$1](t$1), o = n.value, u = o instanceof _OverloadYield;
			Promise.resolve(u ? o.v : o).then(function(t$2) {
				if (u) {
					var i = "return" === r$1 ? "return" : "next";
					if (!o.k || t$2.done) return resume(i, t$2);
					t$2 = e[i](t$2).value;
				}
				settle(n.done ? "return" : "normal", t$2);
			}, function(e$1) {
				resume("throw", e$1);
			});
		} catch (e$1) {
			settle("throw", e$1);
		}
	}
	function settle(e$1, n) {
		switch (e$1) {
			case "return":
				r.resolve({
					value: n,
					done: !0
				});
				break;
			case "throw":
				r.reject(n);
				break;
			default: r.resolve({
				value: n,
				done: !1
			});
		}
		(r = r.next) ? resume(r.key, r.arg) : t = null;
	}
	this._invoke = function(e$1, n) {
		return new Promise(function(o, u) {
			var i = {
				key: e$1,
				arg: n,
				resolve: o,
				reject: u,
				next: null
			};
			t ? t = t.next = i : (r = t = i, resume(e$1, n));
		});
	}, "function" != typeof e.return && (this.return = void 0);
}
AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function() {
	return this;
}, AsyncGenerator.prototype.next = function(e) {
	return this._invoke("next", e);
}, AsyncGenerator.prototype.throw = function(e) {
	return this._invoke("throw", e);
}, AsyncGenerator.prototype.return = function(e) {
	return this._invoke("return", e);
};

//#endregion
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
	keyboardNav: true,
	onDestroy: null
};

//#endregion
//#region src/utils/validation.ts
function validateElement(element) {
	let el = element;
	if (typeof element === "string") {
		el = document.getElementById(element);
		if (!el) throw new Error("Carousel container with id \"".concat(element, "\" not found"));
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
function createLiveRegion(container) {
	let ariaLive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "polite";
	const liveRegion = document.createElement("div");
	liveRegion.setAttribute("aria-live", ariaLive);
	liveRegion.setAttribute("aria-atomic", "true");
	liveRegion.className = "".concat(CLASS_NAME_LIVE_REGION, " ").concat(CLASS_NAME_HIDDEN);
	container.appendChild(liveRegion);
	return liveRegion;
}
function updateLiveRegion(liveRegion, currentIndex, totalItems) {
	if (liveRegion) liveRegion.textContent = "Item ".concat(currentIndex, " of ").concat(totalItems);
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
	Object.entries(properties).forEach((_ref) => {
		let [key, value] = _ref;
		element.style.setProperty(key, String(value));
	});
}

//#endregion
//#region src/animation/TransformStrategy.ts
/**
* Transform Strategy Pattern
* Separates horizontal and vertical transform logic using plain objects
*/
/**
* Horizontal transform strategy
* Handles left-to-right carousel movement
*/
const horizontalStrategy = {
	getTransform(position) {
		return "translate3d(".concat(position, "px, 0, 0)");
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
		return "translate3d(0, ".concat(position, "px, 0)");
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
function createAnimationController(carousel) {
	let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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
function createVisibilityObserver(carousel) {
	let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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
function createResizeHandler(carousel) {
	let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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
function ContinuousCarousel(element) {
	let userOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	const container = validateElement(element);
	const dataDirection = container.getAttribute(ATTR_DIRECTION);
	const dataNumVisible = container.getAttribute(ATTR_NUM_VISIBLE);
	const dataReverse = container.getAttribute(ATTR_REVERSE);
	const config = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, DEFAULT_CONFIG), dataDirection && { direction: validateDirection(dataDirection) }), dataNumVisible && { numVisible: validateNumVisible(dataNumVisible) }), dataReverse !== null && { reverse: validateReverse(dataReverse) }), userOptions);
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
			"--carousel-item-width": direction === "horizontal" ? "".concat(itemSize, "px") : "auto",
			"--carousel-item-height": direction === "vertical" ? "".concat(itemSize, "px") : "auto",
			"--carousel-item-count": totalItems,
			"--carousel-transition-duration": "".concat(config.transitionDuration, "ms")
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
		if (duration !== undefined) setCSSProperties(container, { "--carousel-transition-duration": "".concat(duration, "ms") });
	}
	/**
	* Notify listeners of a slide change
	*/
	function notifySlideChange() {
		if (liveRegion) updateLiveRegion(liveRegion, activeSlideIndex, itemsLength);
		if (config.onSlideChange) config.onSlideChange(activeSlideIndex);
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
	* Update configuration
	*/
	function updateConfig(newOptions) {
		Object.assign(config, newOptions);
		if (newOptions.transitionDuration !== undefined) recalculateDimensions();
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
		updateConfig,
		container,
		config
	};
}

//#endregion
return ContinuousCarousel;
});