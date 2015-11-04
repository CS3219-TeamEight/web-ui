module.exports = ->
  @loadNpmTasks 'grunt-contrib-cssmin'

  # Minify the distribution CSS.
  @config 'cssmin',
    release:
      files:
        'dist/styles.min.css': ['app/assets/styles/index.css']
