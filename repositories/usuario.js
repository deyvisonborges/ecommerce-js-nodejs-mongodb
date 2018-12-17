require('../models/usuario')

const repository_base = require('../bin/base/repository-base')
const md5 = require('md5')

class usuario_repository {
    constructor() {
        this._base = new repository_base('Usuario')
        this.projection = 'nome email _id'
    }

    async isEmailExist(Email) {
        return await this._base._model.findOne({email: Email}, this.projection)
    }

    async autenticacao(Email, Senha) {
        // antes de passar a senha pra la...
        let _hashSenha = md5(Senha)
        // acesso os dados no meu modelo e procuro na coleção um documento que contenha os dados passados
        // pra nao retornar a senha do usuario na consulta, eu crio uma projecao (que é o nome dos campos)
        return await this._base._model.findOne({ email: Email, senha: _hashSenha}, this.projection)
    }

    async create(data) {
        let usuario_criado = await this._base.create(data)
        return this._base._model.findById(usuario_criado._id, this.projection)
    }

    async update(id, data) {
        let usuario_atualizado = await this._base.update(id, {
            nome: data.nome,
            email: data.email,
            foto: data.foto
        })
        return this._base._model.findById(usuario_atualizado._id, this.projection)     
    }

    async getAll() {
        return await this._base._model.find({}, this.projection) // todos os campos irao ter projeção
    }

    async getById(id) {
        return await this._base._model.findById(id, 'nome email _id foto')
    }

    async delete(id) {
        return await this._base.delete(id)
    }
}

module.exports = usuario_repository