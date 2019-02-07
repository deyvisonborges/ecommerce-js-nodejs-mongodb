'use strict'

require('../models/user')
const mongoose = require('mongoose')
const user_model = mongoose.model('Usuario')

const crypt = require('bcryptjs')
const salt = 10

class User {
    // CRIANDO USUARIO
    static async create(data) {
        const newUser = { 
            nome: data.nome, 
            email: data.email, 
            senha: data.senha
        }
        const hash = await crypt.hash(newUser.senha, salt) // CRIPTOGRAFANDO A SENHA
        newUser.senha = hash 
        return await user_model(newUser).save()
    }

    // ATUALIZANDO USUARIO
    static async update(id, data) {
        return await user_model.findOneAndUpdate(id, { $set: data })
    }

    // DELETANDO USUARIO
    static async delete(id) {
        return user_model.findOneAndDelete(id)
    }

    // BUSCANDO USUARIO PELO ID
    static async getById(id) {
        return await user_model.findById(id)
    }

    // BUSCANDO TODOS OS USUARIOS
    static async getAll() {
        return await user_model.find({});
    }

    // VERIFICACAO DE REGISTRO
    static async registerVerification(data) {
        const { email } = data
        const user = await user_model.findOne({email})
        return user
    }

    // AUTENTICANDO LOGIN
    static async loginVerification(data) {
        const { email, senha } = data
        const user = await user_model.findOne({email}).select('+senha')
        return user
    }

    // QUANTIDADE DE USUARIOS NO BANCO
    static async getUsersQtd() {
        const qtd = await user_model.collection.estimatedDocumentCount()
        return qtd  
    }
}

module.exports = User