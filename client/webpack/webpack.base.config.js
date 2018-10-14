const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const PATHS = require('./paths');

module.exports = {
  output: {
    path: PATHS.dist,
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [PATHS.src, 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: PATHS.src,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: ['lodash'],
          presets: [['env', { targets: { node: 6 } }]],
        },
      },
      {
        exclude: [/\.html$/, /\.(js|jsx)$/, /\.css$/, /\.less$/, /\.json$/, /\.svg$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/[name].[ext]',
        },
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
        options: {
          name: 'static/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new LodashModuleReplacementPlugin({
      paths: true,
    }),
    new HtmlWebpackPlugin({
      template: PATHS.publicHtml,
      inject: 'body',
      title: 'React Redux Starter',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};
