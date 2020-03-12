const crypt = require('bcryptjs')
const salt = 10

/**
 * @SOLID
 * isolei esse comportamento baseado em alguns principios do SOLID,
 * suponde que a estratégia de criptografia das informações possa mudar.
 * Isso me permite desacomplar esse serviço do repositório e alterá-lo 
 * quando eu quiser sem afetar o escopo do repositorio. (cada um com 
 * sua responsabilidade: um salva, o outro valida)
 */
class UserService {
    constructor(data) {
        this._user = data;
    }

    async encryptPassword() {
        let new_user = { 
            nome: this._user.nome, 
            email: this._user.email, 
            senha: this._user.senha
        }
        const hash = await crypt.hash(new_user.senha, salt);
        return new_user.senha = hash;
    }
}

module.exports = new UserService();