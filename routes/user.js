'use strict'

const express = require('express')
const router = express.Router()
const USER = require('../controller/user')
// const auth = require('../middlewares/auth') MIDDLEWARE PARA AUTENTICACAO POR TOKEN (*_-)
const _USER = new USER()

router.get('/', _USER.get)
router.get('/registro', _USER.getRegistro)
router.get('/login', _USER.getLogin)
router.get('/edit/id/:id', _USER.getById)

router.post('/registro', _USER.postRegistro)
router.post('/login', _USER.postLogin)
router.post('/edit', _USER.update)
router.post('/update/:id', _USER.update)
router.post('/delete/:id', _USER.delete)

module.exports = router