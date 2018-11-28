// módulos
const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose')
const variables = require('../bin/config/variables')
const path = require('path')
const hbs = require('express-handlebars')

// routers
const categoria_router = require('../routes/categoria')
const produto_router = require('../routes/produto')

// app
const app = express();

// Configurando o parse
app.use(bp.json());
app.use(bp.urlencoded({extended: false}));

// Todos os arquivos no diretório público são atendidos adicionando o nome do arquivo (relativo ao diretório "público" base) ao URL base.
// meus arquivos estaticos
app.use(express.static(path.join(__dirname, 'public')))
//definindo o meu template engine
app.engine('handlebars', hbs({defaultLayout: 'main'}))
// Configurando Template Engine
app.set('view engine', 'handlebars') // Definir o motor de visualização para usar

// configurando a conexao com o banco de dados
mongoose.connect(variables.Database.connection)

// routers configuration
app.use(express.static(path.join('public')))

app.get('/success', (req, res) => {
    res.render('success')
})
app.use('/api/categoria', categoria_router)
app.use('/api/produto', produto_router)


module.exports = app;