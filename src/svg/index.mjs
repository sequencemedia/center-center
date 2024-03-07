/**
 * @typedef {import('../common/index.mjs').CenterCenterRects} CenterCenterRects
 */

import {
  getTargetRect,
  calculateRectX,
  calculateRectY,
  calculateContainerX,
  calculateContainerY,
  getContainerRect,
  getRectWidth,
  getRectHeight
} from '#center-center/common'

export {
  createSVGRects as createRects
} from '#center-center/common'

/**
 * Calculates the target `x` position
 *
 * @param {CenterCenterRects} rects
 * @param {number | undefined} viewBoxW
 * @param {number | undefined} scale
 * @returns {number}
 */
export function calculateX (rects, viewBoxW = 0, scale = 1) {
  const targetX = calculateRectX(getTargetRect(rects))
  const containerX = calculateContainerX(rects)
  const w = getRectWidth(getContainerRect(rects))
  const ratio = (viewBoxW / w)

  return (
    targetX - ((containerX * ratio) / scale)
  )
}

/**
 * Calculates the target `y` position
 *
 * @param {CenterCenterRects} rects
 * @param {number | undefined} viewBoxH
 * @param {number | undefined} scale
 * @returns {number}
 */
export function calculateY (rects, viewBoxH = 0, scale = 1) {
  const targetY = calculateRectY(getTargetRect(rects))
  const containerY = calculateContainerY(rects)
  const h = getRectHeight(getContainerRect(rects))
  const ratio = (viewBoxH / h)

  return (
    targetY - ((containerY * ratio) / scale)
  )
}
