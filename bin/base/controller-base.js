exports.post = async(repository, validationContract, req, res) => {
    try {
        let data = req.body
        if (!validationContract.isValid()) {
            res.status(400).send({
                message: "Existem dados inválidos na sua requisição!",
                validation: validationContract.errors()
            }).end()
            return
        }
        let resultado = await respository.create(data)
        res.send(resultado)
    } catch (error) {
        console.log("Post com erro: " + error)
        res.send({
            message: "Erro no processamento!",
            error: err
        })
    }
}

exports.put = async(repository, validationContract, req, res) => {
    try {
        let data = req.body
        if (!validationContract.isValid()) {
            res.status(400).send({
                message: "Existem dados inválidos na sua requisição!",
                validation: validationContract.errors()
            }).end()
            return
        }
        let resultado = await respository.update(req.params.id, data)
        res.send(resultado)
    } catch (error) {
        console.log("Post com erro: " + error)
        res.send({
            message: "Erro no processamento!",
            error: err
        })
    }
}

exports.get = async(repository, req, res) => {
    try {
        let data = await repository.getAll()
        res.send(data)
    } catch (error) {
        console.log("GET com erro: " + error)
        res.send({
            message: "Erro no processamento!",
            error: err
        })
    }
}

exports.getById = async(repository, req, res) => {
    try {
        let id = req.params.id
        if (id) {
            let data = await respository.getById(id)
            res.send(data)
        } else {
            res.send({
                message: "o parâmetro ID precisa ser informado"
            })
        }
    } catch (error) {
        console.log("GET com erro: " + error)
        res.send({
            message: "Erro no processamento!",
            error: err
        })
    }
}

exports.delete = async(repository, req, res) => {
    try {
        let id = req.params.id
        if (id) {
            let data = await repository.delete(id)
            res.send('Registro excluido com sucesso')
        } else {
            res.send({
                message: "o parâmetro ID precisa ser informado"
            })
        }
    } catch (error) {
        console.log("Delete com erro: " + error)
        res.send({
            message: "Erro no processamento!",
            error: err
        })
    }
}

