'use strict';

module.exports = function (grunt, options) {
    return {
        options: {
            stdout: true
        },
        selenium: {
            command: 'node node_modules/protractor/bin/webdriver-manager start',
            options: {
                stdout: false,
                async: true
            }
        },
        protractor_update: {
            command: 'node node_modules/protractor/bin/webdriver-manager update'
        },
        npm_install: {
            command: 'npm install'
        }
    };
};
