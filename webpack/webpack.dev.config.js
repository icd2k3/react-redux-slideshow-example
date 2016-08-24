"use strict";

var configFile = require('../config.js'),
    DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        progress: true,
        quiet: true,
        historyApiFallback: true,
        stats: 'errors-only'
    },
    module: {
        // when developing locally, lint the application to highlight syntax problems
        preLoaders: [
            {
                test: [/\.js$/, /\.jsx$/],
                loaders: [
                    'eslint-loader'
                ],
                exclude: [/node_modules/, /build/]
            }
        ],
        loaders: [
            // postcss compiler which also converts our classNames to something like ComponentName_child__randomHash
            {
                test: configFile.webpack_css_regex,
                loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
                exclude: configFile.webpack_exclude
            }
        ]
    },
    plugins: process.env.NODE_ENV === 'development'
        ? [new DashboardPlugin()]
        : []
};
