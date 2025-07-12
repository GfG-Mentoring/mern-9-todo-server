const jwt = require('jsonwebtoken');

const validateSecret = () => {
  if (process.env.JWT_SECRET) {
    return process.env.JWT_SECRET;
  }
  throw new Error('JWT_SECRET is not defined in environment variables');
};

const generateToken = (user_id) => {
  return jwt.sign(
    {
      id: user_id,
    },
    validateSecret(),
    {
      expiresIn: '2h',
    }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, validateSecret());
  } catch (e) {
    console.error('Token verification failed:', e);
    if (e instanceof jwt.TokenExpiredError) {
      return { error: 'Token has expired', expired: true };
    }
    if (e instanceof jwt.JsonWebTokenError) {
      return { error: 'Invalid token', invalid: true };
    }
    return { error: 'Token verification failed' };
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
