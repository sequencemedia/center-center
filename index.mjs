import debug from 'debug'

const log = debug('center-center')

export function getScrollingElement (document) {
  if (Reflect.has(document, 'scrollingElement')) {
    const scrollingElement = Reflect.get(document, 'scrollingElement')
    if (scrollingElement) return scrollingElement
  }

  return {
    scrollLeft: 0,
    scrollTop: 0
  }
}

export function getViewportRect () {
  const {
    innerWidth: width,
    innerHeight: height
  } = window

  const {
    scrollLeft: left,
    scrollTop: top
  } = getScrollingElement(document)

  return {
    width,
    height,
    left,
    top,
    right: (left + width),
    bottom: (top + height)
  }
}

export function getElementRect (element) {
  const {
    offsetWidth: width,
    offsetHeight: height,
    offsetLeft: left,
    offsetTop: top
  } = element

  return {
    width,
    height,
    left,
    top,
    right: (left + width),
    bottom: (top + height)
  }
}

export function getRects (container, target) {
  return {
    viewport: getViewportRect(),
    container: getElementRect(container),
    target: getElementRect(target)
  }
}

export function calculateLeft ({
  viewport: {
    left: viewportL,
    right: viewportR,
    width: viewportW
  },
  container: {
    left: containerL,
    right: containerR,
    width: containerW
  },
  target: {
    width: targetW
  }
}) {
  if (viewportL === containerL) {
    if (viewportW === containerW) {
      const availableW = Math.max(targetW, containerW)

      return ((availableW / 2) - (targetW / 2))
    }

    if (viewportW > containerW) {
      const availableW = Math.max(targetW, (containerL + containerW))

      return ((availableW / 2) - (targetW / 2))
    }
  }

  if (viewportL > containerL) {
    if (containerR > viewportL) {
      if (viewportR > containerR) {
        log('calculate viewportL to containerR')

        const availableW = Math.max(targetW, (containerL + containerW) - viewportL)

        return (containerW - availableW) + ((availableW / 2) - (targetW / 2))
      }

      if (containerR > viewportR) {
        log('calculate viewportL to viewportR')

        const availableW = Math.max(targetW, viewportW)

        return (viewportL - containerL) + ((availableW / 2) - (targetW / 2))
      }
    }

    if (viewportL > containerR) {
      log('pin to right')

      const availableW = Math.max(targetW, containerW)

      /**
       *  Pin to right
       */
      return (availableW - targetW)
    }
  }

  if (containerL > viewportL) {
    if (containerL > viewportR) {
      log('pin to left')

      /**
       *  Pin to left
       *
       *  Scroll is above container (container is offscreen)
       */
      return 0
    }

    if (viewportR > containerL) {
      if (viewportR > containerR) {
        log('calculate containerL to containerR')

        const availableW = Math.max(targetW, (containerR - containerL))

        return ((availableW / 2) - (targetW / 2))
      } else {
        log('calculate containerL to viewportR')

        const availableW = Math.max(targetW, (viewportR - containerL))

        return ((availableW / 2) - (targetW / 2))
      }
    }
  }
}

export function calculateTop ({
  viewport: {
    top: viewportT,
    bottom: viewportB,
    height: viewportH
  },
  container: {
    top: containerT,
    bottom: containerB,
    height: containerH
  },
  target: {
    height: targetH
  }
}) {
  if (viewportT === containerT) {
    if (viewportH === containerH) {
      const availableH = Math.max(targetH, containerH)

      return ((availableH / 2) - (targetH / 2))
    }

    if (viewportB > containerB) {
      const availableH = Math.max(targetH, (containerT + containerB))

      return ((availableH / 2) - (targetH / 2))
    }
  }

  if (viewportT > containerT) {
    if (containerB > viewportT) {
      if (viewportB > containerB) {
        log('calculate viewportT to containerB')

        const availableH = Math.max(targetH, (containerT + containerH) - viewportT)

        return (containerH - availableH) + ((availableH / 2) - (targetH / 2))
      }

      if (containerB > viewportB) {
        log('calculate viewportT to viewportB') // , viewportT > containerT, containerB > viewportB)

        const availableH = Math.max(targetH, viewportH)

        return (viewportT - containerT) + ((availableH / 2) - (targetH / 2))
      }
    }

    if (viewportT > containerB) {
      log('pin to bottom')

      const availableH = Math.max(targetH, containerH)

      /**
       *  Pin to bottom
       */
      return (availableH - targetH)
    }
  }

  if (containerT > viewportT) {
    if (containerT > viewportB) {
      log('pin to top')

      /**
       *  Pin to top
       *
       *  Scroll is above container (container is offscreen)
       */
      return 0
    }

    if (viewportB > containerT) {
      if (viewportB > containerB) {
        log('calculate containerT to containerB')

        const availableH = Math.max(targetH, (containerB - containerT))

        return ((availableH / 2) - (targetH / 2))
      } else {
        log('calculate containerT to viewportB')

        const availableH = Math.max(targetH, (viewportB - containerT))

        return ((availableH / 2) - (targetH / 2))
      }
    }
  }
}
