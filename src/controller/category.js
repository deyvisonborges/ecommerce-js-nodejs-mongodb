'use strict';
const Categoria = require('../repositories/category');

exports.get = async (req, res, next) => {
  try {
    let categorias = await Categoria.getAll();
    res.render('pages/categoria/_list', { categorias: categorias });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    let categoria = await Categoria.getById(req.params.id);
    res.send(categoria);
  } catch (err) {
    next(err);
  }
};

exports.post = async (req, res, next) => {
  try {
    await Categoria.create(req.body);
    res.redirect('/api/categoria');
  } catch (err) {
    next(err);
  }
};

exports.put = async (req, res, next) => {
  let resultado = await Categoria.update(req.params.id, req.body);
  res.send(resultado);
};

exports.delete = async (req, res) => {
  let deletado = await Categoria.delete(req.params.id);
  res.send(deletado);
};

exports.register = async (req, res, next) => {
  try {
    let categorias = await Categoria.getAll();
    res.render('pages/admin/register-category', { categorias: categorias });
  } catch (err) {
    next(err);
  }
};
