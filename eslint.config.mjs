import globals from 'globals'
import standard from '@sequencemedia/eslint-config-standard/merge'
import typescript from '@sequencemedia/eslint-config-typescript/merge'

export default [
  ...standard({
    files: [
      '**/*.{mjs,cjs}'
    ],
    ignores: [
      'test',
      'src'
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }),
  ...standard({
    files: [
      'src/**/*.{mjs,cjs}'
    ],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  }),
  ...standard({
    files: [
      'test/**/*.{mjs,cjs}'
    ],
    languageOptions: {
      globals: {
        ...globals.mocha
      }
    }
  }),
  ...typescript({
    files: [
      '**/*.{mts,cts}'
    ],
    ignores: [
      'test',
      'src'
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }),
  ...typescript({
    files: [
      'src/**/*.{mts,cts}'
    ],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  }),
  ...typescript({
    files: [
      'test/**/*.{mts,cts}'
    ],
    languageOptions: {
      globals: {
        ...globals.mocha
      }
    }
  })
]
