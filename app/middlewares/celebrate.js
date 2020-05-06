const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const validator = require('validator');
const { MIN_PASS_LENGTH } = require('../app-config');
const { incorrectLink } = require('../constants/en_messages');
const BadRequestError = require('../utils/BadRequestError');

const userSignupCelebrate = celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().required().regex(/application\/json/),
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(MIN_PASS_LENGTH),
    email: Joi.string().required().email(),
  }),
});

const userSigninCelebrate = celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().required().regex(/application\/json/),
  }).unknown(true),
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(MIN_PASS_LENGTH),
  }),
});

const articleIdCelebrate = celebrate({
  params: Joi.object().keys({
    articleId: Joi.objectId(),
  }),
});

const articlePostCelebrate = celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().required().regex(/application\/json/),
  }).unknown(true),
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required().min(2),
    text: Joi.string().required().min(2),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom((link) => {
      if (!validator.isURL(link)) throw new BadRequestError(incorrectLink);
      return link;
    }),
    image: Joi.string().required().custom((link) => {
      if (!validator.isURL(link)) throw new BadRequestError(incorrectLink);
      return link;
    }),
  }),
});

module.exports = {
  userSigninCelebrate,
  userSignupCelebrate,
  articleIdCelebrate,
  articlePostCelebrate,
};
