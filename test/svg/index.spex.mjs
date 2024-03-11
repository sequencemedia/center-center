import {
  expect
} from 'chai'

import {
  createRects,
  calculateX,
  calculateY
} from '#center-center/svg'

describe('`center-center/svg`', () => {
  it('exports `createRects`', () => expect(createRects).to.be.a('function'))

  it('exports `calculateX`', () => expect(calculateX).to.be.a('function'))

  it('exports `calculateY`', () => expect(calculateY).to.be.a('function'))

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

    describe('`calculateX()`', () => {
      const rects = {
        viewport: mockViewportRect,
        container: mockContainerRect,
        target: {
          left: 50,
          top: 50,
          width: 50,
          height: 50
        }
      }

      /**
       *  Window is 1440 x 900
       *  Header is 1440 x 90
       *  Container is 1440 x 720
       *  Footer is 1440 x 90
       *  Target is 50 x 50 at 50 x 50
       *  ViewBox is 1440 x 720
       */
      it('returns a number', () => {
        /**
         *  (50 + (50 / 2)) - ((1440 * 0.5) / 1.3888)
         */
        return (
          expect(calculateX(rects, 1440, 1.3888))
            .to.equal(443.43317972350223)
        )
      })
    })

    describe('`calculateY()`', () => {
      const rects = {
        viewport: mockViewportRect,
        container: mockContainerRect,
        target: {
          left: 50,
          top: 50,
          width: 50,
          height: 50
        }
      }

      /**
       *  Window is 1440 x 900
       *  Header is 1440 x 90
       *  Container is 1440 x 720
       *  Footer is 1440 x 90
       *  Target is 50 x 50 at 50 x 50
       *  ViewBox is 1440 x 720
       */
      it('returns a number', () => {
        /**
         *  (50 + (50 / 2)) - ((720 * 0.5) / 1.3888)
         */
        return (
          expect(calculateY(rects, 720, 1.3888))
            .to.equal(184.21658986175112)
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

    describe('`calculateX()`', () => {
      const rects = {
        viewport: mockViewportRect,
        container: mockContainerRect,
        target: {
          left: 50,
          top: 50,
          width: 50,
          height: 50
        }
      }

      /**
       *  Window is 1440 x 900
       *  Header is 1440 x 90
       *  Container is 1440 x 990
       *  Footer is 1440 x 90
       *  Target is 50 x 50 at 50 x 50
       *  ViewBox is 1440 x 990
       */
      it('returns a number', () => {
        /**
         *  (((50 + (50 / 2)) - (1440 / 2)) * 0.5) / 1.3888
         */
        return (
          expect(calculateX(rects, 1440, 1.3888))
            .to.equal(443.43317972350223)
        )
      })
    })

    describe('`calculateY()`', () => {
      const rects = {
        viewport: mockViewportRect,
        container: mockContainerRect,
        target: {
          left: 50,
          top: 50,
          width: 50,
          height: 50
        }
      }

      /**
       *  Window is 1440 x 900
       *  Header is 1440 x 90
       *  Container is 1440 x 990
       *  Footer is 1440 x 90
       *  Target is 50 x 50 at 50 x 50
       *  ViewBox is 1440 x 990
       */
      it('returns a number', () => {
        /**
         *  (((50 + (50 / 2)) - (990 / 2)) * 0.5) / 1.3888
         */
        return (
          expect(calculateY(rects, 990, 1.3888))
            .to.equal(216.61866359447004)
        )
      })
    })
  })
})
