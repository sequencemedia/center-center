import debug from 'debug'
import express from 'express'

import '@sequencemedia/process'

const {
  env: {
    PORT = 3001
  }
} = process

const log = debug('center-center/docs')
const info = debug('center-center/docs:info')
const app = express()

log('`center-center/docs` is awake')

app
  .get('/favicon.ico', (req, res) => {
    res.sendFile('docs/images/favicon.ico', { root: '.' })
  })
  .get('/assets/index.mjs', (req, res) => {
    res.sendFile('src/index.mjs', { root: '.' })
  })
  .get('/assets/common/index.mjs', (req, res) => {
    res.sendFile('src/common/index.mjs', { root: '.' })
  })
  .get('/assets/dom/index.mjs', (req, res) => {
    res.sendFile('src/dom/index.mjs', { root: '.' })
  })
  .get('/assets/svg/index.mjs', (req, res) => {
    res.sendFile('src/svg/index.mjs', { root: '.' })
  })
  .get('/', (req, res) => {
    res.sendFile('docs/index.html', { root: '.' })
  })

function listen () {
  info(PORT)
}

try {
  app.listen(PORT, listen)
} catch ({ message }) {
  info(message)
}
