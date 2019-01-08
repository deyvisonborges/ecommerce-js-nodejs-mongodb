'use strict'

require('../models/user')
const mongoose = require('mongoose')
const user_model = mongoose.model('Usuario')

const jwt = require('jsonwebtoken')
const Security = require('../bin/config/variables')

const crypt = require('bcryptjs')
const salt = 10

class User {
    // criando usuario
    static async create(data) {
        const newUser = {
            nome: data.nome,
            email: data.email,
            senha: data.senha
        }
        const hash = await crypt.hash(newUser.senha, salt)
        newUser.senha = hash  
        return await user_model(newUser).save()
    }

    static update(data) {
        //return await user_model.findOneAndUpdate()
    }
    // buscando usuario pelo ID
    static async getById(id) {
        return await user_model.findById(id)
    }

    // buscando todos os usuarios
    static async getAll() {
        return await user_model.find({});
    }

    // verificando usuario existente
    static async registerVerification(data) {
        const { email } = data
        const user = await user_model.findOne({email})
        return user
    }

    // autenticando login
    static async loginVerification(data) {
        const { email, senha } = data
        const user = await user_model.findOne({email}).select('+senha')
        return user
    }
    
    // gerando token
    static async generateToken( params = {}) {
        return await jwt.sign(params, Security.AuthJson.secret, {
            expiresIn: 86400 // o meu token vai expirar em 1 dia
        })
    }
}

module.exports = User