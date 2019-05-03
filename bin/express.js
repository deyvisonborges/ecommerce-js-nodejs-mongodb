// módulos
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const variables = require('../bin/config/variables');
const hbs = require('express-handlebars');

// app
const app = express();

// chamando as rotas
const user_router = require('../routes/user');
const product_router = require('../routes/product');

// configurando a conexao com o bando de dados
mongoose.Promise = global.Promise;
mongoose.connect(variables.Database.connection);

// configurando o parse
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// definindo o meu template engine
app.engine('handlebars', hbs({defaultLayout: 'main'}));

// definindo o motor de renderização
app.set('view engine', 'handlebars'); 

// carregando arquivos estáticos
app.use(express.static('public')); 

// nomeando as rotas
app.use('/api/usuario', user_router);
app.use('/api/produto', product_router);

app.use('/', (req, res, next) => { 
    res.render('home'); 
}); // rota principal
app.use((req, res, next) => { 
    res.render('pages/errors/404'); 
}); // tratamento para erro 404
app.use((err, req, res, next) => { 
    res.send(err.message); 
}); // tratamento para demais erros

module.exports = app;