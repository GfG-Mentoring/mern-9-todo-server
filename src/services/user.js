const User = require('../models/user');
const { hashPassword } = require('../utils/password');

const createUser = async (fullName, email, password, profilePicture) => {
  const newUser = new User({
    fullName: fullName,
    email: email,
    password: await hashPassword(password),
    profilePicture: profilePicture,
  });

  return newUser.save();
};

const checkUserExists = (email) => {
  return User.findOne({ email: email });
};

module.exports = {
  createUser,
  checkUserExists,
};
