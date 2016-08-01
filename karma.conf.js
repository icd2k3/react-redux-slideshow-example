var webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js');
    configFile = require('./config.js');

module.exports = function(config) {
    const preprocessors = {};
    preprocessors[configFile.webpack_test_context] = ['webpack'];

    config.set({
        basePath: '',
        browsers: ['PhantomJS'],
        singleRun: true,
        files: [
            configFile.babel_polyfill,
            configFile.webpack_test_context,
            {
                pattern: configFile.json_path,
                served: true,
                included: false
            }
        ],
        frameworks: [
            'mocha',
            'chai'
        ],
        preprocessors,
        babelPreprocessor: {
            options: {
                presets: ['es2015']
            },
        },
        plugins: [
            'karma-chai',
            'karma-coverage',
            'karma-coveralls',
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher',
            'karma-webpack'
        ],
        proxies: {
            '/src/json': '/base/src/json/'
        },
        reporters: [
            'mocha',
            'progress',
            'coverage',
            'coveralls'
        ],
        coverageReporter: {
            dir: configFile.code_coverage_dir,
            reporters: [
                {type: 'html', subdir: configFile.code_coverage_sub_dir},
                {type: 'lcov', subdir: configFile.code_coverage_lcov_sub_dir}
            ]
        },
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true  // don't spam console when running app in karma
        }
    })
}
