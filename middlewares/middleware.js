const User = require('../models/client');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// Check user if token has been verified
module.exports.userVerification = (req, res, next) => {
  const bearerToken = req.get('Authorization');
  let token;
  if (bearerToken) {
    token = bearerToken.split(' ')[1];
  }
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.status(401).send(err.message || 'check user error');
    } else {
      req.currentUser = await User.findById(data.id);
      if (req.currentUser) {
        console.info('Auth Success:', req.currentUser.email);
        next();
      } else {
        console.error('Valid JWT but no user:', data);
        res.status(401).send('invalid_user');
      }
    }
  });
};
