declare module '#center-center/dom' {
  import type {
    CenterCenterRects
  } from '#center-center/common'

  export function createRects (container: Element, target: Element): CenterCenterRects
  export function calculateLeft (rects: CenterCenterRects): number
  export function calculateTop (rects: CenterCenterRects): number
}

declare module 'center-center/dom' {
  export * from '#center-center/dom'
}
