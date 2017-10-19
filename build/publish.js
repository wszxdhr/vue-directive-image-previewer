require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.publish.conf')
var fs = require('fs')

console.log('Writing dist/index.js...')
fs.mkdirSync(path.resolve(__dirname, '../dist'), '0777')
fs.writeFileSync(path.resolve(__dirname, '../dist/index.js'), 'module.exports = require(\'./assets/vue-directive-image-previewer.js\')\n', 'utf8')

var spinner = ora('building npm plugin...')
spinner.start()

rm(path.join(config.publish.assetsRoot, config.publish.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
