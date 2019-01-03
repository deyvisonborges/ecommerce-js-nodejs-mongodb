const express = require("express")
const categoria_controller = require('../controller/category')
const router = express.Router()

let _control = new categoria_controller();

router.get('/', _control.get)
router.get('/:id(\\d+)', _control.getById)
router.post('/', _control.post)
router.put('/:id(\\d+)', _control.put)
router.delete('/:id(\\d+)', _control.delete)

// rotas do registro de categorias
router.get('/registrar', _control.register)
router.post('/registrar', _control.post)

module.exports = router;