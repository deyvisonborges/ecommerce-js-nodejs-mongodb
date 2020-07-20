'use strict'

const express = require('express')
const router = express.Router()
const _USER = require('../controller/user')

const CONFIG_AUTH = require('../core/auth.json');
const { authorize } = require('../middlewares/authentication/jwt');

// GET for rotas
router.get('/', authorize(CONFIG_AUTH.SECRET_AUTH), _USER.get)
router.get('/registro', _USER.getRegistro)
router.get('/login', _USER.getLogin)
router.get('/logout', _USER.logout)
router.get('/edit/id/:id', authorize(CONFIG_AUTH.SECRET_AUTH), _USER.getById)

// POST for rotas
router.post('/registro', _USER.postRegistro)
router.post('/login', _USER.postLogin)
router.post('/edit', authorize(CONFIG_AUTH.SECRET_AUTH), _USER.update)
router.post('/update/:id', authorize(CONFIG_AUTH.SECRET_AUTH), _USER.update)
router.post('/delete/:id', authorize(CONFIG_AUTH.SECRET_AUTH), _USER.delete)

module.exports = router