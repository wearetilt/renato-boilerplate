const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const globImporter = require("node-sass-glob-importer")
const { WebpackManifestPlugin } = require("webpack-manifest-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin')

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
          filename: 'assets/images/[name][ext]',
        },
      },
      {
        test: /\.(mp4|webm)$/,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/media/[name][ext]',
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: "body",
    }),
    new SVGSpritemapPlugin(path.resolve(__dirname, "./src/assets/sprites/svgs/*.svg"), {
      output: {
        filename: "assets/sprites/sprite.svg",
        chunk: {
          name: 'spritemap',
          keep: true,
        },
        svgo: {
          plugins: [{
            name: "removeUselessDefs",
            active: false,
          }, {
            name: "removeUnknownsAndDefaults",
            active: false,
          }]
        },
        svg4everybody: true,
      },
      sprite: {
        prefix: "",
        generate: {
          title: false,
          symbol: true,
          use: true,
        },
      },
      styles: {
        filename: "./src/assets/sprites/tmpl.scss"
      }
    }),
    new WebpackManifestPlugin({
      writeToFileEmit: true,
      seed: {}
    }),
  ],
}