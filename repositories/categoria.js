/*
    Aqui eu atribuo os metodos do modelo (repositorio base) à minha variavel interna this._base
    informando a collection que o construtor exige passar
*/

// Aqui também é um modelo, que servirá pra minha controller

// Registro meu modelo (schema) para a 'Categoria'
require('../models/categoria')

//Chamo meu repositório
const base = require('../bin/base/repository-base')

class categoria_repository { 
    constructor() {
        this._base = new base('Categoria')
    }
    async create(data) {
        // acesso o metodo create e populo na minha this._base
        return await this._base.create(data)
    }

    async update(id, data) {
        return await this._base.update(id, data)
    }

    async getAll() {
        return await this._base.getAll()
    }

    async getById(id) {
        return await this._base.getById(id)
    }

    async delete(id) {
        return await this._base.delete(id)
    }
}

module.exports = categoria_repository