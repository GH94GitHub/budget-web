const jwt = require('jsonwebtoken');
const decode = require('../utils/authentication');

module.exports = (req, res, next) => {
  try{
    const decodedToken = decode(req.headers.authorization)
    const userName = decodedToken.userName;

    //
    if (req.body.userName && req.body.userName !== userName) {
      throw 'Invalid user ID';
    } else {
      console.log('successful');
      next();
    }
  }
  catch(e) {
    console.log(e.message);
    res.status(401).send({
      message: "Invalid Request"
    });
  }
};
