const jwt = require('jsonwebtoken');
const config = require("../../config");
const User = require("../models/user")

exports.verifyToken = function(authHeader) {
  try {
    if (!authHeader) {
      return false;
    }
    const token = authHeader.split(' ')[1];
    const verifiedToken = jwt.verify(token, config.secret);
    console.log(verifiedToken);
    return verifiedToken;
  }
  catch(e) {
    console.log(e);
    return false;
  }
}
