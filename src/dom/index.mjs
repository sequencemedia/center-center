/**
 *  @typedef {import('center-center/common').CenterCenterRects} CenterCenterRects
 */

import {
  calculateBoundaryX,
  calculateBoundaryY,
  calculateTargetX,
  calculateTargetY
} from '#center-center/common'

export {
  createDOMRects as createRects
} from '#center-center/common'

/**
 *  Calculates the target `left` position
 *
 *  @param {CenterCenterRects} rects
 *  @returns {number}
 */
export function calculateLeft (rects) {
  const boundary = calculateBoundaryX(rects)
  const x = calculateTargetX(rects)

  return (
    Math.max(0, Math.min(boundary, x))
  )
}

/**
 *  Calculates the target `top` position
 *
 *  @param {CenterCenterRects} rects
 *  @returns {number}
 */
export function calculateTop (rects) {
  const boundary = calculateBoundaryY(rects)
  const y = calculateTargetY(rects)

  return (
    Math.max(0, Math.min(boundary, y))
  )
}
