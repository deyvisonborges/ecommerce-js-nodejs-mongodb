'use strict'

const jwt = require('jsonwebtoken')
const Security = require('../bin/config/variables')

// gerando token
module.exports.generateToken = async (data) => {
    return await jwt.sign(data, Security.AuthJson.secret, {
        expiresIn: 86400 // o meu token vai expirar em 1 dia
    })
}

// decodificando token
module.exports.decoded = async (token) => {
    const data = await jwt.decode(token, Security.AuthJson.secret)
    return data
}

module.exports.authorize = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token']
    if(!token) {
        res.status(401).json({
            message: 'Acesso restrito!'
        })
    } else {
        jwt.verify(token, Security.AuthJson.secret, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    message: 'Token inválido!'
                })
            } else {
                next()
            }
        })
    }
}