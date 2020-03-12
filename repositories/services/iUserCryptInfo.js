const crypt = require('bcryptjs')
const salt = 10

/**
 * @SOLID - OCP e SRP
 * isolei esse comportamento baseado em alguns principios do SOLID,
 * suponde que a estratégia de criptografia das informações possa mudar.
 * Isso me permite desacomplar esse serviço do repositório e alterá-lo 
 * quando eu quiser sem afetar o escopo do repositorio. (cada um com 
 * sua responsabilidade: um salva, o outro valida)
 */
class iUserCryptInfo {
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

module.exports = new iUserCryptInfo();

/**
 * eh uma especie de contrato mesmo
 * "Pra salvar no banco, tem que criptografar."
 * 
 * Princípio Aberto-Fechado. A mudança de comportamento deve ser possível sem alterar código existente. Por exemplo, utilizando pontos de extenção, onde a classe base não é alterada, mas tem seu comportamento complementado através de abstrações e/ou interfaces, criando código que pode ser plugado ao já existente.
 */