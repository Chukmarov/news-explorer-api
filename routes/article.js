const router = require('express').Router(); // вызываем метод Router
const {
  celebrate, Joi, Segments,
} = require('celebrate');
const { createArticle, getAllSavedArticles, deleteArticle } = require('../controllers/article');

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

router.get('/', getAllSavedArticles);

router.delete('/:articleId', celebrate({
  [Segments.PARAMS]: Joi.object({
    articleId: Joi.string().hex(),
  }),
}), deleteArticle);

module.exports = router;
