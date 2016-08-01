"use strict";

// overall config params
var configFile = require('./config.js'),

    // plugins and packages
    webpack = require('webpack'),
    clean = require('clean-webpack-plugin'),
    copy = require('copy-webpack-plugin');

// dist config
module.exports = {
    output: {
        path: configFile.dist_path,
        filename: 'dist.js'
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
                from: configFile.src_path + '/icomoon',
                to: configFile.dist_path + '/src/icomoon',
                copyUnmodified: true,
                ignore: ['*.html', '*.txt', '*.json', 'demo-files/**']
            },
            {
                from: configFile.src_path + '/json',
                to: configFile.dist_path + '/src/json',
                copyUnmodified: true
            },
            {
                from: configFile.src_path + '/images',
                to: configFile.dist_path + '/src/images',
                copyUnmodified: true
            }
        ])
    ]
};
