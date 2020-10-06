const environments = {
  api: {
    port: 3000,
    host: 'localhost',
  },
  database: {
    connection: process.env.connection || 'mongodb://127.0.0.1:27017/ecommerce',
  },
  authenticationToken: {
    secret: '232ioh3po4u23h42e23e03023ieh230he23',
  },
};

module.exports = environments;
