module.exports = (req, res, next) => {
  res.locals.ua = req.get('User-Agent');
  return next()
}
