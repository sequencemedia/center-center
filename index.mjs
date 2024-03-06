/**
 * @typedef {import('.').ScrollingElement} ScrollingElement
 * @typedef {import('.').CenterCenterRect} CenterCenterRect
 * @typedef {import('.').CenterCenterRects} CenterCenterRects
 */

const leftMap = new WeakMap()
const topMap = new WeakMap()

/**
 * Gets a parent element with `offsetLeft`
 *
 * @param {SVGElement} element
 * @returns {Element}
 */
export function getParentElementForOffsetLeft (element) {
  let parentElement = element.parentElement

  while (!Reflect.has(parentElement, 'offsetLeft')) {
    parentElement = parentElement.parentElement
  }

  return parentElement
}

/**
 * Gets a parent element with `offsetTop`
 *
 * @param {SVGElement} element
 * @returns {Element}
 */
export function getParentElementForOffsetTop (element) {
  let parentElement = element.parentElement

  while (!Reflect.has(parentElement, 'offsetTop')) {
    parentElement = parentElement.parentElement
  }

  return parentElement
}

/**
 * Gets the `offsetLeft` from the element or calculates the equivalent with
 * DOMRect `left` and the nearest `offsetLeft` from a parent
 *
 * @param {Element | SVGElement} element
 * @returns {number}
 */
export function getLeft (element) {
  if (Reflect.has(element, 'offsetLeft')) {
    return (
      Reflect.get(element, 'offsetLeft')
    )
  }

  if (!leftMap.has(element)) leftMap.set(element, getParentElementForOffsetLeft(element))
  const {
    offsetLeft = 0
  } = leftMap.get(element)

  const {
    left
  } = element.getBoundingClientRect()

  return (
    offsetLeft - left
  )
}

/**
 * Gets the `offsetTop` from the element or calculates the equivalent with
 * DOMRect `top` and the nearest `offsetTop` from a parent
 *
 * @param {Element | SVGElement} element
 * @returns {number}
 */
export function getTop (element) {
  if (Reflect.has(element, 'offsetTop')) {
    return (
      Reflect.get(element, 'offsetTop')
    )
  }

  const {
    top
  } = element.getBoundingClientRect()

  if (!topMap.has(element)) topMap.set(element, getParentElementForOffsetTop(element))
  const {
    offsetTop = 0
  } = topMap.get(element)

  return (
    offsetTop - top
  )
}

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
 * Destructures the `left` field from a `Rect`
 *
 * @param {CenterCenterRect}
 * @returns {number}
 */
export function getRectLeft ({ left }) {
  return left
}

/**
 * Destructures the `top` field from a `Rect`
 *
 * @param {CenterCenterRect}
 * @returns {number}
 */
export function getRectTop ({ top }) {
  return top
}

/**
 * Destructures the `width` field from a `Rect`
 *
 * @param {CenterCenterRect}
 * @returns {number}
 */
export function getRectWidth ({ width }) {
  return width
}

/**
 * Destructures the `height` field from a `Rect`
 *
 * @param {CenterCenterRect}
 * @returns {number}
 */
export function getRectHeight ({ height }) {
  return height
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
 * Creates a `Rect` for an SVG element
 *
 * @param {Element} element
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
 * Creates a `Rect` for a DOM element
 *
 * @param {Element} element
 * @returns {CenterCenterRect}
*/
export function createElementRect (element) {
  return (
    createDOMElementRect(element)
  )
}

/**
 * Creates `Rects` for the viewport as well as the DOM container and DOM target elements
 *
 * @param {Element} container
 * @param {Element} target
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
 * Creates `Rects` for the viewport as well as the DOM container and DOM target elements
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
 * Creates `Rects` for the viewport as well as the container and target elements
 *
 * @param {Element} container
 * @param {Element} target
 * @returns {CenterCenterRects}
 */
export function createRects (container, target) {
  return (
    createDOMRects(container, target)
  )
}

/**
 * Calculates the boundary `x` coordinate of the target in the container
 *
 * @param {CenterCenterRects}
 * @returns {number}
 */
export function calculateBoundaryX (rects) {
  const containerW = getRectWidth(getContainerRect(rects))
  const targetW = getRectWidth(getTargetRect(rects))

  return (containerW - targetW)
}

/**
 * Calculates the boundary `y` coordinate of the target in the container
 *
 * @param {CenterCenterRects}
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
 * @param {CenterCenterRects}
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
 * @param {CenterCenterRects}
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
 * @param {CenterCenterRects}
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
 * @param {CenterCenterRects}
 * @returns {number}
 */
export function calculateTargetY (rects) {
  const y = calculateContainerY(rects)
  const h = getRectHeight(getTargetRect(rects))

  return (y - (h / 2))
}

/**
 * Destructures the viewport `Rect`
 *
 * @param {CenterCenterRects}
 * @returns {CenterCenterRect}
 */
export function getViewportRect ({ viewport }) {
  return viewport
}

/**
 * Destructures the container `Rect`
 *
 * @param {CenterCenterRects}
 * @returns {CenterCenterRect}
 */
export function getContainerRect ({ container }) {
  return container
}

/**
 * Destructures the target `Rect`
 *
 * @param {CenterCenterRects}
 * @returns {CenterCenterRect}
 */
export function getTargetRect ({ target }) {
  return target
}

/**
 * Calculates the target `left` position
 *
 * @param {CenterCenterRects}
 * @returns {number}
 */
export function calculateLeft (rects) {
  const boundary = calculateBoundaryX(rects)
  const x = calculateTargetX(rects)

  return (
    Math.max(0, Math.min(boundary, x))
  )
}

/**
 * Calculates the target `top` position
 *
 * @param {CenterCenterRects}
 * @returns {number}
 */
export function calculateTop (rects) {
  const boundary = calculateBoundaryY(rects)
  const y = calculateTargetY(rects)

  return (
    Math.max(0, Math.min(boundary, y))
  )
}
