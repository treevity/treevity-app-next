const path = require('path');
const withSass = require("@zeit/next-sass");

module.exports = withSass({
    webpack (config, options) {
        config.resolve.alias['components'] = path.join(__dirname, 'components');
        config.resolve.alias['css'] = path.join(__dirname, 'assets/css');
        return config;
    }
});
