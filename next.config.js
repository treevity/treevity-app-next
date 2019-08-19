const path = require('path');
const withSass = require("@zeit/next-sass");

module.exports = withSass({
    publicRuntimeConfig: {
        API_URL: process.env.API_URL || 'http://localhost:3001/graphql',
        authSettings: {
            headerName: 'Authorization',
            tokenType: 'Bearer'
        },
        routes: {
            home: '/',
            login: '/login',
            register: '/register'
        }
    },
    webpack (config, options) {
        config.resolve.alias['components'] = path.join(__dirname, 'components');
        config.resolve.alias['css'] = path.join(__dirname, 'assets/css');
        config.resolve.alias['~'] = path.join(__dirname, '');
        return config;
    }
});
