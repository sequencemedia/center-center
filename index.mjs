/**
 * A Center Center `Rect`
 *
 * @typedef {{
 *    width: number,
 *    height: number,
 *    left: number,
 *    top: number,
 *    right: number,
 *    bottom: number
 *  }} CenterCenterRect
 */

/**
 * Center Center `Rects`
 *
 * @typedef {{
 *  viewport: CenterCenterRect,
 *  container: CenterCenterRect,
 *  target: CenterCenterRect
 * }} CenterCenterRects
 */

/**
 * Gets the scroll position of the document `scrollingElement`
 *
 * @returns {{
 *  scrollLeft: number,
 *  scrollTop: number
 * }}
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
 * Gets a `Rect` for the viewport
 *
 * @returns {CenterCenterRect}
 */
export function getViewportRect () {
  const {
    innerWidth: width,
    innerHeight: height
  } = window

  const {
    scrollLeft: left,
    scrollTop: top
  } = getScrollingElement()

  return {
    width,
    height,
    left,
    top,
    right: (left + width),
    bottom: (top + height)
  }
}

/**
 * Gets a `Rect` for a DOM element
 *
 * @param {Element} element
 * @returns {CenterCenterRect}
*/
export function getElementRect (element) {
  const {
    offsetWidth: width,
    offsetHeight: height,
    offsetLeft: left,
    offsetTop: top
  } = element

  return {
    width,
    height,
    left,
    top,
    right: (left + width),
    bottom: (top + height)
  }
}

/**
 * Gets `Rects` for the viewport as well as the container and target elements
 *
 * @param {Element} container
 * @param {Element} target
 * @returns {CenterCenterRects}
 */
export function getRects (container, target) {
  return {
    viewport: getViewportRect(),
    container: getElementRect(container),
    target: getElementRect(target)
  }
}

/**
 * Calculates the target `left` position
 *
 * @param {CenterCenterRects}
 * @returns {number}
 */
export function calculateLeft ({
  viewport: {
    left: viewportL,
    right: viewportR
  },
  container: {
    width: containerW,
    left: containerL,
    right: containerR
  },
  target: {
    width: targetW
  }
}) {
  const l = Math.max(viewportL, containerL)
  const r = Math.min(viewportR, containerR)
  const w = (r - l)
  const x = (l - containerL)
  const boundary = (containerW - targetW)

  return (
    Math.max(0, Math.min(boundary, x + ((w / 2) - (targetW / 2))))
  )
}

/**
 * Calculates the target `top` position
 *
 * @param {CenterCenterRects}
 * @returns {number}
 */
export function calculateTop ({
  viewport: {
    top: viewportT,
    bottom: viewportB
  },
  container: {
    height: containerH,
    top: containerT,
    bottom: containerB
  },
  target: {
    height: targetH
  }
}) {
  const t = Math.max(viewportT, containerT)
  const b = Math.min(viewportB, containerB)
  const h = (b - t)
  const y = (t - containerT)
  const boundary = (containerH - targetH)

  return (
    Math.max(0, Math.min(boundary, y + ((h / 2) - (targetH / 2))))
  )
}
