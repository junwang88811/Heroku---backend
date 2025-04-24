
import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { getChatHistory, sendMessage } from '../controllers/chatController.js';

const router = express.Router();

router.post('/', authenticate, sendMessage)
router.get("/history", authenticate, getChatHistory)


export default router;
