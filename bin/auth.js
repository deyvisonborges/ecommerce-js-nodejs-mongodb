const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const crypt = require('bcryptjs')

require('../models/usuario')
const Usuario = mongoose.model('Usuario')

module.exports = function(passport) {
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email, senha, done) => {
        Usuario.findOne({email: email}).then( user => {
            if(!user) {
                return done(null, false, {message: 'Esta conta não existe!'})
            } else {
                crypt.compare(senha, user.senha, (err, compare) => {
                    if(compare) {
                        return done(null, user)
                    } else {
                        return done(null, false, {message: 'Senha incorreta!'})
                    }
                }) 
            }
        })
    }))    

    // salva os dados de usuario em uma sessao
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        Usuario.findById(id, (err, user) => {
            done(err, user)
        })
    })
}