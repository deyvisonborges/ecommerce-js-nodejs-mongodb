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
    },
    foto: {
        type: String
    },
    ativo: {
        type: Boolean,
        required: true
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    }
}, {versionKey: false})

usuario_model.pre('save', next => {
        let agora = new Data()
        if(!this.dataCriacao) {
            this.dataCriacao = agora
        }
        next()
})

module.exports = mongoose.model('Usuario', usuario_model)