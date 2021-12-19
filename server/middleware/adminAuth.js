const decode = require("../utils/authentication");

module.exports = (req, res, next) => { // TODO:
  try {
    const decodedToken = decode(req.headers.authorization);
    const userRole = decodedToken.role;

    if (userRole && userRole !== 0) {
      throw 'You do not have access to admin rights';
    }
    else {
      console.log('successful')
      return next();
    }
  }
  catch(e) {
    res.status(401).send({
      message: e,
      error: e.message
    })
  }
}
