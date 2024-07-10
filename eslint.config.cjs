const globals = require('globals')

const love = require('eslint-config-love')

module.exports = (
  import ('@sequencemedia/eslint-config-standard/merge')
    .then(({ default: merge }) => (
      merge({
        files: [
          '{babel,eslint}.config.cjs'
        ],
        languageOptions: {
          globals: {
            ...globals.node
          }
        }
      })
        .concat(
          merge({
            files: [
              'src/**/*.{cjs,mjs}'
            ],
            languageOptions: {
              globals: {
                ...globals.browser
              }
            }
          })
            .concat(
              {
                ...love,
                files: [
                  'src/**/*.{cts,mts}'
                ]
              }
            )
        )
    ))
)
