"use strict";

// overall config params
var configFile = require('../config.js'),

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
                },
                // postcss compiler which also converts our classNames to something like ComponentName_child__randomHash
                {
                    test: configFile.webpack_css_regex,
                    loaders: [
                        'style-loader',
                        'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
                    ],
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
                require('precss'),
                require('postcss-import')({
                    addDependencyTo: webpack
                }),
                require('autoprefixer')
            ];
        },
        // shortcut paths (ex: utils from 'utils' instead of '../../utils/utils.js')
        resolve: {
            root: configFile.src_path,
            alias: {
                constants$: configFile.webpack_constants_path,
                testUtils$: configFile.webpack_test_utils_path,
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