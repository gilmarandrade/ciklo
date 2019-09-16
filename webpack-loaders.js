const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const JSLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        ['@babel/preset-env', {
          useBuiltIns: 'usage',
          debug: true,
          corejs: 3,
        }],
      ],
    },
  },
};

const ESLintLoader = {
  test: /\.js$/,
  enforce: 'pre',
  exclude: /node_modules/,
  use: {
    loader: 'eslint-loader',
    options: {
      configFile: path.resolve(__dirname, '.eslintrc.json'),
    },
  },
};

const CSSLoader = {
  test: /\.css$/,
  exclude: /node_modules/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: path.resolve(__dirname, 'src/css/'),
      },
    },
    {
      loader: 'css-loader',
      options: { importLoaders: 1 },
    },
    {
      loader: 'postcss-loader',
      options: {
        config: {
          path: path.resolve(__dirname, 'postcss.config.js'),
        },
      },
    },
  ],
};

module.exports = {
  JSLoader,
  ESLintLoader,
  CSSLoader,
};
