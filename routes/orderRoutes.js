
import express from 'express';
import { createOrder, getOrders, updateOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

// Create order
router.post('/', createOrder);

// Get user's orders
router.get('/', getOrders);
router.patch('/:orderNumber', updateOrderStatus);

export default router;
