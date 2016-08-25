// this is used in karma.conf.js as the entry point for all tests
const testsContext = require.context(
    '../src',
    true,
    /^((?!icomoon).)*\.js$|\/components\/.*?\.jsx$/
);

testsContext.keys().forEach(testsContext);
