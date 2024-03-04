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
    left,
    top,
    width,
    height,
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
    scrollLeft: l,
    scrollTop: t
  } = getScrollingElement()

  const {
    x,
    y,
    width,
    height
  } = element.getBoundingClientRect()

  const left = l + x
  const top = t + y

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
    left: containerL,
    width: containerW,
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
    top: containerT,
    height: containerH,
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
