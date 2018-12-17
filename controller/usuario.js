'use strict'

const validation = require('../bin/helpers/validation')
const usuario_repository = require('../repositories/usuario')
const user = new usuario_repository


function usuario_controller() {}

usuario_controller.prototype.post = async (req, res) => {
    // garantir que ele vai passar pro resultado se ele tiver válido
    let _validation_contract = new validation()   
    let data = req.body

    _validation_contract.isRequired(
        data.email, 
        'Informe seu email'
    )
    _validation_contract.isEmail(
        data.email, 
        'O email informado é inválido'
    )
    _validation_contract.isRequired(
        data.senha, 
        'A senha informada é inválida'
    )
    _validation_contract.isRequired(
        data.senhaConfirmacao, 
        'A senha de confirmação é obrigatória'
    )
    _validation_contract.isTrue(
        data.senha != data.senhaConfirmacao, 
        'A senha e a confirmação não são iguais'
    )

    /* para criar o usuario, o emial nao pode existir */
    let usuarioEmailExiste = await user.isEmailExist(data.email)
        if (usuarioEmailExiste) {
            // se ele for diferente de undefined, vamos adicionar uma informacao
            _validation_contract.isTrue(
                (usuarioEmailExiste.nome != undefined, 
                    ` Já existe o email ${data.email}`)
            )
        }

    let result = await user.create(req.body)
    res.send(result)
} 

usuario_controller.prototype.update = async (req, res) => {
    let result = await user.update(req.params.id, req.body)
    res.send(result)
}

usuario_controller.prototype.get = async (req, res) => {
    let result = await user.getAll()
    res.send(result)
}

usuario_controller.prototype.getById = async (req, res) => {
    let result = await user.getById(req.params.id)
    res.send(result)
}

usuario_controller.prototype.delete = async (req, res) => {
    let result = await user.delete(req.params.id)
    res.send(result)
}

module.exports = usuario_controller