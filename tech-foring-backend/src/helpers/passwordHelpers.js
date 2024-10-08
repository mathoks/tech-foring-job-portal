const bcrypt = require('bcrypt');

/**
 * @method hashedPassword
 * @param {string} plainTextPassword
 * @return {string <hashedPassword>}
 */
const hashPassword = (plainTextPassword) => {
  if (!plainTextPassword) {
    throw new Error("Invalid plain-text password");
  }
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainTextPassword, salt);
};

/**
 * @method verifyPassword
 * @param {string} plainTextPassword
 * @param {string} hashedPassword
 * @return {Boolean <true>}
 */
const verifyPassword = (plainTextPassword, hashedPassword) => {
  if (!bcrypt.compareSync(plainTextPassword, hashedPassword)) {
    throw new Error("Incorrect login credentials password");
  }
  return true;
};

module.exports = { hashPassword, verifyPassword };
