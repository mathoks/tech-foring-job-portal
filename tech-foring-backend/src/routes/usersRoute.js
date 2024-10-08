const express = require("express");
const {
  createUser,
  getCurrentUser,
} = require("../controllers/userController");
const {
  checkNameDataLength,
  checkUserDataInputIsEmpty,
  checkPasswordInputIsEmpty,
  checkPasswordMatch,
  checkPasswordValidity,
} = require("../middlewares/validators/authDataValidators");

const router = express.Router();

router.post(
  "/create-user",
  checkUserDataInputIsEmpty,
  checkNameDataLength,
  checkPasswordInputIsEmpty,
  checkPasswordValidity,
//   checkPasswordMatch,
  createUser
);



router.get("/me", getCurrentUser);


module.exports = router;
