const cors = require('cors');
const { CORS_WHITELIST } = require('../app-config');

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (CORS_WHITELIST.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error(`Origin: ${origin} is not allowed`));
    }
  },
};

module.exports.cors = cors(corsOptions);
