// módulos
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const variables = require('../bin/config/variables')
const hbs = require('express-handlebars')


// app
const app = express();

// Configurando o parse;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// chamando as rotas
const categoria_router = require('../routes/categoria')
const produto_router = require('../routes/produto')
const usuario_router = require('../routes/usuario')

// nomeando as rotas
app.use('/api/categoria', categoria_router)
app.use('/api/produto', produto_router)
app.use('/api/usuario', usuario_router)

//definindo o meu template engine
app.engine('handlebars', hbs({defaultLayout: 'main'}))
// Configurando Template Engine
app.set('view engine', 'handlebars') // Definir o motor de visualização para usar
app.use(express.static('public'))

// configurando a conexao com o banco de dados
mongoose.connect(variables.Database.connection, {useNewUrlParser: false})

// ao chamar minhas rotas
app.get('/', (req, res, next) => {
    res.render('pages/user/login')
})

// tratamento de erro 404
app.use((req, res, next) => {
    res.render('pages/errors/404')
})

// tratamento de erro 500
app.use((err, req, res, next) => {  
   res.send(err.message)
})

module.exports = app;