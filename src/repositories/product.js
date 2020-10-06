'use strict';

require('../models/product');
const mongoose = require('mongoose');
const product_model = mongoose.model('Produto');

class Produto {
  // adicionando produto
  static async create(id, data) {
    const tags = data.tag.split(',');
    await product_model(data);
    await product_model.insertMany(tags);
    return await product_model.save();
  }

  // atualizando produto
  static async update(id, data) {
    return await product_model.findOneAndUpdate(id, { $set: data });
  }

  // deletando produto
  static async delete(id) {
    return await product_model.findByIdAndRemove(id);
  }

  // buscando
  static async getAll() {
    return await product_model.find({});
  }

  // verificando se o produto já existe
  static async verifyProduct(data) {
    return await product_model.findOne(data);
  }
}

module.exports = Produto;
