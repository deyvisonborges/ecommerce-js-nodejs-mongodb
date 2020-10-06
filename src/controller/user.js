'use strict';

const User = require('../repositories/user'); // acessando repositorio do banco de dados
const auth = require('../middlewares/authentication'); // token
const crypt = require('bcryptjs'); // para criptografar a senha
const storage = require('node-sessionstorage'); // para autenticar

// buscando usuario
exports.get = async (req, res, next) => {
  try {
    const users = await User.getAll();
    const qtd = await User.getUsersQtd();
    return res.render('pages/user/_users-list', { user: users, qtd: qtd });
  } catch (err) {
    next(err);
  }
};

// buscando usuario pela ID
exports.getById = async (req, res, next) => {
  try {
    const user = await User.getById(req.params.id);
    if (user) {
      return res.render('pages/user/_user-edit', {
        user: user,
        success: 'Encontramos o usuário!',
      });
    } else {
      return res.render('pages/user/_user-edit', {
        error: 'Não conseguimos encontrar o usuário!',
      });
    }
  } catch (err) {
    next(err);
  }
};

// atualizando usuario
exports.update = async (req, res, next) => {
  try {
    await User.update(req.params.id, req.body);
    return res.render('pages/user/_user-edit', {
      success: 'Dados atualizados com sucesso!',
    });
  } catch (err) {
    next(err);
  }
};

// deletando usuario
exports.delete = async (req, res, next) => {
  try {
    await User.delete(req.params.id);
    return res.redirect('/api/usuario');
  } catch (err) {
    next(err);
  }
};

// GET for registro de usuário
exports.getRegistro = (req, res) => {
  return res.render('pages/user/_register');
};

// POST for registro de usuário
exports.postRegistro = async (req, res, next) => {
  try {
    const user = await User.registerVerification(req.body);
    if (!user) {
      const novoUsuario = await User.create(req.body);
      return res.render('pages/user/_register', {
        success: 'Usuário cadastrado com sucesso!',
      });
    } else {
      return res.render('pages/user/_register', {
        error: 'Usuário já foi cadastrado!',
      });
    }
  } catch (err) {
    next(err);
  }
};

// GET for login de usuário
exports.getLogin = (req, res) => {
  return res.render('pages/user/_login');
};

// POST for login de usuário
exports.postLogin = async (req, res, next) => {
  try {
    const user = await User.loginVerification(req.body);
    console.log('....', user)
    if (!user)
      // se o usuario nao existe...
      return res.render('pages/user/_login', {
        error: 'O Usuário não foi encontrado!',
      });

    if (!(await crypt.compare(req.body.senha, user.senha)))
      // se as senhas nao combinam...
      return res.render('pages/user/_login', { error: 'Senha inválida!' });

    const token = await auth.generateToken({ user });
    storage.setItem('login', token);
    return res.render('pages/user/_login', {
      success: 'Usuário logado com sucesso!',
    });
  } catch (err) {
    next(err);
  }
};

// logout - removendo token da 'sessão'
exports.logout = async (req, res, next) => {
  try {
    await storage.removeItem('login');
    return res.redirect('/');
  } catch (err) {
    next(err);
  }
};
