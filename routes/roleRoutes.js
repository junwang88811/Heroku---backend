// routes/rolePermissionRoutes.js
import express from 'express';
import { getRolePermissions, updateRolePermissions } from '../controllers/roleController.js';
// import { verifyToken, hasPermission } from '../middleware/auth.js';

const router = express.Router();

router.get('/role-permissions/:roleName',
   // verifyToken,
   // hasPermission('viewRoles'),
   getRolePermissions
);

router.put('/role-permissions/:roleName',
   // verifyToken,
   // hasPermission('editRoles'),
   updateRolePermissions
);

export default router;