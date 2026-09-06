declare module '#center-center/svg' {
  import type {
    CenterCenterRects
  } from '#center-center/common'

  export function createRects (container: Element, target: SVGGraphicsElement): CenterCenterRects
  export function calculateX (rects: CenterCenterRects, viewBoxW?: number, scale?: number): number
  export function calculateY (rects: CenterCenterRects, viewBoxW?: number, scale?: number): number
}

declare module 'center-center/svg' {
  export * from '#center-center/svg'
}
