'use strict' // pra trabalhar com minificacao e outros recursos

const app = require('./bin/express')
const variables = require('./bin/config/variables');

app.listen(variables.Api.port, () => {
    console.log("Servidor iniciado na porta 3000");
})