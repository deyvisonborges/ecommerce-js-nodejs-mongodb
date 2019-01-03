'use strict'

require('../models/usuario')
const mongoose = require('mongoose')
const user_model = mongoose.model('Usuario')
const crypt = require('bcryptjs')

const salt = 10

class User {
    static async create(data) {
        let newUser = {
            nome: data.nome,
            email: data.email,
            senha: data.senha
        }
        const hash = await crypt.hash(newUser.senha, salt)
        newUser.senha = hash;  
        return await user_model(newUser).save()
    }

    static async registerVerification(e) {
        const userEmail = await user_model.findOne({email: e})
        return userEmail
    }

    static async loginVerification(s) {
        const user = user_model.findOne({senha: s})
        const senha = user.getQuery('senha')
        senha.senha
        await crypt.compare(s, senha)
        return true
    }
}

module.exports = User