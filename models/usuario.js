const mongoose = require('mongoose')
const schema = mongoose.Schema

const usuario_model = new schema({
    nome: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    }
}, {versionKey: false})


module.exports = mongoose.model('Usuario', usuario_model)
