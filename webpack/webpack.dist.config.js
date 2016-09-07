"use strict";

// overall config params
var configFile = require('../config.js'),

    // plugins and packages
    webpack = require('webpack'),
    Extract = require('extract-text-webpack-plugin'),
    clean = require('clean-webpack-plugin'),
    copy = require('copy-webpack-plugin');

// dist config
module.exports = {
  output: {
    path: configFile.dist_path,
    filename: 'dist.js'
  },
  module: {
    loaders: [
      {
        test: configFile.webpack_css_regex,
        loader: Extract.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[hash:base64:5]!postcss-loader'
        )
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new clean([
      configFile.dist_path
    ]),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false }
    }),
    new copy([
      {
        from: configFile.src_static_path,
        to: configFile.dist_static_path,
        copyUnmodified: true,
        ignore: [
          '*.html',
          '*.txt',
          'icomoon/*.json',
          'icomoon/demo-files/**/*'
        ]
      }
    ]),
    new Extract(configFile.dist_css_name)
  ]
};
