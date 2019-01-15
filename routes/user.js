'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controller/user')
const auth = require('../middlewares/auth')
let _c = new controller()

// rest register
router.get('/registro', _c.getRegistro)
router.post('/registro', _c.postRegistro)
// rest login
router.get('/login', _c.getLogin)
router.post('/login', _c.postLogin)

router.get('/', _c.get)
router.put('/:id', _c.update)
router.post('/:id', _c.delete)

// rest edicao e exclusão
router.post('/edit', _c.update)
router.get('/edit/:id(\\d+)', _c.getById)






module.exports = router