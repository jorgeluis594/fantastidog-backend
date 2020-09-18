const jwt = require('jsonwebtoken');

const error = require('../utils/errors');
const config = require('../config');

// eslint-disable-next-line prefer-destructuring
const secret = config.jwt.secret;

function sign(data) {
  return jwt.sign(data, secret);
}

function verify(token) {
  return jwt.verify(token, secret);
}

const check = {
  own: (req, owner) => {
    // eslint-disable-next-line no-use-before-define
    const decoded = decodeHeader(req);
    if (decoded.id !== parseInt(owner, 10)) {
      throw error('you cannot do this', 401);
    }
  },
};

function getToken(auth) {
  if (!auth) {
    throw new Error("couldn't found token");
  }
  if (auth.indexOf('Bearer ') === -1) {
    throw new Error('Token has invalid format');
  }

  const token = auth.replace('Bearer ', '');
  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
}

module.exports = {
  sign,
  check,
};
