'use strict';

const app = require('./config/server');
const environments = require('./env');

const port = environments.api.port;
const host = environments.api.host;

app.listen(environments.api.port, () => {
  console.log(`${host}:${port}`);
});
