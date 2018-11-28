'use strict'

require('../models/categoria')

const mongoose = require('mongoose')
const categoria = mongoose.model('Categoria')

// conceito de Funcões Construturas - JavaScript
function categoria_controller() {}

categoria_controller.prototype.post = async (req, res) => {
    let modelo = new categoria(req.body)
    let resultado = await modelo.save()
    res.send(resultado)
}
categoria_controller.prototype.put = async (req, res) => {
    await categoria.findByIdAndUpdate(req.params.id, {$set: req.body}) // procure pela id e atualize
    // quando ele encontrar, ele vai setar ($set) o conteudo do corpo da requisicao
    let categoria_encontrada = await categoria.findById(req.params.id)
    res.send(categoria_encontrada)
}
categoria_controller.prototype.get = async (req, res) => {
    let lista = await categoria.find()
    res.send(lista)
}
categoria_controller.prototype.getById = async (req, res) => { 
    let categoria_encontrada = await categoria.findById(req.params.id)
    res.send(categoria_encontrada)
}
categoria_controller.prototype.delete = async (req, res) => { 
    let categoria_deletada = await categoria.findByIdAndRemove(req.params.id)
    res.send(categoria_deletada)
}

module.exports = categoria_controller;