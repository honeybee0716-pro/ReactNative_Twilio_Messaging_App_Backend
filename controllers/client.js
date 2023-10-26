const User = require('../models/client');
const { createSecretToken } = require('../util/SecretToken');
const bcrypt = require('bcrypt');

// Signup controller
const Signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: 'User already exists' });
    }

    const hash = await bcrypt.hash(password, 12);
    const user = new User({
      ...req.body,
      email: email,
      firstName: firstName,
      lastName: lastName,
      hash: hash,
    });

    user.save().catch((err) => {
      console.log('customer save err', err.message);
    });

    // Token generating
    const token = createSecretToken(user._id);

    res
      .status(201)
      .json({
        message: 'User signed in successfully',
        success: true,
        user,
        accessToken: token,
      });
    next();
  } catch (error) {
    console.error(error);
  }
};

// Login controller
const Login = async (req, res, next) => {
  // Check user eamil and password
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: 'All fields are required' });
    }
    // Check email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: 'Incorrect password or email' });
    }
    // Check password
    const auth = await bcrypt.compare(password, user.hash);
    if (!auth) {
      return res.json({ message: 'Incorrect password or email' });
    }

    // Token generating
    const token = createSecretToken(user._id);
    res
      .status(201)
      .json({
        message: 'User logged in successfully',
        success: true,
        user,
        accessToken: token,
      });
    next();
  } catch (error) {
    console.error(error);
  }
};

// Getting user profile info
const getMe = async (req, res) => {
  const { currentUser } = req;

  const myJSON = JSON.stringify(currentUser);
  const user = JSON.parse(myJSON);
  delete user.hash;

  return res.json({
    status: true,
    user,
  });
};

module.exports = {
  Signup,
  Login,
  getMe,
};
