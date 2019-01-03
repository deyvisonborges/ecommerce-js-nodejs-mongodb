'use strict'

const User = require('../repositories/user')

function user_control() {}

// controllers de registro de usuários
user_control.prototype.getRegistro = async (req, res) => { res.render('pages/user/register') }
user_control.prototype.postRegistro = async (req, res, next) => {
    try {
        const user = await User.registerVerification(req.body.email);
        if(!user) {
            await User.create(req.body)
            return res.redirect('/api/usuario/registro') 
        } else {
            res.send('Usuário já existe')
        } 
    } catch(err) {
        next(err)
    }
}

// controllers de login de usuários
user_control.prototype.getLogin = async (req, res) => { res.render('pages/user/login') }
user_control.prototype.postLogin = async (req, res, next) => {
    try {
        const user = await User.loginVerification(req.body.senha)
        if(user) {
            return res.send('Login efetuado com sucesso')
        } else {
            return res.send('Não foi possível fazer login. Dados não conferem!')
        }
    } catch(err) {
        next(err)
    }
}



user_control.prototype.update = async (req, res) => {
    let result = await user.update(req.params.id, req.body)
    res.send(result)
}

user_control.prototype.get = async (req, res) => {
    res.render('pages/user/dashboard')
}

user_control.prototype.getById = async (req, res) => {
    let result = await user.getById(req.params.id)
    res.send(result)
}

user_control.prototype.delete = async (req, res) => {
    let result = await user.delete(req.params.id)
    res.send(result)
}



module.exports = user_control