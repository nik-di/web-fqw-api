const express = require('express');

const articlesRouter = express.Router();
const {
  getArticles, createArticle, deleteArticle,
} = require('../controllers/articles');

articlesRouter.get('/', getArticles);
articlesRouter.post('/', createArticle);
articlesRouter.delete('/:articleId', deleteArticle);

module.exports = articlesRouter;
