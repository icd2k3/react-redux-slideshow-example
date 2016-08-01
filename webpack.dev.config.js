"use strict";

module.exports = {
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        progress: true,
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
    }
};
