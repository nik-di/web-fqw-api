const Article = require('../models/articleSchema');
const ForbiddenError = require('../utils/ForbiddenError');
const { permissionDenied } = require('../constants/en_messages');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.send(articles))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const { _id } = req.user;

  Article.create({
    keyword, title, text, date, source, link, image, owner: _id,
  })
    .then((article) => res.status(201).send(article))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  const { _id } = req.user || null;
  const { articleId } = req.params;
  Article.findArticle(articleId)
    .then((card) => {
      if (card.owner.equals(_id)) {
        card.remove();
        res.status(200).end();
      }
      throw new ForbiddenError(permissionDenied);
    })
    .catch(next);
};
