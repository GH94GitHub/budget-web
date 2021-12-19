const decode = require("../utils/authentication");

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send({
        message: "You do not have access."
      })
    }
    const decodedToken = decode(req.headers.authorization);
    const userRole = decodedToken.role;

    if (userRole && userRole !== 0) {
      throw 'You do not have access to admin rights';
    }
    else {
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
