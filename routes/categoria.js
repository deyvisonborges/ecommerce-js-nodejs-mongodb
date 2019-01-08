const express = require("express")
const categoria_cler = require('../controller/category')
const router = express.Router()

let _c = new categoria_cler();

router.get('/', _c.get)
router.get('/:id(\\d+)', _c.getById)
router.post('/', _c.post)
router.put('/:id(\\d+)', _c.put)
router.delete('/:id(\\d+)', _c.delete)

// rotas do registro de categorias
router.get('/registrar', _c.register)
router.post('/registrar', _c.post)

module.exports = router;