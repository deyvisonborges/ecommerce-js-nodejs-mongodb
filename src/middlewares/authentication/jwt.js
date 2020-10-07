const cookie = require('js-cookie');


const authorize = (SECRET_AUTH) => async (req, res, next) => {
  try {
    if (!SECRET_AUTH) {
      throw new Error('Security token not injected');
    } else {
      const headerToken = req.headers['authorization'];
      const localToken = await cookie.get('login');

      if (!headerToken || !localToken) {
        throw new Error('Token not found');
      }
      return next();
    }
  } catch (err) {
    next(err.message);
  }
};

module.exports = {
  authorize,
};
