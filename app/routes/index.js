const express = require('express');

const router = express.Router();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const { auth } = require('../middlewares/auth');
const { errorHandler } = require('../middlewares/errorHandler');
const { signupUser, signinUser, logOut } = require('../controllers/users');
const { pageNotFound } = require('../constants/en_messages');
const NotFoundError = require('../utils/NotFoundError');

router.use(cookieParser());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/signup', signupUser);
router.post('/signin', signinUser);
router.use('*', auth);
router.post('/logout', logOut);
router.use('/users', usersRouter);
router.use('/articles', articlesRouter);
router.use((req, res, next) => next(new NotFoundError(pageNotFound)));
router.use(errorHandler);

module.exports = router;
