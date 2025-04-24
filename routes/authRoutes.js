import express from 'express';
import { register, login, resetPassword, forgotPassword, verifyOtp } from '../controllers/authController.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/reset-password', resetPassword);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);

export default router;