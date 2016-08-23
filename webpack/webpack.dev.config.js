"use strict";

var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');

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
        ]
    },
    plugins: process.env.NODE_ENV === 'development'
        ? [new DashboardPlugin(new Dashboard().setData)]
        : []
};
