'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controller/usuario')

let _control = new controller()

router.get('/', _control.get)
router.get('/:id', _control.getById)
router.post('/', _control.post)
router.put('/:id', _control.update)
router.delete('/:id', _control.delete)

module.exports = router