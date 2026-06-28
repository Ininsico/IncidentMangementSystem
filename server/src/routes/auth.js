const { Router } = require('express');
const { register, login, verifyEmail, resendCode, getProfile, updateProfile } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

const router = Router();

router.post(
  '/register',
  validate({
    email: ['required', 'email'],
    password: ['required', 'password'],
    name: ['name'],
    phone: ['phone'],
  }),
  register
);

router.post(
  '/verify-email',
  validate({
    email: ['required', 'email'],
    code: ['required'],
  }),
  verifyEmail
);

router.post(
  '/resend-code',
  validate({
    email: ['required', 'email'],
  }),
  resendCode
);

router.post(
  '/login',
  validate({
    email: ['required', 'email'],
    password: ['required'],
  }),
  login
);

router.get('/profile', authenticate, getProfile);

router.put(
  '/profile',
  authenticate,
  validate({
    name: ['name'],
    phone: ['phone'],
  }),
  updateProfile
);

module.exports = router;
