const {verifyToken} = require("../utils/authentication");
const ErrorResponse = require("../services/ErrorResponse");

module.exports = (req, res, next) => {
  try {
    const userRole = req.app.locals.user.role;

    // User is not admin
    if (userRole !== 0) {
      const errorResponse = new ErrorResponse(401, "You do not have permission", null);
      return res.status(errorResponse.httpCode).json(errorResponse.toObject());
    }
    // Admin user
    else {
      return next();
    }
  }
  catch(e) {
    console.log(e);
    const errorResponse = new ErrorResponse(500, "Internal Server Error", null);
    return res.status(errorResponse.httpCode).json(errorResponse.toObject());
  }
}
