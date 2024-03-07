import {
  expect
} from 'chai'

import {
  createRects,
  calculateLeft,
  calculateTop
} from '#center-center/dom'

describe('`center-center/dom`', () => {
  it('exports `createRects`', () => expect(createRects).to.be.a('function'))

  it('exports `calculateLeft`', () => expect(calculateLeft).to.be.a('function'))

  it('exports `calculateTop`', () => expect(calculateTop).to.be.a('function'))

  describe('`createRects()`', () => {
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
        expect(createRects(mockContainer, mockTarget))
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
    const mockViewportRect = {
      top: 0,
      right: 1440,
      bottom: 900,
      left: 0,
      width: 1440,
      height: 900
    }

    const mockContainerRect = {
      x: 0,
      y: 90,
      top: 90,
      right: 1440,
      bottom: 810,
      left: 0,
      width: 1440,
      height: 720
    }

    describe('`calculateLeft()`', () => {
      const rects = {
        viewport: mockViewportRect,
        container: mockContainerRect,
        target: {
          width: 50,
          height: 50
        }
      }

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
      const rects = {
        viewport: mockViewportRect,
        container: mockContainerRect,
        target: {
          width: 50,
          height: 50
        }
      }

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
    const mockViewportRect = {
      top: 0,
      right: 1440,
      bottom: 900,
      left: 0,
      width: 1440,
      height: 900
    }

    const mockContainerRect = {
      x: 0,
      y: 90,
      top: 90,
      right: 1440,
      bottom: 1080,
      left: 0,
      width: 1440,
      height: 990
    }

    describe('`calculateLeft()`', () => {
      const rects = {
        viewport: mockViewportRect,
        container: mockContainerRect,
        target: {
          width: 50,
          height: 50
        }
      }

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
      const rects = {
        viewport: mockViewportRect,
        container: mockContainerRect,
        target: {
          width: 50,
          height: 50
        }
      }

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
