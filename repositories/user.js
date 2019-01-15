'use strict'

require('../models/user')
const mongoose = require('mongoose')
const user_model = mongoose.model('Usuario')

const crypt = require('bcryptjs')
const salt = 10

class User {
    // criando usuario
    static async create(data) {
        const newUser = { nome: data.nome, email: data.email, senha: data.senha }
        const hash = await crypt.hash(newUser.senha, salt) // criptografo a senha
        newUser.senha = hash  // adiciono a senha criptografada no campo senha do objeto newUser
        return await user_model(newUser).save()
    }

    // atualizando informacoes do usuario
    static async update(id, data) {
        return await user_model.findByIdAndUpdate(id, { $set: data })
    }

    // deletando usuario
    static async delete(id) {
        return user_model.findByIdAndDelete(id)
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

    static async getUsersQtd() {
        const qtd = await user_model.collection.estimatedDocumentCount()
        return qtd  
    }
}

module.exports = User