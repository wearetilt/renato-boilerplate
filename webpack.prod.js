const { merge } = require("webpack-merge")
const base = require("./webpack.base.js")
const path = require("path")
const StyleLintPlugin = require("stylelint-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = merge(base, {
  mode: "production",
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'art-of-allyship'),
    publicPath: './',
    filename: "[name].[hash].js",
    assetModuleFilename: 'assets/*/[name].[hash][ext]',
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new StyleLintPlugin({
      configFile: path.resolve(__dirname, ".stylelintrc.js"),
      files: ["src/css/app.scss"],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css"
    }),
  ]
})