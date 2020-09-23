const router = require('express').Router(); // вызываем метод Router
const {
  celebrate, Joi, Segments,
} = require('celebrate');
const { createArticle } = require('../controllers/article');

router.post('/', celebrate({
  [Segments.BODY]: Joi.object({
    keyword: Joi.string().required().min(2),
    title: Joi.string().required().min(2),
    text: Joi.string().required().min(2),
    date: Joi.date().required(),
    source: Joi.string().required().min(2),
    link: Joi.string().required().regex(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/),
    image: Joi.string().required().regex(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/),
  }),
}), createArticle);

// router.get('/', getCards);
// router.delete('/:cardid', celebrate({
//   [Segments.PARAMS]: Joi.object({
//     cardid: Joi.string().hex(),
//   }),
// }), deleteCard);

module.exports = router;
