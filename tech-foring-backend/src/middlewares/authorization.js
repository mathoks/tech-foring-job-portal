const { verifyAccessToken } = require("../helpers/jwtHelpers");

const authorization = async (req, res, next) => {
    const token = await  req.cookies.token;
    console.log(token, "hhhhshh")
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const decoded = await verifyAccessToken(token, process.env.SECRETE);
      req.user = decoded.payload[0];
     return next();
    }
    catch (error) {
        next(error);
    //   return res.status(401).json({ message: "Unauthorized" });
    }
}
module.exports = { authorization};