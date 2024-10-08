const jwt = require("jsonwebtoken");
const tokenParser = (req, res, next) => {
    const { token } = req.params;
  
    if (!token) {
      next(new Error("Token not found"));
    } else {
      req.token = token;
      next();
    }
  };

  
  
  module.exports = { tokenParser};
  