export function getOffsetParentElement (element: SVGElement): Element
export function getOffsetLeft (): number
export function getOffsetTop (): number
export function getScrollingElement (): ScrollingElement
export function getViewportRect (): CenterCenterRect
export function getElementRect (element: Element): CenterCenterRect
export function getRects (container: Element, target: Element): CenterCenterRects
export function calculateLeft ({ viewport: { left: viewportL, right: viewportR }, container: { width: containerW, left: containerL, right: containerR }, target: { width: targetW } }: CenterCenterRects): number
export function calculateTop ({ viewport: { top: viewportT, bottom: viewportB }, container: { height: containerH, top: containerT, bottom: containerB }, target: { height: targetH } }: CenterCenterRects): number

/**
 *  The document `scrollingElement`
 */
export interface ScrollingElement {
  scrollLeft: number
  scrollTop: number
}

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

/**
 * Center Center `Rects`
 */
export interface CenterCenterRects {
  viewport: CenterCenterRect
  container: CenterCenterRect
  target: CenterCenterRect
}
