'use strict'

const User = require('../repositories/user')
const auth = require('../middlewares/auth')
const crypt = require('bcryptjs')

function user_control() {}

user_control.prototype.get = async (req, res, next) => { 
    const users = await User.getAll()
    const qtd = await User.getUsersQtd()
    res.render('pages/user/_users-list', {user: users, qtd: qtd}) 
}

user_control.prototype.update = async (req, res, next) => {
    try {
        const data = req.body
        await User.update(req.params.id, data)
        res.send('Dados atualizados com sucesso!')
    } catch (err) {
        next(err)
    }
}

user_control.prototype.delete = async (req, res, next) => {
    try {
        await User.delete(req.params.id)
        return res.redirect('/api/usuario')
    } catch (err) {
        next(err)
    }
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
            await User.create(req.body)
            return res.render('pages/user/_register', {success: 'Usuário cadastrado com sucesso!'})
        } else {
            return res.render('pages/user/_register', {error: 'Usuário já foi cadastrado!'})
        } 
    } catch(err) {
        next(err)
    }
}

// controllers de login de usuários
user_control.prototype.getLogin = async (req, res) => {
    const user = await User.loginVerification(req.body)
    const token = await auth.generateToken({user})
    req.body.token = token
    return res.render('pages/user/_login', {token: token})
}
user_control.prototype.postLogin = async (req, res, next) => {
    try {
        const user = await User.loginVerification(req.body)
        const token = await auth.generateToken({user})
        req.body.token = token
        if(!user) // se noa possui usuario...
            return res.render('pages/user/_login', { error: 'O Usuário não foi encontrado!'})

        if(!await crypt.compare(req.body.senha, user.senha)) // se as senhas nao combinam...
            return res.render('pages/user/_login', { error: 'Senha inválida!'})
        
        user.senha = undefined // oculto minha senha pra nao vir no meu retorno
        res.header('auth', 'token')
        res.render('pages/user/_login', {success: 'Usuário logado com sucesso!'})
        console.log(token)
    } catch(err) {
        next(err)
    }
}

module.exports = user_control