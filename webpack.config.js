const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
  mode: "development",

  performance: {
    maxAssetSize: 500000,
    maxEntrypointSize: 500000,
    assetFilter: function (assetFilename) {
      return !assetFilename.endsWith('.jpg')
    },
  },
  entry: {
    bundle: path.resolve(__dirname, 'src/scripts/index.js')
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].[contenhash].js',
    clean: true,
    assetModuleFilename: '[name][ext]'
  },

  devtool: 'source-map',

  plugins: [new HtmlWebpackPlugin({
    title: 'Template Website',
    template: './src/index.html',
    filename: 'index.html',

  })],
  devServer: {
    static: {
      directory: path.dirname(__dirname, 'dist')
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
