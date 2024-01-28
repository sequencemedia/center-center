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
 * Gets the scroll position of the document `scrollingElement`
 *
 * @returns {{
 *  scrollLeft: number,
 *  scrollTop: number
 * }}
 */
export function getScrollingElement (): {
  scrollLeft: number
  scrollTop: number
}
/**
 * Gets a `Rect` for the viewport
 *
 * @returns {CenterCenterRect}
 */
export function getViewportRect (): CenterCenterRect
/**
 * Gets a `Rect` for a DOM element
 *
 * @param {Element} element
 * @returns {CenterCenterRect}
*/
export function getElementRect (element: Element): CenterCenterRect
/**
 * Gets `Rects` for the viewport as well as the container and target elements
 *
 * @param {Element} container
 * @param {Element} target
 * @returns {{
 *  viewport: CenterCenterRect,
 *  container: CenterCenterRect,
 *  target: CenterCenterRect
 * }}
 */
export function getRects (container: Element, target: Element): {
  viewport: CenterCenterRect
  container: CenterCenterRect
  target: CenterCenterRect
}
/**
 * Calculates the target `left` position
 *
 * @param {{
 *  viewport: CenterCenterRect,
 *  container: CenterCenterRect,
 *  target: CenterCenterRect
 * }}
 * @returns {number}
 */
export function calculateLeft ({ viewport: { left: viewportL, right: viewportR }, container: { width: containerW, left: containerL, right: containerR }, target: { width: targetW } }: {
  viewport: CenterCenterRect
  container: CenterCenterRect
  target: CenterCenterRect
}): number
/**
 * Calculates the target `top` position
 *
 * @param {{
 *  viewport: CenterCenterRect,
 *  container: CenterCenterRect,
 *  target: CenterCenterRect
 * }}
 * @returns {number}
 */
export function calculateTop ({ viewport: { top: viewportT, bottom: viewportB }, container: { height: containerH, top: containerT, bottom: containerB }, target: { height: targetH } }: {
  viewport: CenterCenterRect
  container: CenterCenterRect
  target: CenterCenterRect
}): number
/**
 * A Center Center `Rect`
 */
export interface CenterCenterRect {
  width: number
  height: number
  left: number
  top: number
  right: number
  bottom: number
}
// # sourceMappingURL=index.d.mts.map
