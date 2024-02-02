import debug from 'debug'
import express from 'express'

const {
  env: {
    PORT = 3001
  }
} = process

const log = debug('center-center/docs')
const info = debug('center-center/docs:info')
const app = express()

process
  .on('SIGHUP', async (signal) => {
    const {
      stdout
    } = process

    if ('clearLine' in stdout) {
      stdout.clearLine()
      stdout.cursorTo(0)
    }

    log(signal)

    process.exit(0)
  })
  .on('SIGINT', async (signal) => {
    const {
      stdout
    } = process

    if ('clearLine' in stdout) {
      stdout.clearLine()
      stdout.cursorTo(0)
    }

    log(signal)

    process.exit(0)
  })
  .on('SIGBREAK', async (signal) => {
    log(signal)

    process.exit(0)
  })
  .on('SIGQUIT', async (signal) => {
    log(signal)

    process.exit(0)
  })
  .on('SIGTERM', async (signal) => {
    log(signal)

    process.exit(0)
  })
  .on('SIGPIPE', async (signal) => {
    log(signal)
  })
  .on('beforeExit', async (code) => {
    log('beforeExit', code)
  })
  .on('exit', async (code) => {
    log('exit', code)
  })
  .on('uncaughtException', async ({ message }) => {
    log('uncaughtException', message)

    process.exit(1)
  })
  .on('unhandledRejection', async (reason, promise) => {
    log('unhandledRejection', reason, promise)

    process.exit(1)
  })

app
  .get('/favicon.ico', (req, res) => {
    res.sendFile('docs/images/favicon.ico', { root: '.' })
  })
  .get('/assets/index.mjs', (req, res) => {
    res.sendFile('index.mjs', { root: '.' })
  })
  .get('/', (req, res) => {
    res.sendFile('docs/index.html', { root: '.' })
  })

try {
  app.listen(PORT, () => {
    info(PORT)
  })
} catch ({ message }) {
  info(message)
}
