// https://www.thebasement.be/working-with-babel-7-and-webpack/
const path = require('path');

module.exports = {
  entry: {
    index: './site/js/index.js',
    chronometer: './site/js/chronometer.js',
    countdown: './site/js/countdown.js',
    progressBar: './site/js/progressBar.js',
    pixelGrid: './site/js/pixelGrid.js',
    tudoJunto: './site/js/tudoJunto.js',
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    }],
  },
};
