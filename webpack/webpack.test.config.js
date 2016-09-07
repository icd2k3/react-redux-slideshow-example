"use strict";

var configFile = require('../config.js'),
  clean = require('clean-webpack-plugin'),
  warningsPlugin = require('./webpack-karma-warnings-plugin');

// test config
module.exports = {
  devtool: 'inline-source-map',
  module: {
    preLoaders: [
      {
        test: [/\.js$/, /\.jsx$/],
        loader: 'eslint-loader?{envs:["mocha"]}',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: configFile.webpack_css_regex,
        loader: 'style-loader!css-loader!postcss-loader',
        exclude: configFile.webpack_exclude
      }
    ]
  },
  // eslint config
  eslint: {
    configFile: configFile.eslint_tests_config,
    failOnError: true
  },
  // these externals are needed for enzyme to work correctly when running tests
  externals: {
    'jsdom': 'window',
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window'
  },
  // clear postcss plugins from webpack.config.js for speed
  postcss: function (webpack) {
    return [];
  },
  // init string replace plugin for babel omissions above
  plugins: [
    new clean([
      configFile.code_coverage_path
    ]),
    new warningsPlugin()
  ],
  resolve: {
    alias: {
      testUtils$: configFile.webpack_test_utils_path
    }
  }
};
