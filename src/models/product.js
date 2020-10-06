'use strict';

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const produto_model = new schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    tag: [
      {
        type: String,
        required: true,
      },
    ],
    dataCriacao: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

produto_model.pre('save', (next) => {
  let agora = new Date();
  if (!this.dataCriacao) {
    this.dataCriacao = agora;
    next();
  }
});

module.exports = mongoose.model('Produto', produto_model);
