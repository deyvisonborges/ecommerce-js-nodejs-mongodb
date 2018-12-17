// módulos
const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose')
const variables = require('../bin/config/variables')
const hbs = require('express-handlebars')
const session = require('express-session')
const flash = require('flash')

// app
const app = express();

// routers
const categoria_router = require('../routes/categoria')
const produto_router = require('../routes/produto')
const usuario_router = require('../routes/usuario')

// nomeando rotas
app.use('/api/categoria', categoria_router)
app.use('/api/produto', produto_router)
app.use('/api/usuario', usuario_router)

// Configurando sessões
app.use(session({
    secret: "@d2018", // chave que gera sessao
    resave: true,
    saveUninitialized: true
}))
 
// Configurando flash
app.use(flash())

// Configurando o parse
app.use(bp.json());
app.use(bp.urlencoded({extended: false}));

//definindo o meu template engine
app.engine('handlebars', hbs({defaultLayout: 'main'}))

// Configurando Template Engine
app.set('view engine', 'handlebars') // Definir o motor de visualização para usar
app.use(express.static('public'))

// configurando a conexao com o banco de dados
mongoose.connect(variables.Database.connection)

// ao chamar minhas rotas
app.get('/', (req, res) => {
    res.render('login')
})
app.get('/success', (req, res) => {
    res.render('success')
})

// tratamento de erro 404
app.use((err, req, res, next) => {
    res.render('error')
})

// Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg') // criei uma variavel global com res.locals
    res.locals.error_msg = req.flash('error_msg')
    next()
})

module.exports = app;