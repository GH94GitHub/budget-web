const {verifyToken} = require("../utils/authentication");
const ErrorResponse = require("../services/ErrorResponse");

/**
 * Parses token in header and adds local user variable to request.
 */
module.exports = (req, res, next) => {
const parsedToken = verifyToken(req.headers.authorization);
// User doesn't have bearer token
if (!parsedToken) {
  const errorResponse = new ErrorResponse(401, "You do not have permission", null);
  return res.status(errorResponse.httpCode).json(errorResponse.toObject());
}
req.app.locals.user = parsedToken;
next();
}
