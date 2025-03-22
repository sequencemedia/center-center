/**
 *  An `<svg />` is of type `Element`
 *
 *  Its children are of type `SVGElement`
 */

import debug from 'debug'

const log = debug('center-center:svg:view-box')

export const X = 0
export const Y = 1
export const W = 2
export const H = 3

/**
 *  Transforms a string to a round number
 *
 *  @param {string} s
 *  @returns {number}
 */
function toRound (s) {
  return (
    Math.round(Number(s))
  )
}

/**
 *  Get the number at position `H` for the SVG element `viewBox` attribute
 *
 *  @param {Element} svg
 *  @returns {number}
 */
export function getXFor (svg) {
  return (
    getX(getViewBox(svg))
  )
}

/**
 *  Get the number at position `H` for the SVG element `viewBox` attribute
 *
 *  @param {Element} svg
 *  @returns {number}
 */
export function getYFor (svg) {
  return (
    getY(getViewBox(svg))
  )
}

/**
 *  Get the number at position `H` for the SVG element `viewBox` attribute
 *
 *  @param {Element} svg
 *  @returns {number}
 */
export function getWFor (svg) {
  return (
    getW(getViewBox(svg))
  )
}

/**
 *  Get the number at position `H` for the SVG element `viewBox` attribute
 *
 *  @param {Element} svg
 *  @returns {number}
 */
export function getHFor (svg) {
  return (
    getH(getViewBox(svg))
  )
}

/**
 *  Get the number at position `X`
 *
 *  @param {number[]}
 *  @returns {number}
 */
export function getX ({ [X]: x = 0 }) {
  return x
}

/**
 *  Get the number at position `Y`
 *
 *  @param {number[]}
 *  @returns {number}
 */
export function getY ({ [Y]: y = 0 }) {
  return y
}

/**
 *  Get the number at position `W`
 *
 *  @param {number[]}
 *  @returns {number}
 */
export function getW ({ [W]: w = 0 }) {
  return w
}

/**
 *  Get the number at position `H`
 *
 *  @param {number[]}
 *  @returns {number}
 */
export function getH ({ [H]: h = 0 }) {
  return h
}

/**
 *  Get an SVG element `viewBox` attribute as an array of numbers
 *
 *  @param {Element} svg
 *  @returns {number[]}
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
