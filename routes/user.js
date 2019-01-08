'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controller/user')
const auth = require('../middlewares/auth')

let _c = new controller()

// router.use(auth)

// rest padrao
router.get('/', _c.get)

// rest edicao e exclusão
router.get('/edit/:id', _c.getById)
//router.put('/edit/:id', _c.update)

// rest register
router.get('/registro', _c.getRegistro)
router.post('/registro', _c.postRegistro)

// rest login
router.get('/login', _c.getLogin)
router.post('/login', _c.postLogin)

module.exports = router