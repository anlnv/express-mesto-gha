const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

function auth(req, res, next) {
  try {
    const { authorization } = req.headers;
    console.log(authorization);
    if (!authorization || !authorization.startsWith('Bearer ')) {
      next(new UnauthorizedError('Необходимо авторизоваться'));
      return;
    }

    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, 'super-strong-secret');
    } catch (err) {
      next(new UnauthorizedError('Необходимо авторизоваться'));
      return;
    }

    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { auth };
