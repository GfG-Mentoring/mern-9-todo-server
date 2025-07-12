const User = require('../models/user');
const { verifyToken } = require('../utils/token');

const verifyBearerToken = async (token, res) => {
  const tokenData = verifyToken(token);
  console.log(tokenData);
  if (tokenData.error) {
    return res.status(401).send({
      message: tokenData.error,
    });
  }
  const user = await User.findById(tokenData.id);
  if (!user) {
    return res.status(403).send({
      message: 'User not found.',
    });
  }

  return {
    email: user.email,
    id: user._id,
    fullName: user.fullName,
  };
};

const checkAuth = async (req, res, next) => {
  const tokenString = req.headers.authorization;

  if (!tokenString) {
    return res.status(401).send({
      message: 'Token not found.',
    });
  }

  const [type, token] = tokenString.split(' ');

  if (!type || !token) {
    return res.status(401).send({
      message: 'Token format invalid',
    });
  }
  switch (type) {
    case 'Basic': {
      // let go right now
      next();
      break;
    }
    case 'Bearer': {
      const user = await verifyBearerToken(token, res);
      req.user = user;
      next();
      break;
    }
    default: {
      return res.status(400).send({
        message: 'Token type is invalid',
      });
    }
  }
};

module.exports = { checkAuth };
