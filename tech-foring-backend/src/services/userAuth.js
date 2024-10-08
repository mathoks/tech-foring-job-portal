const { PrismaClient } = require('@prisma/client');
const  { verifyAccessToken } = require('../helpers/jwtHelpers');
const { verifyPassword } = require('../helpers/passwordHelpers.js');
const deleteCookie = require('../helpers/cookieHelpers/deleteCookie');

const prisma = new PrismaClient()
/**
 * @method loginUser
 * @param {string} username
 * @param {string} password
 * @return {object <UserSession>}
 */
const loginUser = async (username, password) => {
    
      const User = await prisma.user.findUnique({
        where: {
          username:username
        },

      });
        if (!User) {
            throw new Error("Incorrect login credentials username");
        }
        console.log(verifyPassword(password, User.password))
        const passwordIsValid = await verifyPassword(password, User.password);
        if (!passwordIsValid) {
            throw new Error("Incorrect login credentials");
        }

        return User;
  
      
    
  };

  /**
 * @method logoutUser
 * @param {string} refreshToken
 * @return {Boolean<true>}
 */
const logoutUser = async (request, response, name = "accessToken") => {
    const token = request.get('x-access-token')
    if (!token) {
        throw new Error("No token provided");
    }
    const decoded =  verifyAccessToken(token);
    if(decoded){
    return deleteCookie(response, name)
    }
    return true
  };

 
  
  module.exports = { loginUser, logoutUser, };