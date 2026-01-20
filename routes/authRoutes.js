// Auth Routes
const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

module.exports = (loginLimiter) => {
  const router = express.Router();
  router.post('/signup', authController.signup);
  router.post('/login', loginLimiter, authController.login);
  router.get('/google', authController.googleAuth);
  router.get('/google/callback', ...authController.googleCallback);
  return router;
};
