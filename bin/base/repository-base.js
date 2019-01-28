'use strict'

const mongoose = require('mongoose')

class repository_base {
    constructor(model) {
        this._model = mongoose.model(model)
    }
    
    async create(data) {
        return new this._model(data).save()
    }

    static async update(id, data) {
        await this._model.findByIdAndUpdate(id, { $set: data })
        let resultado = await this._model.findById(id)
        return resultado
    }

    static async getAll() {
        return await this._model.find()
    }

    static async getById(id) {
        return await this._model.findById(id)
    }

    static async getItemsCart() {
        return await this._model.collection.estimatedDocumentCount()
    }

    static async delete(id) {
        return await this._model.findByIdAndRemove(id)
    }
}

module.exports = repository_base