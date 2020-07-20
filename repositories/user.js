'use strict'

require('../models/user');

const mongoose = require('mongoose');
const user_model = mongoose.model('Usuario');

const iUserCryptInfo = require('../middlewares/authentication');

class User {
    constructor(data){
        this._user = data;
        this._service_crypt = iUserCryptInfo(data); // o massa eh que voce pode ou nao utilizar essaa interface, ISP
    }

    async create() {
        this._user = this._service_crypt.encryptPassword(this._user);
        return await user_model(this._user).save();
    }

    static async update(id, data) {
        return await user_model.findOneAndUpdate(id, { $set: data });
    }

    static async delete(id) {
        return user_model.findOneAndDelete(id);
    }

    static async getById(id) {
        return await user_model.findById(id);
    }

    static async getAll() {
        return await user_model.find({});
    }

    static async registerVerification(data) {
        const { email } = data;
        const user = await user_model.findOne({email});
        return user;
    }

    static async get(data) {
        const { email, senha } = data;
        const user = await user_model.findOne({email}).select('+senha');
        return user;
    }

    static async getUsersQtd() {
        const qtd = await user_model.collection.estimatedDocumentCount();
        return qtd;
    }
}

module.exports = User;


// https://khalilstemmler.com/articles/solid-principles/solid-typescript/