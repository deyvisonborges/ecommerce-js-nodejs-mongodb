const mongoose = require('mongoose');

const usuario_model = new mongoose.Schema(
  {
    nome: {
      trim: true,
      createIndexes: true,
      required: true,
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    senha: {
      type: String,
      required: true,
      select: false, // pra nao retornar a senha quando for uma consulta publica
    },
  },
  { versionKey: false }
);

/*
usuario_model.pre('save', async next => {
    const hash = await crypt.hash(this.senha, 10)
    this.senha = hash
    next()
}) */
module.exports = mongoose.model('Usuario', usuario_model);
