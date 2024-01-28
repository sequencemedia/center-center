export function getScrollingElement (): {
  scrollLeft: number
  scrollTop: number
}
export function getViewportRect (): CenterCenterRect
export function getElementRect (element: Element): CenterCenterRect
export function getRects (container: Element, target: Element): CenterCenterRects
export function calculateLeft ({ viewport: { left: viewportL, right: viewportR }, container: { width: containerW, left: containerL, right: containerR }, target: { width: targetW } }: CenterCenterRects): number
export function calculateTop ({ viewport: { top: viewportT, bottom: viewportB }, container: { height: containerH, top: containerT, bottom: containerB }, target: { height: targetH } }: CenterCenterRects): number
export interface CenterCenterRect {
  width: number
  height: number
  left: number
  top: number
  right: number
  bottom: number
}
export interface CenterCenterRects {
  viewport: CenterCenterRect
  container: CenterCenterRect
  target: CenterCenterRect
}
// # sourceMappingURL=index.d.mts.map
