'use strict';

const express = require('express');
const userRoutes = express.Router();
const userControllers = require('../controller/user');
const { authorize } = require('../middlewares/authentication/jwt');

const environments = require('../../env');
const authenticationSecret = environments.authenticationToken.secret;

// GET for rotas
userRoutes.get('/', authorize(authenticationSecret), userControllers.get);
userRoutes.get('/registro', userControllers.getRegistro);
userRoutes.get('/login', userControllers.getLogin);
userRoutes.get('/logout', userControllers.logout);
userRoutes.get('/edit/id/:id', authorize(authenticationSecret), userControllers.getById);

// POST for rotas
userRoutes.post('/registro', userControllers.postRegistro);
userRoutes.post('/login', userControllers.postLogin);
userRoutes.post('/edit', authorize(authenticationSecret), userControllers.update);
userRoutes.post('/update/:id', authorize(authenticationSecret), userControllers.update);
userRoutes.post('/delete/:id', authorize(authenticationSecret), userControllers.delete);

module.exports = userRoutes;
