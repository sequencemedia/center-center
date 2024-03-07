import {
  expect
} from 'chai'

import {
  getRectLeft,
  getRectTop,
  getRectWidth,
  getRectHeight,
  getScrollingElement,
  createViewportRect,
  createDOMElementRect,
  createSVGElementRect,
  createDOMRects,
  createSVGRects,
  getViewportRect,
  getContainerRect,
  getTargetRect,
  calculateRectX,
  calculateRectY,
  calculateBoundaryX,
  calculateBoundaryY,
  calculateContainerX,
  calculateContainerY,
  calculateTargetX,
  calculateTargetY
} from '#center-center/common'

describe('`center-center/common`', () => {
  it('exports `getScrollingElement`', () => expect(getScrollingElement).to.be.a('function'))

  it('exports `createViewportRect`', () => expect(createViewportRect).to.be.a('function'))

  it('exports `createDOMElementRect`', () => expect(createDOMElementRect).to.be.a('function'))

  it('exports `createSVGElementRect`', () => expect(createSVGElementRect).to.be.a('function'))

  it('exports `createDOMRects`', () => expect(createDOMRects).to.be.a('function'))

  it('exports `createSVGRects`', () => expect(createSVGRects).to.be.a('function'))

  it('exports `getRectLeft`', () => expect(getRectLeft).to.be.a('function'))

  it('exports `getRectTop`', () => expect(getRectTop).to.be.a('function'))

  it('exports `getRectWidth`', () => expect(getRectWidth).to.be.a('function'))

  it('exports `getRectHeight`', () => expect(getRectHeight).to.be.a('function'))

  it('exports `getViewportRect`', () => expect(getViewportRect).to.be.a('function'))

  it('exports `getContainerRect`', () => expect(getContainerRect).to.be.a('function'))

  it('exports `getTargetRect`', () => expect(getTargetRect).to.be.a('function'))

  it('exports `calculateRectX`', () => expect(calculateRectX).to.be.a('function'))

  it('exports `calculateRectY`', () => expect(calculateRectY).to.be.a('function'))

  it('exports `calculateBoundaryX`', () => expect(calculateBoundaryX).to.be.a('function'))

  it('exports `calculateBoundaryY`', () => expect(calculateBoundaryY).to.be.a('function'))

  it('exports `calculateContainerX`', () => expect(calculateContainerX).to.be.a('function'))

  it('exports `calculateContainerY`', () => expect(calculateContainerY).to.be.a('function'))

  it('exports `calculateTargetX`', () => expect(calculateTargetX).to.be.a('function'))

  it('exports `calculateTargetY`', () => expect(calculateTargetY).to.be.a('function'))

  describe('`getScrollingElement()`', () => {
    beforeEach(() => {
      global.document = {}
    })

    afterEach(() => {
      delete global.document
    })

    describe('`scrollingElement` is defined', () => {
      describe('`scrollingElement` is null', () => {
        it('returns an object', () => {
          global.document = {
            scrollingElement: null
          }

          return (
            expect(getScrollingElement())
              .to.eql({
                scrollLeft: 0,
                scrollTop: 0
              })
          )
        })
      })

      describe('`scrollingElement` is an object', () => {
        it('returns an object', () => {
          global.document = {
            scrollingElement: {
              scrollLeft: 'MOCK SCROLL LEFT',
              scrollTop: 'MOCK SCROLL TOP'
            }
          }

          return (
            expect(getScrollingElement())
              .to.eql({
                scrollLeft: 'MOCK SCROLL LEFT',
                scrollTop: 'MOCK SCROLL TOP'
              })
          )
        })
      })
    })

    describe('`scrollingElement` is not defined', () => {
      it('returns an object', () => {
        return (
          expect(getScrollingElement())
            .to.eql({
              scrollLeft: 0,
              scrollTop: 0
            })
        )
      })
    })
  })

  describe('`createViewportRect()`', () => {
    beforeEach(() => {
      global.window = {
        innerWidth: 'MOCK INNER WIDTH',
        innerHeight: 'MOCK INNER HEIGHT'
      }

      global.document = {
        scrollingElement: {
          scrollLeft: 'MOCK SCROLL LEFT',
          scrollTop: 'MOCK SCROLL TOP'
        }
      }
    })

    afterEach(() => {
      delete global.window
      delete global.document
    })

    it('returns an object', () => expect(createViewportRect()).to.eql({
      top: 'MOCK SCROLL TOP',
      right: 'MOCK SCROLL LEFTMOCK INNER WIDTH',
      bottom: 'MOCK SCROLL TOPMOCK INNER HEIGHT',
      left: 'MOCK SCROLL LEFT',
      width: 'MOCK INNER WIDTH',
      height: 'MOCK INNER HEIGHT'
    }))
  })

  describe('`createDOMElementRect()`', () => {
    beforeEach(() => {
      global.document = {
        scrollingElement: {
          scrollLeft: 'MOCK SCROLL LEFT',
          scrollTop: 'MOCK SCROLL TOP'
        }
      }
    })

    afterEach(() => {
      delete global.document
    })

    const mockElement = {
      getBoundingClientRect () {
        return {
          x: 'MOCK ELEMENT X',
          y: 'MOCK ELEMENT Y',
          width: 'MOCK ELEMENT WIDTH',
          height: 'MOCK ELEMENT HEIGHT'
        }
      }
    }

    it('returns an object', () => {
      return (
        expect(createDOMElementRect(mockElement))
          .to.eql({
            left: 'MOCK SCROLL LEFTMOCK ELEMENT X',
            top: 'MOCK SCROLL TOPMOCK ELEMENT Y',
            width: 'MOCK ELEMENT WIDTH',
            height: 'MOCK ELEMENT HEIGHT',
            right: 'MOCK SCROLL LEFTMOCK ELEMENT XMOCK ELEMENT WIDTH',
            bottom: 'MOCK SCROLL TOPMOCK ELEMENT YMOCK ELEMENT HEIGHT'
          })
      )
    })
  })

  describe('`createSVGElementRect()`', () => {
    const mockElement = {
      getBBox () {
        return {
          x: 'MOCK ELEMENT X',
          y: 'MOCK ELEMENT Y',
          width: 'MOCK ELEMENT WIDTH',
          height: 'MOCK ELEMENT HEIGHT'
        }
      }
    }

    it('returns an object', () => {
      return (
        expect(createSVGElementRect(mockElement))
          .to.eql({
            left: 'MOCK ELEMENT X',
            top: 'MOCK ELEMENT Y',
            width: 'MOCK ELEMENT WIDTH',
            height: 'MOCK ELEMENT HEIGHT',
            right: 'MOCK ELEMENT XMOCK ELEMENT WIDTH',
            bottom: 'MOCK ELEMENT YMOCK ELEMENT HEIGHT'
          })
      )
    })
  })

  describe('`createSVGRects()`', () => {
    const mockContainer = {
      getBoundingClientRect () {
        return {
          x: 'MOCK CONTAINER X',
          y: 'MOCK CONTAINER Y',
          width: 'MOCK CONTAINER WIDTH',
          height: 'MOCK CONTAINER HEIGHT'
        }
      }
    }

    const mockTarget = {
      getBBox () {
        return {
          x: 'MOCK TARGET X',
          y: 'MOCK TARGET Y',
          width: 'MOCK TARGET WIDTH',
          height: 'MOCK TARGET HEIGHT'
        }
      }
    }

    beforeEach(() => {
      global.window = {
        innerWidth: 'MOCK INNER WIDTH',
        innerHeight: 'MOCK INNER HEIGHT'
      }

      global.document = {
        scrollingElement: {
          scrollLeft: 'MOCK SCROLL LEFT',
          scrollTop: 'MOCK SCROLL TOP'
        }
      }
    })

    afterEach(() => {
      delete global.window
      delete global.document
    })

    it('returns an object', () => {
      return (
        expect(createSVGRects(mockContainer, mockTarget))
          .to.eql({
            viewport: {
              top: 'MOCK SCROLL TOP',
              right: 'MOCK SCROLL LEFTMOCK INNER WIDTH',
              bottom: 'MOCK SCROLL TOPMOCK INNER HEIGHT',
              left: 'MOCK SCROLL LEFT',
              width: 'MOCK INNER WIDTH',
              height: 'MOCK INNER HEIGHT'
            },
            container: {
              left: 'MOCK SCROLL LEFTMOCK CONTAINER X',
              top: 'MOCK SCROLL TOPMOCK CONTAINER Y',
              width: 'MOCK CONTAINER WIDTH',
              height: 'MOCK CONTAINER HEIGHT',
              right: 'MOCK SCROLL LEFTMOCK CONTAINER XMOCK CONTAINER WIDTH',
              bottom: 'MOCK SCROLL TOPMOCK CONTAINER YMOCK CONTAINER HEIGHT'
            },
            target: {
              left: 'MOCK TARGET X',
              top: 'MOCK TARGET Y',
              width: 'MOCK TARGET WIDTH',
              height: 'MOCK TARGET HEIGHT',
              right: 'MOCK TARGET XMOCK TARGET WIDTH',
              bottom: 'MOCK TARGET YMOCK TARGET HEIGHT'
            }
          })
      )
    })
  })

  describe('`createDOMRects()`', () => {
    const mockContainer = {
      getBoundingClientRect () {
        return {
          x: 'MOCK CONTAINER X',
          y: 'MOCK CONTAINER Y',
          width: 'MOCK CONTAINER WIDTH',
          height: 'MOCK CONTAINER HEIGHT'
        }
      }
    }

    const mockTarget = {
      getBoundingClientRect () {
        return {
          x: 'MOCK TARGET X',
          y: 'MOCK TARGET Y',
          width: 'MOCK TARGET WIDTH',
          height: 'MOCK TARGET HEIGHT'
        }
      }
    }

    beforeEach(() => {
      global.window = {
        innerWidth: 'MOCK INNER WIDTH',
        innerHeight: 'MOCK INNER HEIGHT'
      }

      global.document = {
        scrollingElement: {
          scrollLeft: 'MOCK SCROLL LEFT',
          scrollTop: 'MOCK SCROLL TOP'
        }
      }
    })

    afterEach(() => {
      delete global.window
      delete global.document
    })

    it('returns an object', () => {
      return (
        expect(createDOMRects(mockContainer, mockTarget))
          .to.eql({
            viewport: {
              top: 'MOCK SCROLL TOP',
              right: 'MOCK SCROLL LEFTMOCK INNER WIDTH',
              bottom: 'MOCK SCROLL TOPMOCK INNER HEIGHT',
              left: 'MOCK SCROLL LEFT',
              width: 'MOCK INNER WIDTH',
              height: 'MOCK INNER HEIGHT'
            },
            container: {
              left: 'MOCK SCROLL LEFTMOCK CONTAINER X',
              top: 'MOCK SCROLL TOPMOCK CONTAINER Y',
              width: 'MOCK CONTAINER WIDTH',
              height: 'MOCK CONTAINER HEIGHT',
              right: 'MOCK SCROLL LEFTMOCK CONTAINER XMOCK CONTAINER WIDTH',
              bottom: 'MOCK SCROLL TOPMOCK CONTAINER YMOCK CONTAINER HEIGHT'
            },
            target: {
              left: 'MOCK SCROLL LEFTMOCK TARGET X',
              top: 'MOCK SCROLL TOPMOCK TARGET Y',
              width: 'MOCK TARGET WIDTH',
              height: 'MOCK TARGET HEIGHT',
              right: 'MOCK SCROLL LEFTMOCK TARGET XMOCK TARGET WIDTH',
              bottom: 'MOCK SCROLL TOPMOCK TARGET YMOCK TARGET HEIGHT'
            }
          })
      )
    })
  })
})
