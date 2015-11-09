module.exports = ->
  @loadNpmTasks 'grunt-contrib-cssmin'

  # Minify the distribution CSS.
  @config 'cssmin',
    release:
      files:
        'dist/assets/styles/index.min.css': ['app/assets/styles/index.css']
