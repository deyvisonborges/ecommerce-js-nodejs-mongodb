'use strict'

const mongoose = require('mongoose');

class Mongoose {
    constructor(model) {    
        mongoose_model = mongoose.model(model);
        return mongoose_model;
    }
}

module.exports = Mongoose;