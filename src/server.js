'use strict';

const app = require('./config/application');
const environments = require('../env');

const port = environments.api.port;
const host = environments.api.host;

app.listen(environments.api.port, () => {
  console.log(`${host}:${port}`);
});
