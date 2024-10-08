const express = require("express");

const { userLogin, logout, isLogin } = require("../controllers/authController");
const {
  checkUserDataInputIsEmpty,
  checkPasswordValidity,
  checkNameDataLength,
} = require("../middlewares/validators/authDataValidators");

const router = express.Router();

router.post("/", (req, res) => {
  res.send("post rout");
});

router.get("/check-isLogin", isLogin);

router.post(
  "/login",
  checkUserDataInputIsEmpty,
  checkNameDataLength,
  checkPasswordValidity,
  userLogin
);
router.get("/logout", logout);

module.exports = router;
