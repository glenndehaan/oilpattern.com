const withSass = require('@zeit/next-sass');
module.exports = withSass({
    distDir: '../.next',
    poweredByHeader: false,
    devIndicators: {
        autoPrerender: false
    }
});
