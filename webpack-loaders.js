const path = require('path');

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
      configFile: path.resolve(__dirname, './.eslintrc.json'),
    },
  },
};

module.exports = {
  JSLoader,
  ESLintLoader,
};
