/*!
 * Continuous Carousel 🎠 v0.4.1
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
function _arrayLikeToArray(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
function _arrayWithHoles(r) {
	if (Array.isArray(r)) return r;
}
function _defineProperty(e, r, t) {
	return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _iterableToArrayLimit(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r$1) {
			o = !0, n = r$1;
		} finally {
			try {
				if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _nonIterableRest() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
function _slicedToArray(r, e) {
	return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
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
function _unsupportedIterableToArray(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray(r, a);
		var t = {}.toString.call(r).slice(8, -1);
		return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
	}
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
//#region src/constants.js
var DIRECTION_HORIZONTAL = "horizontal";
var DIRECTION_VERTICAL = "vertical";
var CLASS_NAME_HIDDEN = "c-carousel-visuallyhidden";
var CLASS_NAME_LIVE_REGION = "c-carousel-liveregion";
var SELECTOR_GROUP = ".c-carousel-group";
var SELECTOR_ITEM = ".c-carousel-item";
var ATTR_DIRECTION = "data-direction";
var ATTR_NUM_VISIBLE = "data-num-visible";
var ATTR_PAUSED = "data-paused";
var ATTR_REVERSE = "data-reverse";
var DEFAULT_INTERVAL = 2e3;
var DEFAULT_TRANSITION_DURATION = 1e3;
var DEFAULT_RESET_DURATION = 1;
var ARIA_LIVE_POLITE = "polite";
var DEFAULT_CONFIG = {
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
	var el = element;
	if (typeof element === "string") {
		el = document.getElementById(element);
		if (!el) throw new Error("Carousel container with id \"".concat(element, "\" not found"));
	}
	if (!(el instanceof HTMLElement)) throw new Error("Carousel container must be an HTMLElement or valid element ID");
	return el;
}
function validateDirection(direction) {
	var normalizedDirection = direction.toLowerCase().trim();
	if (normalizedDirection !== DIRECTION_HORIZONTAL && normalizedDirection !== DIRECTION_VERTICAL) throw new Error("Direction must be either \"".concat(DIRECTION_HORIZONTAL, "\" or \"").concat(DIRECTION_VERTICAL, "\""));
	return normalizedDirection;
}
function validateNumVisible(numVisible) {
	var num = Number(numVisible);
	if (isNaN(num) || num < 1 || !Number.isInteger(num)) throw new Error("numVisible must be a positive integer");
	return num;
}
function validateReverse(value) {
	if (typeof value === "string") return value.toLowerCase() === "true";
	return Boolean(value);
}

//#endregion
//#region src/utils/dom.js
function createLiveRegion(container) {
	var ariaLive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "polite";
	var liveRegion = document.createElement("div");
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
	var fragment = document.createDocumentFragment();
	nodes.forEach(function(node) {
		var clone = node.cloneNode(true);
		fragment.appendChild(clone);
	});
	return fragment;
}
function setCSSProperties(element, properties) {
	Object.entries(properties).forEach(function(_ref) {
		var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
		element.style.setProperty(key, value);
	});
}
function debounce(fn, delay) {
	var timeoutId;
	return function() {
		var _this = this;
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		clearTimeout(timeoutId);
		timeoutId = setTimeout(function() {
			return fn.apply(_this, args);
		}, delay);
	};
}

//#endregion
//#region src/animation/TransformStrategy.js
/**
* Horizontal transform strategy
* Handles left-to-right carousel movement
*/
var horizontalStrategy = {
	getTransform: function getTransform(position) {
		return "translate3d(".concat(position, "px, 0, 0)");
	},
	getMeasurement: function getMeasurement(element) {
		return element.offsetWidth;
	},
	getSizeProperty: function getSizeProperty() {
		return "width";
	},
	getCSSVariableName: function getCSSVariableName() {
		return "--carousel-item-width";
	}
};
/**
* Vertical transform strategy
* Handles top-to-bottom carousel movement
*/
var verticalStrategy = {
	getTransform: function getTransform(position) {
		return "translate3d(0, ".concat(position, "px, 0)");
	},
	getMeasurement: function getMeasurement(element) {
		return element.offsetHeight;
	},
	getSizeProperty: function getSizeProperty() {
		return "height";
	},
	getCSSVariableName: function getCSSVariableName() {
		return "--carousel-item-height";
	}
};
function createTransformStrategy(direction) {
	var strategies = _defineProperty(_defineProperty({}, DIRECTION_HORIZONTAL, horizontalStrategy), DIRECTION_VERTICAL, verticalStrategy);
	var strategy = strategies[direction];
	if (!strategy) throw new Error("Invalid direction: ".concat(direction, ". Must be \"").concat(DIRECTION_HORIZONTAL, "\" or \"").concat(DIRECTION_VERTICAL, "\""));
	return strategy;
}

//#endregion
//#region src/animation/AnimationController.js
function createAnimationController(carousel) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var _options$interval = options.interval, interval = _options$interval === void 0 ? 2e3 : _options$interval;
	var animationFrameId = null;
	var lastTimestamp = 0;
	var isPaused = false;
	var isRunning = false;
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
		var elapsed = timestamp - lastTimestamp;
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
function createVisibilityObserver(carousel) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var _options$threshold = options.threshold, threshold = _options$threshold === void 0 ? .5 : _options$threshold;
	var observer = null;
	/**
	* Callback for intersection changes
	* @param {IntersectionObserverEntry[]} entries - Observer entries
	*/
	function handleIntersection(entries) {
		entries.forEach(function(entry) {
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
function createResizeHandler(carousel) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var _options$debounceDela = options.debounceDelay, debounceDelay = _options$debounceDela === void 0 ? 150 : _options$debounceDela;
	var observer = null;
	var debouncedResize = null;
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
		if (!observer) observer = new ResizeObserver(function() {
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
function ContinuousCarousel(element) {
	var userOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var container = validateElement(element);
	var dataDirection = container.getAttribute(ATTR_DIRECTION);
	var dataNumVisible = container.getAttribute(ATTR_NUM_VISIBLE);
	var dataReverse = container.getAttribute(ATTR_REVERSE);
	var config = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, DEFAULT_CONFIG), dataDirection && { direction: validateDirection(dataDirection) }), dataNumVisible && { numVisible: validateNumVisible(dataNumVisible) }), dataReverse !== null && { reverse: validateReverse(dataReverse) }), userOptions);
	var direction = validateDirection(config.direction);
	var numVisible = validateNumVisible(config.numVisible);
	var itemGroup = container.querySelector(SELECTOR_GROUP);
	var items = Array.from(container.querySelectorAll(SELECTOR_ITEM));
	var itemsLength = items.length;
	var activeSlideIndex = 1;
	var position = 0;
	var liveRegion = null;
	var isPaused = false;
	var transformStrategy = createTransformStrategy(direction);
	var animationController = null;
	var visibilityObserver = null;
	var resizeHandler = null;
	/**
	* Calculate and update CSS custom properties for layout
	*/
	function recalculateDimensions() {
		var containerSize = transformStrategy.getMeasurement(container);
		var itemSize = containerSize / numVisible;
		var totalItems = itemsLength + numVisible;
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
	* @param {number} pos - Position in pixels
	* @param {number} duration - Transition duration in ms
	*/
	function applyTransform(pos, duration) {
		itemGroup.style.transform = transformStrategy.getTransform(pos);
		if (duration !== undefined) setCSSProperties(container, { "--carousel-transition-duration": "".concat(duration, "ms") });
	}
	/**
	* Advance to next slide
	*/
	function advanceSlide() {
		var _recalculateDimension = recalculateDimensions(), itemSize = _recalculateDimension.itemSize;
		if (config.reverse) {
			var endPosition = 0;
			if (position === endPosition) {
				position = -(itemSize * itemsLength);
				activeSlideIndex = itemsLength;
				applyTransform(position, config.resetDuration);
				setTimeout(function() {
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
			var _endPosition = -(itemSize * itemsLength);
			if (position === _endPosition) {
				position = 0;
				activeSlideIndex = 1;
				applyTransform(position, config.resetDuration);
				setTimeout(function() {
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
			var clonedFragment = cloneNodesToFragment(items.slice(-numVisible));
			itemGroup.insertBefore(clonedFragment, itemGroup.firstChild);
			var _recalculateDimension2 = recalculateDimensions(), itemSize = _recalculateDimension2.itemSize;
			position = -(itemSize * numVisible);
			applyTransform(position, 0);
		} else {
			var _clonedFragment = cloneNodesToFragment(items.slice(0, numVisible));
			itemGroup.appendChild(_clonedFragment);
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
return ContinuousCarousel;
});