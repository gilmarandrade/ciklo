const _MiniCssExtractPlugin = require('mini-css-extract-plugin');

const MiniCssExtractPlugin = new _MiniCssExtractPlugin({
  filename: 'css/[name].bundle.css',
  chunkFilename: '[id].css',
});
module.exports = {
  MiniCssExtractPlugin,
};
