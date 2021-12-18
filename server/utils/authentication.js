const jwt = require('jsonwebtoken');
const config = require("../../config");

module.exports = function(authHeader) {
  const token = authHeader.split(' ')[1];
  return jwt.verify(token, config.secret);
}
