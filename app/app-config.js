const RateLimit = require('express-rate-limit');
require('dotenv').config();

// Server, DB - config
const { PORT = 3000, JWT_SECRET, NODE_ENV = 'development' } = process.env;
const MONGO_URL = 'mongodb://localhost:27017/news-analyzer-db';
const SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'super-super-secret-key';
const CORS_WHITELIST = [
  'http://localhost:8080',
  'http://localhost:8081',
  'http://news-explorer.website',
  'https://news-explorer.website',
  'http://www.news-explorer.website',
  'https://www.news-explorer.website',
];
const MIN_PASS_LENGTH = 6;
const SEVEN_DAY_IN_MILLISECONDS = 3600000 * 24 * 7;
const apiLimiter = new RateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

module.exports = {
  PORT,
  apiLimiter,
  SECRET_KEY,
  MONGO_URL,
  MIN_PASS_LENGTH,
  SEVEN_DAY_IN_MILLISECONDS,
  CORS_WHITELIST,
};
