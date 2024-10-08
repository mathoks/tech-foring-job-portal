const JWT = require("jsonwebtoken");
const  REFRESH_TOKEN_SECRET  = process.env["REFRESH_TOKEN_SECRET"];
const ACCESS_TOKEN_SECRET  = process.env["JWT_TOKEN_SECRETE"];
const SECRET = process.env["SECRETE"]; 

/**
 * @method generateJWTToken
 * @param {string} payload
 * @param {string} expiresIn
 * @return {string <authToken>}
 */
const generateJWTToken = (payload, expiresIn, secret) => {
  if (!expiresIn) {
    return JWT.sign({payload}, secret);
  }
console.log(payload)
  return JWT.sign({payload}, secret, {expiresIn});
};

/**
 * @method verifyAccessToken
 * @param {string} token
 * @param {string} JWT_TOKEN_SECRET
 * @return {Boolean <true>}
 */
const verifyAccessToken = async (token, secret) => {
  
  try {
    return JWT.verify(token, secret);
  } catch (error) {
    return false;
  }
};


/**
 * @method getUserDataFromToken
 * @param {string} token
 * @return {Array <payload>}
 */

const getUserDataFromToken = async(token)=>{
  const data = await JWT.decode(token, {complete:true})
  if (!data){
    throw new Error("please loggin or Token expired")
  }
  return data
}

/**
 * @method verifyRefreshToken
 * @param {string} token
 * @param {string} JWT_TOKEN_SECRET
 * @return {Boolean <true>}
 */
const verifyRefreshToken = async (refreshToken, sessionId) => {
  try {
    return JWT.verify(refreshToken, REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { generateJWTToken, verifyAccessToken, verifyRefreshToken , getUserDataFromToken};
