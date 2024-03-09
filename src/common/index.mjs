/**
 * @typedef {import('center-center/common').ScrollingElement} ScrollingElement
 * @typedef {import('center-center/common').CenterCenterRect} CenterCenterRect
 * @typedef {import('center-center/common').CenterCenterRects} CenterCenterRects
 */

/**
 * Gets the document `scrollingElement` (or a valid alternative)
 *
 * @returns {ScrollingElement}
 */
export function getScrollingElement () {
  if (Reflect.has(document, 'scrollingElement')) {
    const scrollingElement = Reflect.get(document, 'scrollingElement')
    if (scrollingElement) return scrollingElement
  }

  return {
    scrollLeft: 0,
    scrollTop: 0
  }
}

/**
 * Creates a `Rect` for the viewport
 *
 * @returns {CenterCenterRect}
 */
export function createViewportRect () {
  const {
    innerWidth: width,
    innerHeight: height
  } = window

  const {
    scrollLeft: left,
    scrollTop: top
  } = getScrollingElement()

  return {
    left,
    top,
    width,
    height,
    right: (left + width),
    bottom: (top + height)
  }
}

/**
 * Creates a `Rect` for a DOM element
 *
 * @param {Element} element
 * @returns {CenterCenterRect}
*/
export function createDOMElementRect (element) {
  const {
    scrollLeft,
    scrollTop
  } = getScrollingElement()

  const {
    x,
    y,
    width,
    height
  } = element.getBoundingClientRect()

  const left = (scrollLeft + x)
  const top = (scrollTop + y)

  return {
    left,
    top,
    width,
    height,
    right: (left + width),
    bottom: (top + height)
  }
}

/**
 * Creates a `Rect` for an SVG element
 *
 * @param {SVGElement} element
 * @returns {CenterCenterRect}
*/
export function createSVGElementRect (element) {
  const {
    x: left,
    y: top,
    width,
    height
  } = element.getBBox()

  return {
    left,
    top,
    width,
    height,
    right: (left + width),
    bottom: (top + height)
  }
}

/**
 * Creates a collection of `Rects` describing
 *  1. The viewport
 *  2. The DOM container element
 *  3. The DOM target element
 *
 * @param {Element} container
 * @param {Element} target
 * @returns {CenterCenterRects}
 */
export function createDOMRects (container, target) {
  return {
    viewport: createViewportRect(),
    container: createDOMElementRect(container),
    target: createDOMElementRect(target)
  }
}

/**
 * Creates a collection of `Rects` describing
 *  1. The viewport
 *  2. The DOM container element
 *  3. The SVG target element
 *
 * @param {Element} container
 * @param {SVGElement} target
 * @returns {CenterCenterRects}
 */
export function createSVGRects (container, target) {
  return {
    viewport: createViewportRect(),
    container: createDOMElementRect(container),
    target: createSVGElementRect(target)
  }
}

/**
 * Destructures the `left` field from a `Rect`
 *
 * @param {CenterCenterRect} rect
 * @returns {number}
 */
export function getRectLeft ({ left }) {
  return left
}

/**
 * Destructures the `top` field from a `Rect`
 *
 * @param {CenterCenterRect} rect
 * @returns {number}
 */
export function getRectTop ({ top }) {
  return top
}

/**
 * Destructures the `width` field from a `Rect`
 *
 * @param {CenterCenterRect} rect
 * @returns {number}
 */
export function getRectWidth ({ width }) {
  return width
}

/**
 * Destructures the `height` field from a `Rect`
 *
 * @param {CenterCenterRect} rect
 * @returns {number}
 */
export function getRectHeight ({ height }) {
  return height
}

/**
 * Destructures the viewport `Rect` from a collection of `Rects`
 *
 * @param {CenterCenterRects} rects
 * @returns {CenterCenterRect}
 */
export function getViewportRect ({ viewport }) {
  return viewport
}

/**
 * Destructures the container `Rect` from a collection of `Rects`
 *
 * @param {CenterCenterRects} rects
 * @returns {CenterCenterRect}
 */
export function getContainerRect ({ container }) {
  return container
}

/**
 * Destructures the target `Rect` from a collection of `Rects`
 *
 * @param {CenterCenterRects} rects
 * @returns {CenterCenterRect}
 */
export function getTargetRect ({ target }) {
  return target
}

/**
 * Calculates the `x` coordinate of a `Rect`
 *
 * @param {CenterCenterRect} rect
 * @returns {number}
 */
export function calculateRectX ({ left: l, width: w }) {
  return (l + (w / 2))
}

/**
 * Calculates the `y` coordinate of a `Rect`
 *
 * @param {CenterCenterRect} rect
 * @returns {number}
 */
export function calculateRectY ({ top: t, height: h }) {
  return (t + (h / 2))
}

/**
 * Calculates the right-most boundary `x` coordinate of the target in the container
 *
 * The range is inclusive from left-most 0 to right-most boundary `x`
 *
 * @param {CenterCenterRects} rects
 * @returns {number}
 */
export function calculateBoundaryX (rects) {
  const containerW = getRectWidth(getContainerRect(rects))
  const targetW = getRectWidth(getTargetRect(rects))

  return (containerW - targetW)
}

/**
 * Calculates the bottom-most boundary `y` coordinate of the target in the container
 *
 * The range is inclusive from top-most 0 to bottom-most boundary `y`
 *
 * @param {CenterCenterRects} rects
 * @returns {number}
 */
export function calculateBoundaryY (rects) {
  const containerH = getRectHeight(getContainerRect(rects))
  const targetH = getRectHeight(getTargetRect(rects))

  return (containerH - targetH)
}

/**
 * Calculates the `x` coordinate of the container
 *
 * @param {CenterCenterRects} rects
 * @returns {number}
 */
export function calculateContainerX ({
  viewport: {
    left: viewportL,
    right: viewportR
  },
  container: {
    left: containerL,
    right: containerR
  }
}) {
  const l = Math.max(viewportL, containerL)
  const r = Math.min(viewportR, containerR)
  const w = (r - l)
  const x = (l - containerL)

  return (x + (w / 2))
}

/**
 * Calculates the `y` coordinate of the container
 *
 * @param {CenterCenterRects} rects
 * @returns {number}
 */
export function calculateContainerY ({
  viewport: {
    top: viewportT,
    bottom: viewportB
  },
  container: {
    top: containerT,
    bottom: containerB
  }
}) {
  const t = Math.max(viewportT, containerT)
  const b = Math.min(viewportB, containerB)
  const h = (b - t)
  const y = (t - containerT)

  return (y + (h / 2))
}

/**
 * Calculates the `x` coordinate of the target
 *
 * @param {CenterCenterRects} rects
 * @returns {number}
 */
export function calculateTargetX (rects) {
  const x = calculateContainerX(rects)
  const w = getRectWidth(getTargetRect(rects))

  return (x - (w / 2))
}

/**
 * Calculates the `y` coordinate of the target
 *
 * @param {CenterCenterRects} rects
 * @returns {number}
 */
export function calculateTargetY (rects) {
  const y = calculateContainerY(rects)
  const h = getRectHeight(getTargetRect(rects))

  return (y - (h / 2))
}
