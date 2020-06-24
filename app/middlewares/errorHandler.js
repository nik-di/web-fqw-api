const mongoose = require('mongoose');
const { isCelebrate, CelebrateError } = require('celebrate');
const { internalServerError } = require('../constants/en_messages');

module.exports.errorHandler = (err, req, res, next) => { // eslint-disable-next-line no-unused-vars
  const { statusCode = 500, message } = err;
  if (isCelebrate(err)) {
    res.status(400).send({ statusCode: 400, message: CelebrateError(err.joi).message });
    return;
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map((error) => error.message);
    res.status(400).send({ statusCode: 400, message: { ...errors } });
    return;
  }

  const resultMessage = statusCode === 500 ? internalServerError : message;
  res
    .status(statusCode)
    .send({ statusCode, message: resultMessage });
};
