const express = require("express")
const router = express.Router()
const categoria_controller = require('../controller/categoria')

let _control = new categoria_controller();

router.get('/', _control.get)
router.get('/:id', _control.getById)
router.post('/', _control.post)
router.put('/:id', _control.put)
router.delete('/:id', _control.delete)

module.exports = router;