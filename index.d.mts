export function getParentElementForOffsetLeft (element: SVGElement): Element
export function getParentElementForOffsetTop (element: SVGElement): Element
export function getLeft (element: Element | SVGElement): number
export function getTop (element: Element | SVGElement): number
export function getScrollingElement (): ScrollingElement
export function getViewportRect (): CenterCenterRect
export function getElementRect (element: Element | SVGElement): CenterCenterRect
export function getRects (container: Element, target: Element | SVGElement): CenterCenterRects
export function calculateLeft (rects: CenterCenterRects): number
export function calculateTop (rects: CenterCenterRects): number

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
  left: number
  top: number
  width: number
  height: number
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
