import {
  expect
} from 'chai'

import {
  getScrollingElement,
  getViewportRect,
  getElementRect,
  getRects,
  calculateLeft,
  calculateTop
} from '#center-center'

describe('`center-center`', () => {
  it('exports `getScrollingElement`', () => expect(getScrollingElement).to.be.a('function'))

  it('exports `getViewportRect`', () => expect(getViewportRect).to.be.a('function'))

  it('exports `getElementRect`', () => expect(getElementRect).to.be.a('function'))

  it('exports `getRects`', () => expect(getRects).to.be.a('function'))

  it('exports `calculateLeft`', () => expect(calculateLeft).to.be.a('function'))

  it('exports `calculateTop`', () => expect(calculateTop).to.be.a('function'))

  describe('`getScrollingElement()`', () => {
    describe('`scrollingElement` is defined', () => {
      describe('`scrollingElement` is null', () => {
        it('returns an object', () => {
          return (
            expect(getScrollingElement({ scrollingElement: null }))
              .to.eql({
                scrollLeft: 0,
                scrollTop: 0
              })
          )
        })
      })

      describe('`scrollingElement` is an object', () => {
        it('returns an object', () => {
          return (
            expect(getScrollingElement({ scrollingElement: { scrollLeft: 'MOCK SCROLL LEFT', scrollTop: 'MOCK SCROLL TOP' } }))
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
          expect(getScrollingElement({}))
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
    const mockElement = {
      offsetLeft: 'MOCK OFFSET LEFT',
      offsetTop: 'MOCK OFFSET TOP',
      offsetWidth: 'MOCK OFFSET WIDTH',
      offsetHeight: 'MOCK OFFSET HEIGHT'
    }

    it('returns an object', () => {
      return (
        expect(getElementRect(mockElement))
          .to.eql({
            left: 'MOCK OFFSET LEFT',
            top: 'MOCK OFFSET TOP',
            width: 'MOCK OFFSET WIDTH',
            height: 'MOCK OFFSET HEIGHT',
            right: 'MOCK OFFSET LEFTMOCK OFFSET WIDTH',
            bottom: 'MOCK OFFSET TOPMOCK OFFSET HEIGHT'
          })
      )
    })
  })

  describe('`getRects()`', () => {
    const mockContainer = {
      offsetLeft: 'MOCK OFFSET LEFT',
      offsetTop: 'MOCK OFFSET TOP',
      offsetWidth: 'MOCK OFFSET WIDTH',
      offsetHeight: 'MOCK OFFSET HEIGHT'
    }

    const mockTarget = {
      offsetLeft: 'MOCK OFFSET LEFT',
      offsetTop: 'MOCK OFFSET TOP',
      offsetWidth: 'MOCK OFFSET WIDTH',
      offsetHeight: 'MOCK OFFSET HEIGHT'
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
              width: 'MOCK OFFSET WIDTH',
              height: 'MOCK OFFSET HEIGHT',
              right: 'MOCK OFFSET LEFTMOCK OFFSET WIDTH',
              bottom: 'MOCK OFFSET TOPMOCK OFFSET HEIGHT'
            },
            target: {
              left: 'MOCK OFFSET LEFT',
              top: 'MOCK OFFSET TOP',
              width: 'MOCK OFFSET WIDTH',
              height: 'MOCK OFFSET HEIGHT',
              right: 'MOCK OFFSET LEFTMOCK OFFSET WIDTH',
              bottom: 'MOCK OFFSET TOPMOCK OFFSET HEIGHT'
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
      it('returns an object', () => {
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
      it('returns an object', () => {
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
      it('returns an object', () => {
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
      it('returns an object', () => {
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
