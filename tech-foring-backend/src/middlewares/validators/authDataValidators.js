

const checkUserDataInputIsEmpty = async (req, res, next) => {
    try {
      console.log(req.body)
      const {  username } = req.body;
      if (
        
        !username || username.trim().length === 0  
      ) {
        throw new Error("all input fields are required");
      } else {
        next();
      }
    } catch (error) {
      next(error.message);
    }
  };
  

  
  const checkPasswordInputIsEmpty = async (req, res, next) => {
    try {
      const { password,  } = req.body;
      if (
        !password ||
        // !confirmPassword ||
        password.trim().length === 0 
        // confirmPassword.trim().length === 0
      ) {
        throw new Error("all input fields are required");
      } else {
        next();
      }
    } catch (error) {
      next(error.message);
    }
  };
  
  const checkPasswordValidity = async (req, res, next) => {
    const { password } = req.body;
    if(!password){
        throw new Error("password is required")
    }
    try {
      const passcodeLengthIsValid = password?.trim().length < 8;
      const valid = {
        hasUpper: /[A-Z]/,
        hasLower: /[a-z]/,
        hasNumber: /[0-9]/,
        hasSpclChr: /[@,#,$,%,&]/,
      };
  
      console.log(passcodeLengthIsValid,password.match(valid.hasUpper), password.match(valid.hasLower), password.match(valid.hasNumber), password.match(valid.hasSpclChr))
      if (
        passcodeLengthIsValid ||
        !password.match(valid.hasUpper) ||
        !password.match(valid.hasLower) ||
        !password.match(valid.hasNumber) ||
        !password.match(valid.hasSpclChr)
      ) {
        throw new Error("invalid password format");
      } else {
        next();
      }
    } catch (error) {
      next(error.message);
    }
  };
  
  const checkPasswordMatch = async (req, res, next) => {
    try {
      const { password, confirmPassword } = req.body;
      if (password.trim() !== confirmPassword.trim()) {
        throw new Error("password does not match");
      } else {
        next();
      }
    } catch (error) {
      next(error.message);
    }
  };
  
  const checkNameDataLength = async (req, res, next) => {
    try {
      const { username } = req.body;
      const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
     
      if (
        username?.match(format)
      ) {
        throw new Error(
          "username should not contain special characters"
        );
      }
  
      if (username?.length > 8 ) {
        throw new Error(
          "username should not be longer than 8 characters"
        );
      } else {
        next();
      }
    } catch (error) {  
       next(error.message);
       
    }
  };
  
  const checkJobDataInputForUpdateIsEmpty = async (req, res, next) => {
    try {
      const { jobTitle, jobDescription } = req.body;
      if (!jobTitle || !jobDescription) {
        throw new Error("all input fields are required");
      } else {
        next();
      }
    } catch (error) {
      next(error.message);
    }
  };
  
  module.exports = {
    checkUserDataInputIsEmpty,
    checkPasswordValidity,
    checkPasswordMatch,
    checkNameDataLength,
    checkJobDataInputForUpdateIsEmpty,
    checkPasswordInputIsEmpty,
  };
  