module.exports = ->
  @loadNpmTasks 'grunt-env'

  # Convert the development sources to production in the HTML.
  @config 'env',
    dev:
      NODE_ENV: 'development'
    build:
      NODE_ENV: 'production'
