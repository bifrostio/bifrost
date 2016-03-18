
module.exports = {
  db: {
    connector: 'mongodb',
    database: 'bifrost',
    host: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT || 15869,
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD
  }
};
