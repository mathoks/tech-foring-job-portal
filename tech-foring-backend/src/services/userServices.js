const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/**
 * @method createNewUser
 
 * @param {string} hashedPassword
 * @param {String} username

 * @return {object <NewUser>}
 */

const createNewUser = async (hashedPassword, username) => {
  const user = await checkThatUserAlreadyExist(username);
  if (user) {
    throw new Error("User already exist");
  }

  const NewUser = await prisma.user.create({
    data: {
      password: hashedPassword,
      username,
    },
  });

  if (!NewUser) {
    throw new Error("User not created");
  }
  return NewUser;
};

/**
 * @method checkThatUserAlreadyExist
 * @param {string} username
 * @return {object<User>}
 */
const checkThatUserAlreadyExist = async (username) => {
  const user = await prisma.user.findUnique({
    where: { username: username },
    select: {
      password: false,
      username: true,
    },
  });
  return user;
};

module.exports = {
  createNewUser,
  checkThatUserAlreadyExist,
};
