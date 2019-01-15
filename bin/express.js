// módulos
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const variables = require('../bin/config/variables')
const hbs = require('express-handlebars')
const session = require('express-session')

// app
const app = express();

// Configurando o parse;
app.use(bodyParser.json({
    limit: '5mb' // limitando o tamanho dos meus arquivos
}));
app.use(bodyParser.urlencoded({
    extended: true}
));

// habilitando CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, x-access-token')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Credentials', '*')
    res.header('Access-Control-Expose-Headers', 'x-access-token')
    next()
})

// Configurando sessão
app.use(session({ secret: 'ecommerce', resave: false, saveUninitialized: false }))

// chamando as rotas
const categoria_router = require('../routes/categoria')
const produto_router = require('../routes/produto')
const user_router = require('../routes/user')

// nomeando as rotas
app.use('/api/categoria', categoria_router)
app.use('/api/produto', produto_router)
app.use('/api/usuario', user_router)

//definindo o meu template engine
app.engine('handlebars', hbs({defaultLayout: 'main'}))
// Configurando Template Engine
app.set('view engine', 'handlebars') // Definir o motor de visualização para usar
app.use(express.static('public'))

// configurando a conexao com o banco de dados
mongoose.connect(variables.Database.connection, {useNewUrlParser: false})
mongoose.Promise = global.Promise

// ao chamar minhas rotas
app.get('/', (req, res, next) => {
    res.send('Olá!')
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