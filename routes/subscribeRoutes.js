// routes/rolePermissionRoutes.js
import express from 'express';
import { getRolePermissions, updateRolePermissions } from '../controllers/roleController.js';
import { subscribeUser } from '../controllers/subscribeController.js';
// import { verifyToken, hasPermission } from '../middleware/auth.js';

const router = express.Router();

router.post('/', subscribeUser);


export default router;