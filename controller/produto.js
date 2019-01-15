'use strict'
const flash = require('connect-flash')
const produto_repository = require('../repositories/produto')
let produto = new produto_repository

function produto_controller() {}

produto_controller.prototype.post = async (req, res, next) => { 
    var erros = []
    const { body } = require('express-validator')
    
    if(!req.body.nome || typeof req.body.nome == undefined || noreq.body.nomeme == null) {
        erros.push({texto: 'Título inválido'})
    } 
        
    if(erros > 0) {
        res.render('error_msg', {erros: erros})
    } else {
        produto.create(req.body)
    }
}
produto_controller.prototype.put = async (req, res) => { 
    let p = await new produto_repository.create(req.params.id, req.body)
    res.send(p)
}
produto_controller.prototype.get = async (req, res) => {
    res.render('pages/produtos/products')
 }
produto_controller.prototype.getById = async (req, res) => { 
    let p = await new produto_repository.getById(req.params.id)
    res.send(p)
}
produto_controller.prototype.delete = async (req, res) => { 
    let deletado = await new produto_repository.delete(req.params.id)
    res.send(deletado)
}

module.exports = produto_controller;