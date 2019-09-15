// https://www.thebasement.be/working-with-babel-7-and-webpack/
const path = require('path');
const loaders = require('./webpack-loaders');

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
      loaders.JSLoader,
      loaders.ESLintLoader,
    ],
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, './dist'),
  },
};
