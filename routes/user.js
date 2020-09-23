const router = require('express').Router();
const {
  celebrate, Joi, Segments,
} = require('celebrate');

const { getInfoAboutMe } = require('../controllers/user.js');

router.get('/me', getInfoAboutMe);

module.exports = router;
