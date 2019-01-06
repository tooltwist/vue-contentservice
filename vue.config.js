// Exclude everything in node_modules from our bundle
// See https://www.npmjs.com/package/webpack-node-externals

var nodeExternals = require('webpack-node-externals');

module.exports = {
  configureWebpack: {
    output: {
      libraryExport: 'default'
    },
    // Exclude modules from generated bundle
    // https://stackoverflow.com/questions/51571579/vuejs-library-cli-v3-exclude
    externals: process.env.NODE_ENV === 'production' ? [ nodeExternals() ] : [ ], // in order to ignore all modules in node_modules folder
    // target: 'node', // in order to ignore built-in modules like path, fs, etc.
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  }
}
