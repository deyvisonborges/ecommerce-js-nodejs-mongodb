'use strict';

const mongoose = require('mongoose');
const schema = mongoose.Schema;

// definindo o modelo
const categoria_model = new schema(
  {
    titulo: {
      trim: true,
      createIndexes: true,
      required: true,
      type: String,
    },
    descricao: {
      type: String,
      required: true,
    },
    dataCriacao: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

// antes de salvar ele verifica se foi setado a data
categoria_model.pre('save', (next) => {
  let agora = new Date();
  if (!this.dataCriacao) {
    this.dataCriacao = agora;
    next(); // prossiga pro salvamento
  }
});

module.exports = mongoose.model('Categoria', categoria_model);
