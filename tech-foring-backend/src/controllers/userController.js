const {
    createNewUser,
    checkThatUserAlreadyExist,
  } = require("../services/userServices");
  const { hashPassword } = require("../helpers/passwordHelpers");
  const { getUserDataFromToken} = require("../helpers/jwtHelpers");
  
  // const { verifyUserToken } = require("../services/verificationServices");
  
  /**
   * @method createUser
   * @param {Request}req
   * @param {Response}res
   * @param {NextFunction}next
   * @return {Promise<User>}
   */
  const createUser = async (req, res, next) => {
    console.log(req.body);
    try {
      const {
        password,
        username,
      } = req.body;
      const hashedPasswords = hashPassword(password);
      if (!hashedPasswords) {
        throw new Error("password hashing failed");
      }
      const createdUser = await createNewUser(
        hashedPasswords,
        username,
      );
       if (createdUser) {
      return  res
          .status(201)
          .json({ newUser: createdUser, message: "User created successfully" });
      } else {
        throw new Error("User not created");
      }
    } catch (error) {
        next(error.message);
    }
  };
  
  
 
  /**
   * @method getCurrentUser
   * @param {Request}req
   * @param {Response}res
   * @param {NextFunction}next
   * @return {Promise<User>}
   */
  const getCurrentUser = async (req, res, next) => {
    try {
      const token = await req.headers["x-access-token"];
      const userIfo = await getUserDataFromToken(token);
      const { payload } = userIfo.payload;
      const username = payload[0];
      const currentUser = await checkThatUserAlreadyExist(username);
  
      if (currentUser) {
        res.status(200).json({currentUser, message: "success"});
      }
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * @method viewDashboard
   * @param {Request}req
   * @param {Response}res
   * @param {NextFunction}next
   * @return {Promise<User>}
   */
  const viewDashboard = async (req, res, next) => {
    const userId = req.user.id;
    try {
      const currentUser = await checkThatUserAlreadyExist(userId);
  
      if (currentUser) {
        ResponseHandler.ok(
          res,
          currentUser,
          `You are current sign in as ${currentUser.firstName} - ${currentUser.lastName}`
        );
      }
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * @method ResetPassword
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  
  
  
  module.exports = {
    createUser,
    getCurrentUser,
    viewDashboard,
  };
  