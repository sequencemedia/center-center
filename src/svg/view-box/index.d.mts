declare module 'center-center/svg/view-box' {
  export const X: number
  export const Y: number
  export const W: number
  export const H: number

  export function getXFor (svg: Element): number
  export function getYFor (svg: Element): number
  export function getWFor (svg: Element): number
  export function getHFor (svg: Element): number

  export function getX (viewBox: number[]): number
  export function getY (viewBox: number[]): number
  export function getW (viewBox: number[]): number
  export function getH (viewBox: number[]): number

  export default function getViewBox (svg: Element): number[]
}
