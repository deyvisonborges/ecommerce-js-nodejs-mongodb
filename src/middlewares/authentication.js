'use strict';

const jwt = require('jsonwebtoken');
const cookie = require('js-cookie').noConflict;

const environments = require('../env');

const authenticationToken = environments.authenticationToken.secret;

module.exports.authorize = (req, res, next) => {
  try {
    const data = cookie.get('login');
    if (!data) {
      return res.send('Acesso restrito');
    }
    next();
  } catch (err) {
    next(err);
  }
};

// gerando token
module.exports.generateToken = (data) => {
  return jwt.sign(data, authenticationToken, {
    expiresIn: 86400, // o meu token vai expirar em 1 dia
  });
};

// decodificando token
module.exports.decoded = (token) => {
  const data = jwt.decode(token, authenticationToken);
  return data;
};
