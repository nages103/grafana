'use strict';

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getBabelConfig = require('./babel.config');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env = {}) =>
  merge(common, {
    devtool: 'inline-source-map',
    mode: 'development',

    entry: {
      app: './public/app/index.ts',
      dark: './public/sass/grafana.dark.scss',
      light: './public/sass/grafana.light.scss',
    },

    // If we enabled watch option via CLI
    watchOptions: {
      ignored: /node_modules/,
    },

    module: {
      // Note: order is bottom-to-top and/or right-to-left
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: getBabelConfig({ BABEL_ENV: 'dev' }),
            },
          ],
        },
        require('./sass.rule.js')({
          sourceMap: false,
          preserveUrl: false,
        }),
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),
      env.noTsCheck
        ? new webpack.DefinePlugin({}) // bogus plugin to satisfy webpack API
        : new ForkTsCheckerWebpackPlugin({
            eslint: {
              enabled: true,
              files: ['public/app/**/*.{ts,tsx}', 'packages/*/src/**/*.{ts,tsx}'],
              options: {
                cache: true,
              },
            },
            typescript: {
              mode: 'write-references',
              diagnosticOptions: {
                semantic: true,
                syntactic: true,
              },
            },
          }),
      new MiniCssExtractPlugin({
        filename: 'grafana.[name].[hash].css',
      }),
      new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, '../../public/views/error.html'),
        template: path.resolve(__dirname, '../../public/views/error-template.html'),
        inject: false,
        chunksSortMode: 'none',
        excludeChunks: ['dark', 'light'],
      }),
      new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, '../../public/views/index.html'),
        template: path.resolve(__dirname, '../../public/views/index-template.html'),
        inject: false,
        chunksSortMode: 'none',
        excludeChunks: ['dark', 'light'],
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
      }),
      // new BundleAnalyzerPlugin({
      //   analyzerPort: 8889
      // })
    ],
  });
