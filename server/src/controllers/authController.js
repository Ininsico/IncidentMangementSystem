const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const VerificationCode = require('../models/VerificationCode');
const PasswordReset = require('../models/PasswordReset');
const { sendVerificationCode, sendPasswordResetEmail } = require('../services/emailService');

function generateToken(user) {
  return jwt.sign(
    { uid: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function register(req, res) {
  try {
    const { email, password, name, phone } = req.body;

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }

    const user = await User.create({ email, password, name, phone });

    const code = generateCode();
    await VerificationCode.create({
      email: email.toLowerCase(),
      code,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    try {
      await sendVerificationCode(email, code);
    } catch (emailErr) {
      console.error('Failed to send verification email:', emailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: 'Verification code sent to your email',
      email: user.email,
    });
  } catch (err) {
    console.error('Register error:', err);
    if (err.code === 11000) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function verifyEmail(req, res) {
  try {
    const { email, code } = req.body;
    const normalizedEmail = email.toLowerCase();

    const verification = await VerificationCode.findOne({
      email: normalizedEmail,
      code,
      expiresAt: { $gt: new Date() },
    });

    if (!verification) {
      return res.status(400).json({ error: 'Invalid or expired verification code' });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.verified = true;
    await user.save();

    await VerificationCode.deleteMany({ email: normalizedEmail });

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      token,
      user: user.toJSON(),
    });
  } catch (err) {
    console.error('Verify email error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function resendCode(req, res) {
  try {
    const { email } = req.body;
    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.verified) {
      return res.status(400).json({ error: 'Email is already verified' });
    }

    await VerificationCode.deleteMany({ email: normalizedEmail });

    const code = generateCode();
    await VerificationCode.create({
      email: normalizedEmail,
      code,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    try {
      await sendVerificationCode(email, code);
    } catch (emailErr) {
      console.error('Failed to resend verification email:', emailErr.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Verification code resent',
    });
  } catch (err) {
    console.error('Resend code error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const valid = await user.comparePassword(password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (!user.verified) {
      return res.status(403).json({
        error: 'Email not verified',
        email: user.email,
        code: 'EMAIL_NOT_VERIFIED',
      });
    }

    if (!user.isActive) {
      return res.status(403).json({ error: 'Account has been deactivated' });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      token,
      user: user.toJSON(),
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getProfile(req, res) {
  try {
    const user = await User.findById(req.user.uid);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ success: true, user: user.toJSON() });
  } catch (err) {
    console.error('Get profile error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateProfile(req, res) {
  try {
    const allowed = ['name', 'phone'];
    const updates = {};
    for (const field of allowed) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    const user = await User.findByIdAndUpdate(req.user.uid, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ success: true, user: user.toJSON() });
  } catch (err) {
    console.error('Update profile error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(200).json({ success: true, message: 'If the email exists, a reset link has been sent' });
    }

    await PasswordReset.deleteMany({ email: normalizedEmail, used: false });

    const token = crypto.randomBytes(32).toString('hex');
    await PasswordReset.create({
      email: normalizedEmail,
      token,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    });

    try {
      await sendPasswordResetEmail(normalizedEmail, token);
    } catch (emailErr) {
      console.error('Failed to send password reset email:', emailErr.message);
    }

    return res.status(200).json({ success: true, message: 'If the email exists, a reset link has been sent' });
  } catch (err) {
    console.error('Forgot password error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function resetPassword(req, res) {
  try {
    const { token, password } = req.body;

    const resetDoc = await PasswordReset.findOne({ token, used: false, expiresAt: { $gt: new Date() } });
    if (!resetDoc) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    const user = await User.findOne({ email: resetDoc.email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.password = password;
    await user.save();

    resetDoc.used = true;
    await resetDoc.save();

    return res.status(200).json({ success: true, message: 'Password has been reset successfully' });
  } catch (err) {
    console.error('Reset password error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.uid);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const valid = await user.comparePassword(currentPassword);
    if (!valid) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({ success: true, message: 'Password changed successfully' });
  } catch (err) {
    console.error('Change password error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function verifyToken(req, res) {
  try {
    const user = await User.findById(req.user.uid);
    if (!user || !user.isActive) {
      return res.status(401).json({ valid: false, error: 'User not found or inactive' });
    }
    return res.status(200).json({ valid: true, user: user.toJSON() });
  } catch (err) {
    console.error('Verify token error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  register, login, verifyEmail, resendCode, getProfile, updateProfile,
  forgotPassword, resetPassword, changePassword, verifyToken,
};
