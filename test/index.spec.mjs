import {
  expect
} from 'chai'

import {
  createRects,
  calculateLeft,
  calculateTop
} from '#center-center'

describe('`center-center`', () => {
  /*
  class MockElement {
    getBoundingClientRect () {
      return {}
    }
  }

  class MockSVGElement extends MockElement {
    getBBox () {
      return {}
    }
  }

  beforeEach(() => {
    global.Element = MockElement
    global.SVGElement = MockSVGElement
  })

  afterEach(() => {
    delete global.Element
    delete global.SVGElement
  })
  */

  it('exports `createRects`', () => expect(createRects).to.be.a('function'))

  it('exports `calculateLeft`', () => expect(calculateLeft).to.be.a('function'))

  it('exports `calculateTop`', () => expect(calculateTop).to.be.a('function'))
})
