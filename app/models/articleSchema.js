const mongoose = require('mongoose');
const packageValidator = require('validator');
const { incorrectPathInSchema, articleNotFound } = require('../constants/en_messages');
const NotFoundError = require('../utils/NotFoundError');

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
}, { versionKey: false });

articleSchema.statics.findArticle = function findArticle(articleId) {
  return this.findById(articleId)
    .orFail(new NotFoundError(articleNotFound))
    .select('+owner')
    .then((user) => user);
};

articleSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.owner;
  return obj;
};

module.exports = mongoose.model('article', articleSchema);
