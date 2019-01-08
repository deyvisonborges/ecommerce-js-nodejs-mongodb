// cadastrando minha categoria
require('../models/categoria')

// chamando o mongoose
const mongoose = require('mongoose')
// chamando meu schema e atribuindo a variavel categoria_model
const categoria_model = mongoose.model('Categoria')

// definindo minha classe e seus métodos estáticos
class Categoria { 
    constructor() {}
    
    // adicionando um documento á minha coleção
    static async create(data) {
        return await new categoria_model(data).save()
    }

    // retornando todos os documentos da minha coleção
    static async getAll() {
        return await categoria_model.find();
    }

    // peganda a quantidade de documentos na minha coleção
    static async getItemsCart() {
        const itemsCart = await categoria_model.collection.estimatedDocumentCount()
        return itemsCart  
    }
}

// exportando minha classe
module.exports = Categoria