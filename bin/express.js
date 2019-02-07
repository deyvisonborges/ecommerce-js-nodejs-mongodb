/*
    ////////////////////////////////////////////////////////////////

    Criado por DEYVISON BORGES - Gestor de Tecnologia da Informação
    Dados: 'Sistema E-commerce com JavaScript, NodeJS e MongoDB'
    E-mail: web.dborges@gmail.com

    ////////////////////////////////////////////////////////////////

    Github: https://github.com/deeborges
    Linkedin: https://linkedin/in/deyvisonborges
    Instagram: https://instagram.com/dee.borges

    ////////////////////////////////////////////////////////////////
    
    Notas do autor:
        ///
            Este é um material de meus estudos de forma autodidata.
            Você pode editar, recriar nomes de variáveis, rodar a baiana que eu nem me importo.
            Ah, mas se você quiser usar em algum trabalho de sua faculdade ou quaisquer entidades
            que ministram cursos, por favor, atribua meu nome ao seu projeto juntamente com minhas
            redes sociais. 
            Ficarei muito agradecido e também muito honrado em ver meu projeto (que me dediquei muito pra fazer)
            ter chegado tão longe.

            Ele ainda não está completo... porém, você pode usar ele tranquilamente:
                editar, listar, excluir e atualizar -> usuários, produtos e categorias...
            A idéia é expandir o máximo possivel e para isso utilizei alguns conceitos de Orientação a Objetos
            e em breve estarei adicionando Design Patters e outras coisinhas super legais.

            Espero que goste e que ganhe muito dinheito com esse projeto.
        ///
*/

// módulos
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const variables = require('../bin/config/variables')
const hbs = require('express-handlebars')
const session = require('express-session')

// app
const app = express();

// chamando as rotas
const user_router = require('../routes/user')
const product_router = require('../routes/product')

// configurando a conexao com o bando de dados
mongoose.Promise = global.Promise
mongoose.connect(variables.Database.connection)

// configurando o parse
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// configurando a sessão
app.use(session({ secret: 'ecommerce', resave: false, saveUninitialized: false }))

// nomeando as rotas
app.use('/api/usuario', user_router)
app.use('/api/produto', product_router)

app.engine('handlebars', hbs({defaultLayout: 'main'})) // definindo o meu template engine
app.set('view engine', 'handlebars') // definindo o motor de renderização
app.use(express.static('public')) // carregando arquivos estáticos

app.use('/', (req, res, next) => { res.render('home') }) // rota principal
app.use((req, res, next) => { res.render('pages/errors/404') }) // tratamento para erro 404
app.use((err, req, res, next) => { res.send(err.message) }) // tratamento para demais erros

module.exports = app;