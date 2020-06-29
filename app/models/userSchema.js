const mongoose = require('mongoose');
const packageValidator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
const { MIN_PASS_LENGTH } = require('../app-config');
const {
  incorrectPathInSchema, notUniquePathInSchema, incorrectEmailOrPassword,
} = require('../constants/en_messages');
const BadRequestError = require('../utils/BadRequestError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: (email) => packageValidator.isEmail(email),
      message: incorrectPathInSchema,
    },
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: MIN_PASS_LENGTH,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
}, { versionKey: false });

userSchema.statics.findAndAuth = function findAndAuth({ email, password }) {
  return this.findOne({ email })
    .orFail(new BadRequestError(incorrectEmailOrPassword))
    .select('+password')
    .then((user) => bcrypt.compare(password, user.password)
      .then((isOk) => {
        if (isOk) return user;
        throw new BadRequestError(incorrectEmailOrPassword);
      }));
};

userSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.plugin(uniqueValidator, { message: notUniquePathInSchema });

module.exports = mongoose.model('user', userSchema);
