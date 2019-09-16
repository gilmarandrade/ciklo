// https://www.thebasement.be/working-with-babel-7-and-webpack/
// https://medium.com/@jontorrado/working-with-webpack-4-es6-postcss-with-preset-env-and-more-93b3d77db7b2

const path = require('path');
const loaders = require('./webpack-loaders');
const plugins = require('./webpack-plugins');

module.exports = {
  entry: {
    index: './site/js/index.js',
    chronometer: './site/js/chronometer.js',
    countdown: './site/js/countdown.js',
    progressBar: './site/js/progressBar.js',
    pixelGrid: './site/js/pixelGrid.js',
    tudoJunto: './site/js/tudoJunto.js',
  },
  module: {
    rules: [
      loaders.CSSLoader,
      loaders.JSLoader,
      loaders.ESLintLoader,
    ],
  },
  plugins: [
    plugins.StyleLintPlugin,
    plugins.MiniCssExtractPlugin,
  ],
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist/'),
  },
};
