const accessTokenMiddleware = (req, res, next) => {
    res.locals.accessToken = req.headers['authorization'].split(' ')[1];
    next();
  };
  module.exports = { accessTokenMiddleware };