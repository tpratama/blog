require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const hash = require('./build-utils').getMostRecentHash();

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(`./dist/${hash}`),
    filename: 'index.min.js',
  },
  plugins: [
    // http://stackoverflow.com/questions/25384360/how-to-prevent-moment-js-from-loading-locales-with-webpack
    new webpack.ContextReplacementPlugin(/moment[\\]locale$/, /^\.\/(en|id)$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new HtmlWebpackPlugin({
      filename: '../../index.html',
      template: './src/index.html.template',
      hash: hash,
      inject: false,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'stage-2', 'es2015'],
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]--[hash:base64:5]',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    publicPath: `/dist/${hash}`,
    contentBase: './',
  },
};
