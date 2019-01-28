'use strict'
const categoria = require('../repositories/category')
    
function categoria_controller() {}

categoria_controller.prototype.post = async (req, res, next) => {
    try {
        await categoria.create(req.body)
        res.redirect('/api/categoria')
    }catch(err) {
        next(err)
    }
}

categoria_controller.prototype.put = async (req, res, next) => {
    let resultado = await categoria.update(req.params.id, req.body)
    res.send(resultado)
}

categoria_controller.prototype.get = async (req, res, next) => {
    try {
        let categorias = await categoria.getAll()
        res.render('pages/categoria/_list', {categorias: categorias})
    }catch(err) {
        next(err)
    }
}

categoria_controller.prototype.getById = async (req, res, next) => { 
    try {
        let categoria = await categoria.getById(req.params.id)
        res.send(categoria)
    } catch(err) {
        next(err)
    }
}

categoria_controller.prototype.delete = async (req, res) => { 
    let deletado = await categoria.delete(req.params.id)
    res.send(deletado)
}

categoria_controller.prototype.register = async (req, res, next) => {
    try {
        let categorias = await categoria.getAll()
        res.render('pages/admin/register-category', {categorias: categorias})
    } catch(err) {
        next(err)
    }
}

module.exports = categoria_controller;