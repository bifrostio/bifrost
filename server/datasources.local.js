module.exports = {
  mailgun: {
    connector: 'loopback-connector-mailgun',
    apikey: process.env.MAILGUN_API_KEY,
    domain: process.env.EMAIL_DOMAIN
  }
};
