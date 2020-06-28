const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  MIN_PASS_LENGTH, SECRET_KEY, SEVEN_DAY_IN_MILLISECONDS,
} = require('../app-config');
const { passLengthInvalid } = require('../constants/en_messages');
const User = require('../models/userSchema');
const BadRequestError = require('../utils/BadRequestError');

module.exports.getUserInfo = (req, res, next) => {
  const { _id } = req.user;
  User.findById({ _id })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.signupUser = (req, res, next) => {
  const { email, password, name } = req.body;

  if (password.length < MIN_PASS_LENGTH) {
    throw new BadRequestError(passLengthInvalid + MIN_PASS_LENGTH);
  }

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => res.status(201).send(user))
    .catch(next);
};

module.exports.signinUser = (req, res, next) => {
  User.findAndAuth(req.body)
    .then((user) => {
      const { _id } = user;
      const token = jwt.sign({ _id }, SECRET_KEY, { expiresIn: '7d' });
      res
        .cookie(
          'token',
          token,
          {
            maxAge: SEVEN_DAY_IN_MILLISECONDS,
            httpOnly: true,
            // sameSite: true,
          },
        )
        .end();
    })
    .catch(next);
};

module.exports.logOut = (req, res, next) => {
  try {
    res.clearCookie('token').status(204).end();
  } catch (error) {
    next(error);
  }
};
