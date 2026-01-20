// Auth Controller
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const bcrypt = require('bcryptjs');

const signToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

exports.signup = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(new AppError('Email and password required', 400));
  const user = await User.create({ email, password });
  const token = signToken(user._id);
  res.cookie('jwt', token, { httpOnly: true, secure: true });
  res.status(201).json({ status: 'success', token });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(new AppError('Email and password required', 400));
  const user = await User.findOne({ email });
  if (!user || !user.password || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  const token = signToken(user._id);
  res.cookie('jwt', token, { httpOnly: true, secure: true });
  res.status(200).json({ status: 'success', token });
});

// Google OAuth (Passport.js)
exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });
exports.googleCallback = [
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  (req, res) => {
    const token = signToken(req.user._id);
    res.cookie('jwt', token, { httpOnly: true, secure: true });
    res.redirect('/tasks');
  }
];
