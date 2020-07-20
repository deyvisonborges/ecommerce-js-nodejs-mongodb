'use strict'

const storage = require('node-sessionstorage');
const jwt = require('jsonwebtoken');
const Security = require('../bin/config/variables');

module.exports.authorize = async (req, res, next) => {
    try {
        const data = await storage.getItem('login');
        if(!data) {
            return res.send('Acesso restrito');
        }
        next();
    } catch (err) {
        next(err);
    }
}

// gerando token
module.exports.generateToken = async (data) => {
    return await jwt.sign(data, Security.AuthJson.secret, {
        expiresIn: 86400 // o meu token vai expirar em 1 dia
    })
}

// decodificando token
module.exports.decoded = async (token) => {
    const data = await jwt.decode(token, Security.AuthJson.secret);
    return data;
}

