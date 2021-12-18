const jwt = require('jsonwebtoken');
const decode = require("../utils/authentication");

module.exports = (req, res, next) => { // TODO:
  const decodedToken = decode(req.headers.authorization)
}
