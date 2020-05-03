const mongoose = require('mongoose');
const packageValidator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const { incorrectPathInSchema, notUniquePathInSchema } = require('../app-config');

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
    minlength: 6,
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

userSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.plugin(uniqueValidator, { message: notUniquePathInSchema });

module.exports = mongoose.model('user', userSchema);
