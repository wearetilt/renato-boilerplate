const webpack = require("webpack")
const { merge } = require("webpack-merge")
const base = require("./webpack.base.js")
const path = require("path")
const StyleLintPlugin = require("stylelint-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const devConfig = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: 3000,
  },
  watchOptions: {
    ignored: ["node_modules"],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: "[name].js",
    assetModuleFilename: 'assets/*/[name][ext]',
    clean: true,
  },
  plugins: [
    new StyleLintPlugin({
      configFile: path.resolve(__dirname, ".stylelintrc.js"),
      files: ["src/css/app.scss"],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
  ],
}

module.exports = merge(base, devConfig)