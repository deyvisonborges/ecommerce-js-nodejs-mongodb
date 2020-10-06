'use strict';

const Produto = require('../repositories/product');

// criando produto
exports.create = async (req, res, next) => {
  try {
    const tags = req.body.tag;
    const produtoExiste = Produto.verifyProduct(req.body);
    if (!produtoExiste) {
      await Produto.create(req.body);
      return res.send('Produto cadastrado com sucesso!');
    } else {
      return res.send('Esse produto já foi cadastrado!');
    }
  } catch (err) {
    next(err);
  }
};

// buscando produtos
exports.getAll = async (req, res, next) => {
  try {
    const products = await Produto.getAll();
    return res.json(products);
  } catch (err) {
    next(err);
  }
};
