const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const globImporter = require("node-sass-glob-importer")
const { WebpackManifestPlugin } = require("webpack-manifest-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    app: [
      "./src/js/app.js",
      "./src/css/app.scss"
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use:  [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          'postcss-loader',
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                importer: globImporter()
              }
            },
          },
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|avif|webp)$/,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]',
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: "body",
    }),
    // new SVGSpritemapPlugin({
    //   src: path.resolve(__dirname, "./assets/sprites/svgs/*.svg"),
    //   filename: "sprite.svg",
    //   prefix: "",
    //   generate: [{
    //     title: false,
    //     symbol: false,
    //     use: true,
    //   }],
    //   svgo: {
    //     plugins: [{
    //       removeUselessDefs: false,
    //       removeUnknownsAndDefaults: false,
    //     }]
    //   },
    //   styles: "./assets/sprites/tmpl.scss",
    //   svg4everybody: true,
    //   deleteChunk: false,
    // }),
    new WebpackManifestPlugin({
      writeToFileEmit: true,
      seed: {}
    }),
  ],
}