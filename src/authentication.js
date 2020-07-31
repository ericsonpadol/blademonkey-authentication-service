const jwt = require('jsonwebtoken');
const config = require('config');
const logger = require('../config/logger');

// eslint-disable-next-line consistent-return
module.exports.authorization = (req, res, next) => {
  // get the token from the header
  let token = req.headers.authorization;

  logger.info(token);

  if (!token) {
    return res.status(401).json({
      error: {
        message: 'Unauthorized Access!',
      },
    });
  }

  // strip the bearer from the token
  token = token.startsWith('Bearer ') ? (token = token.slice(7, token.length)) : token;

  try {
    const decoded = jwt.verify(token, config.get('app.jwt.secret'));

    logger.info(decoded);

    req.user = decoded.user;
    next();
  } catch (error) {
    logger.error(error);
    return res.status(401).json({ error: { message: 'Invalid Token' } });
  }
};
