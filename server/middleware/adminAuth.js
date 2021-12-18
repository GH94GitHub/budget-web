const decode = require("../utils/authentication");

module.exports = (req, res, next) => { // TODO:
  try {
    const decodedToken = decode(req.headers.authorization);
    const userRole = decodedToken.role;

    if (userRole && userRole !== 0) {
      throw 'No Access'
    }
    else {
      console.log('successful')
      next();
    }
  }
  catch(e) {
    res.status(401).send({
      error: e.error
    })
  }
}
