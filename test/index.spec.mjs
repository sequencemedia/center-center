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
  getElementRect,
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

  describe('`getElementRect()`', () => {
    describe('Element has `offsetLeft`', () => {
      const mockElement = {
        offsetLeft: 'MOCK OFFSET LEFT',
        offsetTop: 'MOCK OFFSET TOP',
        offsetWidth: 'MOCK OFFSET WIDTH',
        offsetHeight: 'MOCK OFFSET HEIGHT',
        parentElement: {
          offsetLeft: 'MOCK PARENT ELEMENT OFFSET LEFT',
          offsetTop: 'MOCK PARENT ELEMENT OFFSET TOP'
        },
        getBoundingClientRect () {
          return {
            width: 'MOCK WIDTH',
            height: 'MOCK HEIGHT',
            left: 2,
            top: 2
          }
        }
      }

      it('returns an object', () => {
        return (
          expect(getElementRect(mockElement))
            .to.eql({
              left: 'MOCK OFFSET LEFT',
              top: 'MOCK OFFSET TOP',
              width: 'MOCK WIDTH',
              height: 'MOCK HEIGHT',
              right: 'MOCK OFFSET LEFTMOCK WIDTH',
              bottom: 'MOCK OFFSET TOPMOCK HEIGHT'
            })
        )
      })
    })

    describe('Element has `offsetTop`', () => {
      const mockElement = {
        offsetLeft: 'MOCK OFFSET LEFT',
        offsetTop: 'MOCK OFFSET TOP',
        offsetWidth: 'MOCK OFFSET WIDTH',
        offsetHeight: 'MOCK OFFSET HEIGHT',
        parentElement: {
          offsetLeft: 'MOCK PARENT ELEMENT OFFSET LEFT',
          offsetTop: 'MOCK PARENT ELEMENT OFFSET TOP'
        },
        getBoundingClientRect () {
          return {
            width: 'MOCK WIDTH',
            height: 'MOCK HEIGHT',
            left: 2,
            top: 2
          }
        }
      }

      it('returns an object', () => {
        return (
          expect(getElementRect(mockElement))
            .to.eql({
              left: 'MOCK OFFSET LEFT',
              top: 'MOCK OFFSET TOP',
              width: 'MOCK WIDTH',
              height: 'MOCK HEIGHT',
              right: 'MOCK OFFSET LEFTMOCK WIDTH',
              bottom: 'MOCK OFFSET TOPMOCK HEIGHT'
            })
        )
      })
    })

    describe('Element does not have `offsetLeft` nor `offsetTop`', () => {
      const mockElement = {
        parentElement: {
          offsetLeft: 2,
          offsetTop: 4
        },
        getBoundingClientRect () {
          return {
            width: 4,
            height: 2,
            left: -2,
            top: -2
          }
        }
      }

      it('returns an object', () => {
        return (
          expect(getElementRect(mockElement))
            .to.eql({
              left: 4,
              top: 6,
              width: 4,
              height: 2,
              right: 8,
              bottom: 8
            })
        )
      })
    })
  })

  describe('`getRects()`', () => {
    describe('Element has an `offsetLeft`', () => {
      const mockContainer = {
        offsetLeft: 'MOCK OFFSET LEFT',
        offsetTop: 'MOCK OFFSET TOP',
        offsetWidth: 'MOCK OFFSET WIDTH',
        offsetHeight: 'MOCK OFFSET HEIGHT',
        getBoundingClientRect () {
          return {
            width: 'MOCK WIDTH',
            height: 'MOCK HEIGHT'
          }
        }
      }

      const mockTarget = {
        offsetLeft: 1,
        offsetTop: 2,
        offsetWidth: 3,
        offsetHeight: 4,
        parentElement: {
          offsetLeft: 5,
          offsetTop: 6
        },
        getBoundingClientRect () {
          return {
            width: 10,
            height: 9,
            left: -8,
            top: -7
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
                left: 'MOCK OFFSET LEFT',
                top: 'MOCK OFFSET TOP',
                width: 'MOCK WIDTH',
                height: 'MOCK HEIGHT',
                right: 'MOCK OFFSET LEFTMOCK WIDTH',
                bottom: 'MOCK OFFSET TOPMOCK HEIGHT'
              },
              target: {
                left: 1,
                top: 2,
                width: 10,
                height: 9,
                right: 11,
                bottom: 11
              }
            })
        )
      })
    })

    describe('Element has an `offsetTop`', () => {
      const mockContainer = {
        offsetLeft: 'MOCK OFFSET LEFT',
        offsetTop: 'MOCK OFFSET TOP',
        offsetWidth: 'MOCK OFFSET WIDTH',
        offsetHeight: 'MOCK OFFSET HEIGHT',
        getBoundingClientRect () {
          return {
            width: 'MOCK WIDTH',
            height: 'MOCK HEIGHT'
          }
        }
      }

      const mockTarget = {
        offsetLeft: 1,
        offsetTop: 2,
        offsetWidth: 3,
        offsetHeight: 4,
        parentElement: {
          offsetLeft: 5,
          offsetTop: 6
        },
        getBoundingClientRect () {
          return {
            width: 10,
            height: 9,
            left: -8,
            top: -7
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
                left: 'MOCK OFFSET LEFT',
                top: 'MOCK OFFSET TOP',
                width: 'MOCK WIDTH',
                height: 'MOCK HEIGHT',
                right: 'MOCK OFFSET LEFTMOCK WIDTH',
                bottom: 'MOCK OFFSET TOPMOCK HEIGHT'
              },
              target: {
                left: 1,
                top: 2,
                width: 10,
                height: 9,
                right: 11,
                bottom: 11
              }
            })
        )
      })
    })

    describe('Element does not have `offsetLeft` nor `offsetTop`', () => {
      const mockContainer = {
        offsetLeft: 'MOCK OFFSET LEFT',
        offsetTop: 'MOCK OFFSET TOP',
        offsetWidth: 'MOCK OFFSET WIDTH',
        offsetHeight: 'MOCK OFFSET HEIGHT',
        getBoundingClientRect () {
          return {
            width: 'MOCK WIDTH',
            height: 'MOCK HEIGHT'
          }
        }
      }

      const mockTarget = {
        parentElement: {
          offsetLeft: 2,
          offsetTop: 4
        },
        getBoundingClientRect () {
          return {
            width: 4,
            height: 2,
            left: -2,
            top: -2
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
                left: 'MOCK OFFSET LEFT',
                top: 'MOCK OFFSET TOP',
                width: 'MOCK WIDTH',
                height: 'MOCK HEIGHT',
                right: 'MOCK OFFSET LEFTMOCK WIDTH',
                bottom: 'MOCK OFFSET TOPMOCK HEIGHT'
              },
              target: {
                left: 4,
                top: 6,
                width: 4,
                height: 2,
                right: 8,
                bottom: 8
              }
            })
        )
      })
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
