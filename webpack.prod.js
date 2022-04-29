const { merge } = require("webpack-merge")
const base = require("./webpack.base.js")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(base, {
  mode: "production",
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        ie8: false,
        ecma: 8,
        mangle: true,
        output: {
          comments: false,
          beautify: false
        },
        warnings: false
      }
    }),
  ]
})