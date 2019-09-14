const path = require('path');

module.exports = {
  entry: ['@babel/polyfill', 'whatwg-fetch', './src/js/ruan.js'],
  output: {
    path: path.resolve(__dirname, './'),
    filename: './src/js/ruan.min.js',
  },
};
