import {
  expect
} from 'chai'

import {
  getParentElementForOffsetLeft,
  getParentElementForOffsetTop,
  getLeft,
  getTop,
  getScrollingElement,
  getViewportRect,
  getSVGElementRect,
  getDOMElementRect,
  getElementRect,
  getDOMRects,
  getSVGRects,
  getRects,
  calculateLeft,
  calculateTop
} from '#center-center'

describe('`center-center`', () => {
  it('exports `getParentElementForOffsetLeft`', () => expect(getParentElementForOffsetLeft).to.be.a('function'))

  it('exports `getParentElementForOffsetTop`', () => expect(getParentElementForOffsetTop).to.be.a('function'))

  it('exports `getLeft`', () => expect(getLeft).to.be.a('function'))

  it('exports `getTop`', () => expect(getTop).to.be.a('function'))

  it('exports `getScrollingElement`', () => expect(getScrollingElement).to.be.a('function'))

  it('exports `getViewportRect`', () => expect(getViewportRect).to.be.a('function'))

  it('exports `getElementRect`', () => expect(getElementRect).to.be.a('function'))

  it('exports `getRects`', () => expect(getRects).to.be.a('function'))

  it('exports `calculateLeft`', () => expect(calculateLeft).to.be.a('function'))

  it('exports `calculateTop`', () => expect(calculateTop).to.be.a('function'))

  describe('`getParentElementForOffsetLeft()`', () => {
    const mockParentElement = {
      offsetLeft: 'MOCK OFFSET LEFT'
    }

    const mockElement = {
      parentElement: mockParentElement
    }

    it('returns an element', () => {
      return (
        expect(getParentElementForOffsetLeft(mockElement))
          .to.equal(mockParentElement)
      )
    })
  })

  describe('`getParentElementForOffsetTop()`', () => {
    const mockParentElement = {
      offsetTop: 'MOCK OFFSET TOP'
    }

    const mockElement = {
      parentElement: mockParentElement
    }

    it('returns an element', () => {
      return (
        expect(getParentElementForOffsetTop(mockElement))
          .to.equal(mockParentElement)
      )
    })
  })

  describe('`getLeft()`', () => {
    describe('Element has `offsetLeft`', () => {
      const mockElement = {
        offsetLeft: 4
      }

      it('returns a number', () => {
        return (
          expect(getLeft(mockElement))
            .to.equal(4)
        )
      })
    })

    describe('Element does not have `offsetLeft`', () => {
      const mockElement = {
        parentElement: {
          offsetLeft: 6
        },
        getBoundingClientRect () {
          return {
            left: 2
          }
        }
      }

      it('returns a number', () => {
        return (
          expect(getLeft(mockElement))
            .to.equal(4)
        )
      })
    })
  })

  describe('`getTop()`', () => {
    describe('Element has `offsetTop`', () => {
      const mockElement = {
        offsetTop: 4
      }

      it('returns a number', () => {
        return (
          expect(getTop(mockElement))
            .to.equal(4)
        )
      })
    })

    describe('Element does not have `offsetTop`', () => {
      const mockElement = {
        parentElement: {
          offsetTop: 6
        },
        getBoundingClientRect () {
          return {
            top: 2
          }
        }
      }

      it('returns a number', () => {
        return (
          expect(getTop(mockElement))
            .to.equal(4)
        )
      })
    })
  })

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

  describe('`getViewportRect()`', () => {
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

    it('returns an object', () => expect(getViewportRect()).to.eql({
      top: 'MOCK SCROLL TOP',
      right: 'MOCK SCROLL LEFTMOCK INNER WIDTH',
      bottom: 'MOCK SCROLL TOPMOCK INNER HEIGHT',
      left: 'MOCK SCROLL LEFT',
      width: 'MOCK INNER WIDTH',
      height: 'MOCK INNER HEIGHT'
    }))
  })

  describe('`getDOMElementRect()`', () => {
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
        expect(getDOMElementRect(mockElement))
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

  describe('`getSVGElementRect()`', () => {
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
        expect(getSVGElementRect(mockElement))
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

  describe('`getElementRect()`', () => {
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
        expect(getElementRect(mockElement))
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

  describe('`getSVGRects()`', () => {
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
        expect(getSVGRects(mockContainer, mockTarget))
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

  describe('`getDOMRects()`', () => {
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
        expect(getDOMRects(mockContainer, mockTarget))
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

  describe('`getRects()`', () => {
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
        expect(getRects(mockContainer, mockTarget))
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

  describe('Container is shorter than the Window', () => {
    const rects = {
      viewport: {
        top: 0,
        right: 1440,
        bottom: 900,
        left: 0,
        width: 1440,
        height: 900
      },
      container: {
        x: 0,
        y: 90,
        top: 90,
        right: 1440,
        bottom: 810,
        left: 0,
        width: 1440,
        height: 720
      },
      target: {
        width: 50,
        height: 50
      }
    }

    describe('`calculateLeft()`', () => {
      /**
       *  Window is 1440 x 900
       *  Header is 1440 x 90
       *  Container is 1440 x 720
       *  Footer is 1440 x 90
       *  Target is 50 x 50
       */
      it('returns a number', () => {
        /**
         *  (1440 / 2) - (50 / 2)
         */
        return (
          expect(calculateLeft(rects))
            .to.equal(695)
        )
      })
    })

    describe('`calculateTop()`', () => {
      /**
       *  Window is 1440 x 900
       *  Header is 1440 x 90
       *  Container is 1440 x 720
       *  Footer is 1440 x 90
       *  Target is 50 x 50
       */
      it('returns a number', () => {
        /**
         *  (720 / 2) - (50 / 2)
         */
        return (
          expect(calculateTop(rects))
            .to.equal(335)
        )
      })
    })
  })

  describe('Container is taller than the Window', () => {
    const rects = {
      viewport: {
        top: 0,
        right: 1440,
        bottom: 900,
        left: 0,
        width: 1440,
        height: 900
      },
      container: {
        x: 0,
        y: 90,
        top: 90,
        right: 1440,
        bottom: 1080,
        left: 0,
        width: 1440,
        height: 990
      },
      target: {
        width: 50,
        height: 50
      }
    }

    describe('`calculateLeft()`', () => {
      /**
       *  Window is 1440 x 900
       *  Header is 1440 x 90
       *  Container is 1440 x 990
       *  Footer is 1440 x 90
       *  Target is 50 x 50
       */
      it('returns a number', () => {
        /**
         *  (1440 / 2) - (50 / 2)
         */
        return (
          expect(calculateLeft(rects))
            .to.equal(695)
        )
      })
    })

    describe('`calculateTop()`', () => {
      /**
       *  Window is 1440 x 900
       *  Header is 1440 x 90
       *  Container is 1440 x 990
       *  Footer is 1440 x 90
       *  Target is 50 x 50
       */
      it('returns a number', () => {
        /**
         *  (810 / 2) - (50 / 2)
         */
        return (
          expect(calculateTop(rects))
            .to.equal(380)
        )
      })
    })
  })
})
