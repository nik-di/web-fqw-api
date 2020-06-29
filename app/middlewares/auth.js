const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../app-config');
const { notLogged } = require('../constants/en_messages');
const NotAuthError = require('../utils/NotAuthError');

module.exports.auth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new NotAuthError(notLogged);

  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    next(error);
  }
  req.user = payload;
  next();
};
