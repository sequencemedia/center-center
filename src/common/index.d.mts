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

export function getScrollingElement (): ScrollingElement

export function createViewportRect (): CenterCenterRect
export function createDOMElementRect (element: Element): CenterCenterRect
export function createSVGElementRect (element: SVGElement): CenterCenterRect
export function createDOMRects (container: Element, target: Element): CenterCenterRect
export function createSVGRects (container: Element, target: SVGElement): CenterCenterRect

export function getRectLeft (rect: CenterCenterRect): number
export function getRectTop (rect: CenterCenterRect): number
export function getRectWidth (rect: CenterCenterRect): number
export function getRectHeight (rect: CenterCenterRect): number

export function getViewportRect (rects: CenterCenterRects): CenterCenterRect
export function getContainerRect (rects: CenterCenterRects): CenterCenterRect
export function getTargetRect (rects: CenterCenterRects): CenterCenterRect

export function calculateRectX (rect: CenterCenterRect): number
export function calculateRectY (rect: CenterCenterRect): number

export function calculateBoundaryX (rects: CenterCenterRects): number
export function calculateBoundaryY (rects: CenterCenterRects): number

export function calculateContainerX (rects: CenterCenterRects): number
export function calculateContainerY (rects: CenterCenterRects): number

export function calculateTargetX (rects: CenterCenterRects): number
export function calculateTargetY (rects: CenterCenterRects): number
