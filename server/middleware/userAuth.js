const decode = require('../utils/authentication');
const ErrorResponse = require('../services/ErrorResponse');

module.exports = (req, res, next) => {
  try{
    if (!req.headers.authorization) {
      const errorResponse = new ErrorResponse(401, "You do not have permission", null);
      return res.status(errorResponse.httpCode).json(errorResponse);
    }
    const decodedToken = decode(req.headers.authorization)
    const userName = decodedToken.userName;

    if (decodedToken.role === 0) {
      console.log('admin');
      return next();
    }
    if ((req.body.userName && req.body.userName === userName) ||
      (req.params.userName && req.params.userName === userName))
      {
        return next();
      }
      else {
        const errorResponse = new ErrorResponse(401, "You do not have permission", null);
        return res.status(errorResponse.httpCode).json(errorResponse);
      }
  }
  catch(e) {
    console.log(e);
    const errorResponse = new ErrorResponse(500, "Internal Server Error", null);
    return res.status(errorResponse.httpCode).json(errorResponse);
  }
};
