// simple list of config params to share between webpack & karma

var path    = require('path'),
    distDir = 'dist',
    srcDir  = 'src',
    distPath = path.resolve(__dirname, distDir),
    srcPath = path.resolve(__dirname, srcDir);

module.exports = {
    babel_polyfill             : 'node_modules/babel-polyfill/dist/polyfill.js',
    code_coverage_dir          : 'code-coverage-report/',
    code_coverage_lcov_sub_dir : 'report-lcov',
    code_coverage_sub_dir      : 'html',
    dist                       : 'dist',
    dist_css_name              : 'dist.css',
    dist_path                  : distPath,
    index_html_path            : srcPath + '/index.html',
    json_path                  : srcPath + '/json/*.json',
    src_path                   : srcPath,
    webpack_client_regex       : /\.js$|\.jsx$/,
    webpack_constants_path     : srcPath + '/constants/constants.js',
    webpack_css_regex          : /\.css$/,
    webpack_dev_config         : './webpack.dev.config',
    webpack_dist_config        : './webpack.dist.config',
    webpack_entry              : srcPath + '/index.jsx',
    webpack_exclude            : /node_modules/,
    webpack_test_config        : './webpack.test.config',
    webpack_test_context       : 'webpack/webpack.test.context.js',
    webpack_test_utils_path    : srcPath + '/testUtils/testUtils.js',
    webpack_utils_path         : srcPath + '/utils/utils.js'
};