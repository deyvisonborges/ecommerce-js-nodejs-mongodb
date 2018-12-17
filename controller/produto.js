'use strict'
const produto_repository = require('../repositories/produto')

function produto_controller() {}

produto_controller.prototype.post = async (req, res, next) => { 
    let p = await new produto_repository().create(req.body)
    res.send(p)
}
produto_controller.prototype.put = async (req, res) => { 
    let p = await new produto_repository.create(req.params.id, req.body)
    res.send(p)
}
produto_controller.prototype.get = async (req, res) => {
    let p = await new produto_repository.getAll()
    res.send(p)
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