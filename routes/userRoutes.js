import express from 'express';
import { getProfile, getUsers, updateUserRole } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/profile', authenticate, getProfile);
router.get('/all', authenticate, getUsers)
router.put('/updateRole/:id', authenticate, updateUserRole)

export default router;
