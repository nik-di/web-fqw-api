const RateLimit = require('express-rate-limit');
require('dotenv').config();

// Server, DB - config
const { PORT = 3000, JWT_SECRET, NODE_ENV = 'development' } = process.env;
const MONGO_URL = 'mongodb://localhost:27017/news-analyzer-db';
const SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'super-super-secret-key';
const apiLimiter = new RateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

const incorrectPathInSchema = 'Incorrect {PATH} in Schema';
const notUniquePathInSchema = 'Not unique {PATH} in Schema';

module.exports = {
  PORT,
  apiLimiter,
  SECRET_KEY,
  MONGO_URL,
  incorrectPathInSchema,
  notUniquePathInSchema,
};
