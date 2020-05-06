const RateLimit = require('express-rate-limit');

module.exports.apiLimiter = new RateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});
