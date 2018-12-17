'use strict'
const categoria_repository = require('../repositories/categoria')
let categoria = new categoria_repository()

function categoria_controller() {}

categoria_controller.prototype.post = async (req, res, next) => {
    try{
        let resultado = await categoria.create(req.body)
        res.send(resultado)
        req.flash('sucess_msg')
    }catch(err){
        next(err)
    }
}

categoria_controller.prototype.put = async (req, res, next) => {
    let resultado = await categoria.update(req.params.id, req.body)
    res.send(resultado)
}

categoria_controller.prototype.get = async (req, res, next) => {
    await categoria.getAll()
        .then( categoria => {
            res.render('error', {categoria: categoria})
    })
        .catch(err => {
            res.redirect('/')
    })
}

categoria_controller.prototype.getById = async (req, res, next) => { 
    let categoria = await categoria.getById(req.params.id)
    res.send(categoria)
}

categoria_controller.prototype.delete = async (req, res, next) => { 
    let deletado = await categoria.delete(req.params.id)
    res.send(deletado)
}

module.exports = categoria_controller;