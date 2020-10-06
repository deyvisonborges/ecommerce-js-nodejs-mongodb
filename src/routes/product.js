'use strict';

const express = require('express');
const productRoutes = express.Router();
const _PRODUTO = require('../controller/product');

productRoutes.get('/', _PRODUTO.getAll);
productRoutes.post('/cadastro', _PRODUTO.create);

module.exports = productRoutes;
