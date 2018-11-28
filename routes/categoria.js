const express = require("express")
const router = express.Router()
const controller = require('../controller/categoria')

let control = new controller();

router.get('/', control.get)
router.get('/:id', control.getById)
router.post('/', control.post)
router.put('/:id', control.put)
router.delete('/:id', control.delete)

module.exports = router;