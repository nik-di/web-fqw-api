const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const router = express.Router();
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const { auth } = require('../middlewares/auth');
const { errorHandler } = require('../middlewares/errorHandler');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const { signupUser, signinUser, logOut } = require('../controllers/users');
const { pageNotFound } = require('../constants/en_messages');
const { userSignupCelebrate, userSigninCelebrate } = require('../middlewares/celebrate');
const NotFoundError = require('../utils/NotFoundError');

router.use(cookieParser());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(requestLogger);
router.post('/signup', userSignupCelebrate, signupUser);
router.post('/signin', userSigninCelebrate, signinUser);
router.use('*', auth);
router.post('/logout', logOut);
router.use('/users', usersRouter);
router.use('/articles', articlesRouter);
router.use((req, res, next) => next(new NotFoundError(pageNotFound)));
router.use(errorLogger);
router.use(errorHandler);

module.exports = router;
