const router = require('express').Router();

const { getInfoAboutMe } = require('../controllers/user.js');

router.get('/me', getInfoAboutMe);

module.exports = router;
