
import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { checkoutSession, createCheckout } from '../controllers/stripeController.js';

const router = express.Router();

router.post('/create-checkout-session', authenticate, createCheckout)
router.get('/checkout-session', authenticate, checkoutSession)


export default router;
