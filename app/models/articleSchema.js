const mongoose = require('mongoose');
const packageValidator = require('validator');
const { incorrectPathInSchema } = require('../app-config');

const articleSchema = new mongoose.Schema({
  keyword: { type: String, required: true },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator: (link) => packageValidator.isURL(link),
      message: incorrectPathInSchema,
    },
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: (link) => packageValidator.isURL(link),
      message: incorrectPathInSchema,
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
