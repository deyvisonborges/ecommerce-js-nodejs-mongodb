'use strict'

const User = require('../repositories/user')
const crypt = require('bcryptjs')

function user_control() {}

user_control.prototype.get = async (req, res, next) => { 
    const users = await User.getAll()
    res.render('pages/user/_users-list', {user: users}) 
}

user_control.prototype.getById = async (req, res, next) => {
    try {
        const user = await User.getById(req.params.id)
        if(user) {
            return res.render('pages/user/_user-edit', {user: user, success: 'Encontramos o usuário!'})
        } else {
            return res.render('pages/user/_user-edit', {error: 'Não conseguimos encontrar o usuário!'})
        }
    } catch(err) {
        next(err)
    }
}

// controllers de registro de usuários
user_control.prototype.getRegistro = async (req, res) => { res.render('pages/user/_register') }
user_control.prototype.postRegistro = async (req, res, next) => {
    try {
        const user = await User.registerVerification(req.body)
        if(!user) {
            const userCreated = await User.create(req.body)
            userCreated.senha = undefined
            return res.render('pages/user/_register', {success: 'Usuário cadastrado com sucesso!'})
        } else {
            return res.render('pages/user/_register', {error: 'Usuário já foi cadastrado!'})
        } 
    } catch(err) {
        next(err)
    }
}

// controllers de login de usuários
user_control.prototype.getLogin = async (req, res) => { res.render('pages/user/_login') }
user_control.prototype.postLogin = async (req, res, next) => {
    try {
        const user = await User.loginVerification(req.body)
        

        if(!user) // se noa possui usuario...
            return res.render('pages/user/_login', { error: 'O Usuário não foi encontrado!'})

        if(!await crypt.compare(req.body.senha, user.senha)) // se as senhas nao combinam...
            return res.render('pages/user/_login', { error: 'Senha inválida!'})
        
        user.senha = undefined // oculto minha senha pra nao vir no meu retorno
        res.header(await User.generateToken({id: user.id}))

        /*res.status(200).send({
            user, 
            token: await User.generateToken({id: user.id})
        })*/
    } catch(err) {
        next(err)
    }
}

module.exports = user_control