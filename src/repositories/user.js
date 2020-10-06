'use strict';

require('../models/user');

const mongoose = require('mongoose');
const userModel = mongoose.model('Usuario');

class User {
  static async create(data) {
    return await userModel(data).save();
  }

  static async update(id, data) {
    return await userModel.findOneAndUpdate(id, { $set: data });
  }

  static async delete(id) {
    return userModel.findOneAndDelete(id);
  }

  static async getById(id) {
    return await userModel.findById(id);
  }

  static async getAll() {
    return await userModel.find({});
  }

  static async registerVerification(data) {
    const { email } = data;
    const user = await userModel.findOne({ email });
    return user;
  }

  static async loginVerification(data) {
    const { email, senha } = data;
    const user = await userModel.findOne({ email }).select('+senha');
    return user;
  }

  static async getUsersQtd() {
    const qtd = await userModel.collection.estimatedDocumentCount();
    return qtd;
  }
}

module.exports = User;
