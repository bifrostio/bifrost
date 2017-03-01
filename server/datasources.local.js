module.exports = {
  mailgun: {
    connector: 'loopback-connector-mailgun',
    apikey: process.env.MAILGUN_API_KEY || 'fake-key',
    domain: process.env.EMAIL_DOMAIN || 'example.com'
  }
};
