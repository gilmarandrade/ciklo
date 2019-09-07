const path = require('path');

module.exports = {
  entry: ['@babel/polyfill', 'whatwg-fetch', './src/js/demo6.js'],
  output: {
    path: path.resolve(__dirname, './'),
    filename: './src/js/demo6.min.js',
  },
};
