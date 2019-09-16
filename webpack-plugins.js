const path = require('path');
const _MiniCssExtractPlugin = require('mini-css-extract-plugin');
const _StyleLintPlugin = require('stylelint-webpack-plugin');

const MiniCssExtractPlugin = new _MiniCssExtractPlugin({
  filename: 'css/[name].bundle.css',
  chunkFilename: '[id].css',
});

const StyleLintPlugin = new _StyleLintPlugin({
  configFile: path.resolve(__dirname, 'stylelint.config.js'),
  context: path.resolve(__dirname, './src/css'),
  files: '**/*.css',
  failOnError: false,
  quiet: false,
});

module.exports = {
  MiniCssExtractPlugin,
  StyleLintPlugin,
};
