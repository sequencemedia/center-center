declare module '#center-center' {
  export type {
    ScrollingElement,
    CenterCenterRects,
    CenterCenterRect
  } from '#center-center/common'

  export {
    createRects,
    calculateLeft,
    calculateTop
  } from '#center-center/dom'
}

declare module 'center-center' {
  export * from '#center-center'
}
