const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name].[chunkhash].css');

const config = {
  entry: {
    bundle: './app.js',
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
    ],
  },
  plugins: [
    extractCSS,
    new webpack.optimize.CommonsChunkPlugin({
      names: ['manifest'],
    }),
    new HtmlWebpackPlugin({
      title: 'Canvas Project',
      filename: 'index.html',
      template: './index.html',
    }),
  ],
};

module.exports = config;
