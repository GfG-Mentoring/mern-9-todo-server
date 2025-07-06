const bcrypt = require('bcrypt');

const hashPassword = (plainPassword) => {
  return bcrypt.hash(plainPassword, 11);
};

const comparePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
