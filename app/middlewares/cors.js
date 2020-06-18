const cors = require('cors');
const { CORS_WHITELIST } = require('../app-config');

const corsOptionsDelegate = (req, callback) => {
  const { origin } = req.headers;
  let corsOptions;
  if (CORS_WHITELIST.indexOf(origin) !== -1) {
    corsOptions = {
      origin: true,
      credentials: true,
    };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

module.exports.corsControl = cors(corsOptionsDelegate);
