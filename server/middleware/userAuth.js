const decode = require('../utils/authentication');

module.exports = (req, res, next) => {
  try{
    const decodedToken = decode(req.headers.authorization)
    const userName = decodedToken.userName;

    if (decodedToken.role === 0) {
      console.log('admin');
      return next();
    }
    if (
      (req.body.userName && req.body.userName === userName) ||
      (req.params.userName && req.params.userName === userName)
      )
      {
        console.log('successful');
        return next();
      } else {
        throw 'You do not have access';
      }
  }
  catch(e) {
    console.log(e);
    res.status(401).send({
      message: e,
      error: e.message
    });
  }
};
