const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

function auth(req, res, next) {
  try {
    const { authorization } = req.headers;
    console.log(authorization);
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return next(new UnauthorizedError('Необходимо авторизоваться'));
    }

    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, 'super-strong-secret');
    } catch (err) {
      return next(new UnauthorizedError('Необходимо авторизоваться'));
    }

    req.user = payload;
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = { auth };
