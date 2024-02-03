/**
 * @typedef {import('.').ScrollingElement} ScrollingElement
 * @typedef {import('.').CenterCenterRect} CenterCenterRect
 * @typedef {import('.').CenterCenterRects} CenterCenterRects
 */

const elementMap = new WeakMap()

/**
 * Gets a parent element with `offsetLeft` and `offsetTop`
 *
 * @param {SVGElement} element
 * @returns {Element}
 */
export function getOffsetParentElement (element) {
  let parentElement = element.parentElement

  while (!Reflect.has(parentElement, 'offsetLeft') && !Reflect.has(parentElement, 'offsetTop')) {
    parentElement = parentElement.parentElement
  }

  return parentElement
}

/**
 * Gets the `offsetLeft` from the element or calculates it with
 * DOMRect `left` and the nearest `offsetLeft` from a parent
 *
 * @param {Element | SVGElement} element
 * @returns {number}
 */
export function getOffsetLeft (element) {
  if (Reflect.has(element, 'offsetLeft')) {
    return (
      Reflect.get(element, 'offsetLeft')
    )
  }

  const {
    left
  } = element.getBoundingClientRect()

  if (!elementMap.has(element)) elementMap.set(element, getOffsetParentElement(element))
  const {
    offsetLeft = 0
  } = elementMap.get(element)

  return (
    offsetLeft - left
  )
}

/**
 * Gets the `offsetTop` from the element or calculates it with
 * DOMRect `top` and the nearest `offsetTop` from a parent
 *
 * @param {Element | SVGElement} element
 * @returns {number}
 */
export function getOffsetTop (element) {
  if (Reflect.has(element, 'offsetTop')) {
    return (
      Reflect.get(element, 'offsetTop')
    )
  }

  const {
    top
  } = element.getBoundingClientRect()

  if (!elementMap.has(element)) elementMap.set(element, getOffsetParentElement(element))
  const {
    offsetTop = 0
  } = elementMap.get(element)

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
    width,
    height
  } = element.getBoundingClientRect()

  const offsetLeft = getOffsetLeft(element)
  const offsetTop = getOffsetTop(element)

  return {
    width,
    height,
    left: offsetLeft,
    top: offsetTop,
    right: (offsetLeft + width),
    bottom: (offsetTop + height)
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
