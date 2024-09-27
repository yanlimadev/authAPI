import express from 'express';
import {
  login,
  logout,
  signup,
  verifyEmail,
} from '../controllers/auth.controller.js';

const authRoutes = express.Router();

authRoutes.post('/signup', signup);

authRoutes.post('/login', login);

authRoutes.post('/logout', logout);

authRoutes.post('/verify-email', verifyEmail);

export default authRoutes;
