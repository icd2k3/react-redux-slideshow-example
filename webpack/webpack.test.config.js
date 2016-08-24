"use strict";

var configFile = require('../config.js'),
	stringReplacePlugin = require('string-replace-webpack-plugin');

// test config
module.exports = {
	devtool: 'inline-source-map',
	module: {
        preLoaders: [
            {
                test: /\.spec.js$/,
                loader: 'eslint-loader?{envs:["mocha"]}',
                exclude: /node_modules/
            }
        ],
		// this loader allows istanbul code coverage reported to ignore code that is added from Babel
		loaders: [
			{
				test: configFile.webpack_client_regex,
				exclude: configFile.webpack_exclude,
				loader: stringReplacePlugin.replace({
                    replacements: [
                        {
                            pattern: /function _/g,
                            replacement: function() {
                                return '/* istanbul ignore next */ function _';
                            }
                        },
                        {
                        	pattern: /var _createClass/g,
                        	replacement: function() {
                        		return '/* istanbul ignore next */ var _createClass';
                        	}
                        }
                    ]
                })
			},
            {
                test: configFile.webpack_css_regex,
                loader: 'style-loader!css-loader!postcss-loader',
                exclude: configFile.webpack_exclude
            }
		],
		// this is necessary or else test report will be for entire webpack bundle instead of each component
		postLoaders: [
			{
				test: configFile.webpack_client_regex,
				exclude: configFile.webpack_exclude,
				loader: 'istanbul-instrumenter'
			}
		]
	},
    // eslint config
    eslint: {
        configFile: configFile.eslint_tests_config
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
		new stringReplacePlugin()
	]
};
