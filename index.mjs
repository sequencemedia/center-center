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
    innerWidth: viewportW,
    innerHeight: viewportH
  } = window

  const {
    scrollLeft: viewportL,
    scrollTop: viewportT
  } = getScrollingElement(document)

  const viewportR = (viewportL + viewportW)
  const viewportB = (viewportT + viewportH)

  return {
    top: viewportT,
    right: viewportR,
    bottom: viewportB,
    left: viewportL,
    width: viewportW,
    height: viewportH
  }
}

export function getContainerRect (container) {
  const {
    offsetLeft: containerL,
    offsetTop: containerT
  } = container

  /**
   * x/top is relative to the viewport
   */
  const {
    x: containerX,
    y: containerY,
    width: containerW,
    height: containerH
  } = container.getBoundingClientRect()

  const containerR = (containerL + containerW)
  const containerB = (containerT + containerH)

  return {
    x: containerX,
    y: containerY,
    top: containerT,
    right: containerR,
    bottom: containerB,
    left: containerL,
    width: containerW,
    height: containerH
  }
}

export function getTargetRect (target) {
  const {
    offsetWidth: targetW,
    offsetHeight: targetH
  } = target

  return {
    width: targetW,
    height: targetH
  }
}

export function getRects (container, target) {
  return {
    viewport: getViewportRect(),
    container: getContainerRect(container),
    target: getTargetRect(target)
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
      log('calculate containerL to viewportR')

      const availableW = Math.max(targetW, (viewportR - containerL))

      return ((availableW / 2) - (targetW / 2))
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
      log('calculate containerT to viewportB')

      const availableH = Math.max(targetH, (viewportB - containerT))

      return ((availableH / 2) - (targetH / 2))
    }
  }
}
