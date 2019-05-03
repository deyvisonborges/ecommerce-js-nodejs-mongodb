const variables = {
    Api: {
        port: process.env.port || 3000 
    },
    Database: {
        connection: process.env.connection || 'mongodb://127.0.0.1:27017' // acesso local
        // mLab => 'mongodb://<nome_do_usuario:link_do_bando/nome_da_colecao' 
    },
    AuthJson: {
        secret: '232ioh3po4u23h42e23e03023ieh230he23'
    }
}

module.exports = variables;