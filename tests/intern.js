define({
  proxyPort: 9090,
  proxyUrl: 'http://localhost:9090/',

  capabilities: {
    'selenium-version': '2.45.0'
  },

  environments: [
    { browserName: 'chrome' },
    { browserName: 'internet explorer', version: '10', platform: [ 'Windows 7' ] },
    { browserName: 'firefox', version: '21', platform: 'Mac 10.6' },
    { browserName: 'chrome', platform: [ 'Linux', 'Mac 10.8', 'Windows 7' ] },
    { browserName: 'safari', version: '6', platform: 'Mac 10.8' }

  ],

  tunnel: 'SauceLabsTunnel',
  maxConcurrency: 3,

  loader: {
    packages: [
      { name: 'bifrost', location: 'dist/scripts' },
      { name: 'vendor', location: 'dist/vendor'}
    ]
  },

  reporters: ['console', 'lcov'],
  suites: [ 'tests/all' ],
  excludeInstrumentation: /^tests|vendor|node_modules\//
});
