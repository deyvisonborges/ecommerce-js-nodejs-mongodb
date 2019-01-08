'use strict'

const jwt = require('jsonwebtoken')
const Security = require('../bin/config/variables')

module.exports  = async (req, res, next) => {
    const authHeader  = req.headers.authorization

    if(!authHeader)
        return res.status(401).send('O Token não foi informado!')

    const parts = authHeader.split(' ')

    if(!parts.length == 2) { // dividindo o meu token em 2 partes
        return res.status(401).send({err: 'Token error!'})
        const [ scheme, token ] = parts
    }

    // regex pra ver se no meu scheme possui o bearer do meu token
    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({err: 'Token mal formatado!'})

    jwt.verify(token, Security.AuthJson.secret, (err, decoded) => {
        if(err) return status(401).send({err: 'Token inválido!'})
        req.userId = decoded.id
        return next()
    })
}