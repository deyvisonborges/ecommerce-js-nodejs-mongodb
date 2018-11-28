'use strict'

require('../models/produto')

const mongoose = require('mongoose')
const produto = mongoose.model('Produto')

// conceito de Funcões Construturas - JavaScript
function produto_controller() {}

produto_controller.prototype.post = async (req, res, next) => { 
    let p = new produto(req.body)
    let result = await p.save()
    res.redirect('/success')
}
produto_controller.prototype.put = async (req, res) => { 
    await produto.findByIdAndUpdate(req.params.id, {$set: req.body})
    let p = await produto.findById(req.params.id)
    res.send(p)
}
produto_controller.prototype.get = async (req, res) => {
    res.render('form-produto')
 }
produto_controller.prototype.getById = async (req, res) => { 
    let p = await produto.findById(req.params.id)
    res.send(p)
}
produto_controller.prototype.delete =  (req, res) => { }

module.exports = produto_controller;