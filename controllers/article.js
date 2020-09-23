const Article = require('../models/article');
const { NotFoundError } = require('../errors/notFoundError');
const { RightsError } = require('../errors/rightsError');

module.exports.createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.send({ data: article }))
    .catch((err) => { next(err); });
};

module.exports.getAllSavedArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((cards) => res.send({ data: cards }))
    .catch((err) => next(err));
};

module.exports.deleteArticle = (req, res, next) => {
  console.log(req.params.articleId);
  Article.findById(req.params.articleId)
    .orFail(new NotFoundError('Данная статья отсутвует, либо была ранее удалена'))
    .then((article) => {
      if (!(req.user._id === article.owner.toString())) {
        throw new RightsError('Не знаю как такое возможно! Однако, невозможно удалять сохраненные статьи других пользователей');
      }
      return article;
    })
    .then((article) => Article.findByIdAndRemove(article._id))
    .then((article) => res.send({ data: article }))
    .catch((err) => { next(err); });
};
