const mongoose = require('mongoose');
const { isCelebrate, CelebrateError } = require('celebrate');
const { internalServerError } = require('../constants/en_messages');

module.exports.errorHandler = (err, req, res, next) => { // eslint-disable-line
  const { statusCode = 500, message } = err;
  if (isCelebrate(err)) {
    res.status(400).send({ message: CelebrateError(err.joi).message });
    return;
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map((error) => error.message);
    res.status(400).send({ message: { ...errors } });
    return;
  }

  const resultMessage = statusCode === 500 ? internalServerError : message;
  res
    .status(statusCode)
    .send({ message: resultMessage });
};
