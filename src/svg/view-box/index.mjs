/**
 *  An `<svg />` is of type `Element`
 *
 *  Its children are of `SVGElement`
 */

import debug from 'debug'

const log = debug('center-center:view-box')

export const X = 0
export const Y = 1
export const W = 2
export const H = 3

/**
 * Transforms a string to a round number
 *
 * @param {string} s
 * @returns {number}
 */
function toRound (s) {
  return (
    Math.round(Number(s))
  )
}

/**
 * Get the number at position `H` for the SVG element `viewBox` attribute
 *
 * @param {Element} svg
 * @returns {number}
 */
export function getViewBoxXFor (svg) {
  return (
    getViewBoxX(getViewBox(svg))
  )
}

/**
 * Get the number at position `H` for the SVG element `viewBox` attribute
 *
 * @param {Element} svg
 * @returns {number}
 */
export function getViewBoxYFor (svg) {
  return (
    getViewBoxY(getViewBox(svg))
  )
}

/**
 * Get the number at position `H` for the SVG element `viewBox` attribute
 *
 * @param {Element} svg
 * @returns {number}
 */
export function getViewBoxWFor (svg) {
  return (
    getViewBoxW(getViewBox(svg))
  )
}

/**
 * Get the number at position `H` for the SVG element `viewBox` attribute
 *
 * @param {Element} svg
 * @returns {number}
 */
export function getViewBoxHFor (svg) {
  return (
    getViewBoxH(getViewBox(svg))
  )
}

/**
 * Get the number at position `X`
 *
 * @param {number[]}
 * @returns {number}
 */
export function getViewBoxX ({
  [X]: x = 0
}) {
  return x
}

/**
 * Get the number at position `Y`
 *
 * @param {number[]}
 * @returns {number}
 */
export function getViewBoxY ({ [Y]: y = 0 }) {
  return y
}

/**
 * Get the number at position `W`
 *
 * @param {number[]}
 * @returns {number}
 */
export function getViewBoxW ({ [W]: w = 0 }) {
  return w
}

/**
 * Get the number at position `H`
 *
 * @param {number[]}
 * @returns {number}
 */
export function getViewBoxH ({ [H]: h = 0 }) {
  return h
}

/**
 * Get an SVG element `viewBox` attribute as an array of numbers
 *
 * @param {Element} svg
 * @returns {number[]}
 */
export default function getViewBox (svg) {
  log('getViewBox')

  const viewBox = (
    svg
      .getAttribute('viewBox')
      .split(String.fromCodePoint(32))
      .map(toRound) // .map(Number).map(Math.round)
  )

  log(viewBox)

  return viewBox
}
