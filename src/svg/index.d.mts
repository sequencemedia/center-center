declare module '#center-center/svg' {
  import type {
    CenterCenterRects
  } from '#center-center/common'

  export function createRects (container: Element, target: SVGGraphicsElement): CenterCenterRects
  export function calculateX (rects: CenterCenterRects): number
  export function calculateX (rects: CenterCenterRects): number
}

declare module 'center-center/svg' {
  export * from '#center-center/svg'
}
