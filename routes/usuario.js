'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controller/usuario')

let _control = new controller()

// rest padrao
router.get('/', _control.get)
router.get('/:id(\\d+)', _control.getById)
router.put('/:id(\\d+)', _control.update)
router.delete('/:id(\\d+)', _control.delete)

// rest register
router.get('/registro', _control.getRegistro)
router.post('/registro', _control.postRegistro)

// rest login
router.get('/login', _control.getLogin)
router.post('/login', _control.postLogin)
module.exports = router