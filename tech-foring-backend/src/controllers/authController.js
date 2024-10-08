
const setCookieHelper = require("../helpers/cookieHelpers/setCookieHelper");
const { generateJWTToken } = require("../helpers/jwtHelpers");
const { loginUser, logoutUser} = require("../services/userAuth");
const { verifyAccessToken } = require("../helpers/jwtHelpers");
const secret = process.env["SECRETE"];

const ACCESS_TOKEN = process.env["ACCESS_TOKEN"];

const isLogin = async (req, res, next) => {
    try {
        console.log(req.cookies)
        // const sessionId = req.cookies['token'].split('.')[0].slice(2); // Extract session ID
        const token = req?.cookies?.token
        
            if ( token === null || token === undefined) {
                res.status(401).json({
                    status: "error",
                    message: "User is not logged in", 
                    data: null        
                });
              }
              const decoded = await verifyAccessToken(token, secret);
              
              if (decoded) {
                res.status(200).json({
                  status: "success",
                  message: "User is logged in",
                  data: decoded.payload[0],
                });
            }
      
    } catch (error) {
      next(error);
    }
  }

const userLogin = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const data = await loginUser(username, password);
      if (data) {
        const jwtTokenOptions = {
          expires: "3days",
          maxAge: 59 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        };
  
        const accessToken = generateJWTToken(
          [data.username],
          jwtTokenOptions.expires,
          secret
        );
        console.log(accessToken)
        if (accessToken){
            res.cookie('token', accessToken, { httpOnly: true, sameSite: "none", secure: true });
            setCookieHelper(res, "accessToken", accessToken, 59);
            
        }
    
      }
      const {password: pas, ...rest} = data
      res.status(200).json({
        status: "success",
        message: "user logged in successfully",
        data: rest,
      });
    } catch (error) {
      next(error);
    }
  };

  const logout = async (request, response) => {
    const data = await logoutUser(request,response) 
    if (data) {
        response.status(200).json({
          status: "success",
          message: "user logged out successfully",
        });
    }
  }

    module.exports = { userLogin , logout, isLogin};