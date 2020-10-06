'use strict';

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const customer_model = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Customer', customer_model);
