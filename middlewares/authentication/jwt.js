const lc = require('localtoken');
const cons = require('consolidate');

const authorize = (SECRET_AUTH) => (req, res, next) => {
  try {
    if (!SECRET_AUTH) {
      throw new Error('[DEV_ERROR] You need to inject a configuration to authorize a request!');
    } else {
      const header_token = req.headers['authorization'] || lc.getInLocal('token');
      console.log(header_token)
      if (!header_token) {
        console.log('token not fouind')
        throw new Error('Token not found');
      }
      return next();  
    }
  } catch (err) {
    next(err.message);
  }
}

module.exports = {
  authorize
}