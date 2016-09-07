"use strict";

// overall config params
var configFile = require('../config'),

  // extended webpack config files based on NODE_ENV
  devConfig = require(configFile.webpack_dev_config),
  distConfig = require(configFile.webpack_dist_config),
  testConfig = require(configFile.webpack_test_config),

  // plugins and packages
  webpack = require('webpack'),
  merge = require('webpack-merge'),
  html = require('html-webpack-plugin'),

  // base webpack config that can be extended (see webpack merge() functionality at the bottom)
  config = {
    entry: configFile.webpack_entry,
    module: {
      loaders: [
        // babel es6 and jsx compiler
        {
            test: configFile.webpack_client_regex,
            loader: 'babel',
            exclude: configFile.webpack_exclude
        }
      ]
    },
    plugins: [
      new html({
        template: configFile.index_html_path
      })
    ],
    // postcss plugins
    postcss: function (webpack) {
      return [
        require('stylelint'),
        require('postcss-reporter'),
        require('precss'),
        require('postcss-import')({
          addDependencyTo: webpack
        }),
        require('autoprefixer')
      ];
    },
    // shortcut paths (ex: utils from 'utils' instead of '../../utils/utils.js')
    resolve: {
      extensions: configFile.webpack_resolve_extensions,
      root: configFile.src_path,
      alias: {
        actions: configFile.webpack_actions_path,
        components: configFile.webpack_components_path,
        constants$: configFile.webpack_constants_path,
        modules$: configFile.webpack_modules_path,
        reducers$: configFile.webpack_reducers_path,
        sagas$: configFile.webpack_sagas_path,
        utils$: configFile.webpack_utils_path
      }
    }
  };

// npm run dist vs npm run dev needs different config settings
switch (process.env.NODE_ENV) {
  case 'development':
    config = merge(config, devConfig);
  break;
  case 'production':
    config = merge(config, distConfig);
  break;
  case 'test':
    config = merge(config, testConfig);
  break;
}

// export final merged config data object
module.exports = config;
