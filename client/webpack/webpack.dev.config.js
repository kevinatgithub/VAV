const webpack = require('webpack');
const stylelint = require('stylelint');
const reporter = require('postcss-reporter');
const getClientEnvironment = require('./env');
const PATHS = require('./paths');

module.exports = function devConfig(env) {
  return {
    devtool: 'eval-source-map',
    entry: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?reload=true',
      PATHS.src,
    ],
    module: {
      rules: [
        // local files: css modules
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                localIdentName: '[name]---[local]---[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [stylelint(), reporter()],
              },
            },
          ],
          include: PATHS.src,
        },
        // external css files
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          exclude: PATHS.src,
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                modifyVars: {},
                javascriptEnabled: true,
              },
            },
          ],
          exclude: PATHS.src,
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin(getClientEnvironment(env)),
    ],
  };
};
