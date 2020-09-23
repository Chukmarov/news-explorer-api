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

// module.exports.getCards = (req, res, next) => {
//   Card.find({})
//     .then((cards) => res.send({ data: cards }))
//     .catch((err) => next(err));
// };

// module.exports.deleteCard = (req, res, next) => {
//   Card.findById(req.params.cardid)
//     .orFail(new NotFoundError('Данная карточка отсутсвует в базе'))
//     .then((card) => {
//       if (!(req.user._id === card.owner.toString())) {
//         throw new RightsError('Невозможно удалять карточки других пользователей');
//       }
//       return card;
//     })
//     .then((card) => Card.findByIdAndRemove(card._id))
//     .then((card) => res.send({ data: card }))
//     .catch((err) => { next(err); });
// };
