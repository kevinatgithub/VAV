const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const getClientEnvironment = require('./env');
const PATHS = require('./paths');

// eslint-disable-next-line no-empty-function
const noop = () => {};

module.exports = function prdConfig(env) {
  return {
    entry: {
      app: [require.resolve('./polyfills'), PATHS.src],
    },
    output: {
      filename: '[name]-bundle.js',
      chunkFilename: '[name]-chunk.js',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[name]---[local]---[hash:base64:5]',
                  minimize: true,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                    }),
                  ],
                },
              },
            ],
          }),
          include: PATHS.src,
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: true,
                },
              },
            ],
          }),
          exclude: PATHS.src,
        },
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: true,
                },
              },
              {
                loader: 'less-loader',
                options: {
                  modifyVars: {},
                  javascriptEnabled: true,
                },
              },
            ],
          }),
          exclude: PATHS.src,
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(PATHS.dist, {
        root: process.cwd(),
        verbose: true,
      }),
      new webpack.DefinePlugin(getClientEnvironment(env)),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: ({ context }) => context.indexOf('node_modules') !== -1,
      }),
      new UglifyJSPlugin({
        uglifyOptions: {
          ecma: 8,
          warnings: false,
          compress: {
            warnings: false,
          },
          mangle: {},
          output: {
            comments: false,
            beautify: false,
          },
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
        },
      }),
      new ExtractTextPlugin({
        filename: 'styles-[name].css',
        disable: false,
        allChunks: true,
      }),
      env.analyze ? new BundleAnalyzerPlugin() : noop,
    ],
  };
};
