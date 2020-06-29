const express = require('express');
const { articleIdCelebrate, articlePostCelebrate } = require('../middlewares/celebrate');

const articlesRouter = express.Router();
const {
  getArticles, createArticle, deleteArticle,
} = require('../controllers/articles');

articlesRouter.get('/', getArticles);
articlesRouter.post('/', articlePostCelebrate, createArticle);
articlesRouter.delete('/:articleId', articleIdCelebrate, deleteArticle);

module.exports = articlesRouter;
