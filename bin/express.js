// MÓDULOS
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const variables = require('../bin/config/variables')
const hbs = require('express-handlebars')
const session = require('express-session')

// APP
const app = express();

// CONFIGURANDO O PARSER
app.use(bodyParser.json({
    limit: '5mb' // LIMITANDO O TAMANHO DE ARQUIVOS
}));
app.use(bodyParser.urlencoded({
    extended: true}
));

// CONFIGURANDO A SESSÃO
app.use(session({ secret: 'ecommerce', resave: false, saveUninitialized: false }))

// CHAMANDO AS ROTAS
const user_router = require('../routes/user')

// NOMEANDO AS ROTAS
app.use('/api/usuario', user_router)

app.engine('handlebars', hbs({defaultLayout: 'main'})) // DEFININDO O MEU TEMPLATE ENGINE
app.set('view engine', 'handlebars') // DEFININDO O MOTO DE VISUALIZAÇÃO
app.use(express.static('public')) // CARREGANDO ARQUIVOS ESTÁTICOS

// CONFIGURANDO A CONEXAO COM O BANCO DE DADOS
mongoose.Promise = global.Promise
mongoose.connect(variables.Database.connection)


app.use('/', (req, res, next) => { res.render('home') }) // ROTA PRINCIPAL
app.use((req, res, next) => { res.render('pages/errors/404') }) // TRATAMENTO DE ERRO 404
app.use((err, req, res, next) => { res.send(err.message) }) // TRATAMENTO PARA DEMAIS ERRROS

module.exports = app;