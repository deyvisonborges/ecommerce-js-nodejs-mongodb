'use strict'

const mongoose = require('mongoose')

class repository_base {
    // passo, através do construtor, o meu modelo
    constructor(model) {
        // ex.: categoria = mongoose.model('Categoria')
        this._model = mongoose.model(model) // O _ (significa que é uma informacao privada)
            // meu atributo interno recebe os dados da Collection
    }
    
    async create(data) {
        // toda vez que der um POST o meu metodo cria um novo objeto com os dados que eu informei para 
        // o meu banco de dados (no caso, a collection)
        let modelo = new this._model(data) // cria um novo objeto com os atributos do meu schemasTypes
        let resultado = await modelo.save() // insiro, com o save, ele na minha colecao
        return resultado // retorno para poder mostrar os dados em minha render
    }

    async update(id, data) {
        // consulta a minha coleção (this._model) e faço a atualização da informação do documento
        await this._model.findByIdAndUpdate(id, { $set: data })
        // retorno os dados do documento atualizado para eu renderizar na minha handlebars
        let resultado = await this._model.findById(id)
        return resultado
    }

    async getAll() {
        // retorno todos os documentos da minha collection
        return await this._model.find()
    }

    async getById(id) {
        // retorno, pelo ID, um documento da minha colletcion
        return await this._model.findById(id)
    }

    async delete(id) {
        // deleto, pelo ID, um documento da minha coleção
        return await this._model.findByIdAndRemove(id)
    }
}

module.exports = repository_base