// controllers/rolePermissionController.js
import RolePermission from '../models/Role.js';

export const getRolePermissions = async (req, res) => {
   try {
      const { roleName } = req.params;
      console.log(roleName)
      const rolePermissions = await RolePermission.findOne({ roleName });
      res.status(200).json(rolePermissions);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export const updateRolePermissions = async (req, res) => {
   try {
      const { roleName } = req.params;
      const { permissions } = req.body;

      const updatedPermissions = await RolePermission.findOneAndUpdate(
         { roleName },
         { permissions },
         { new: true }
      );

      res.status(200).json(updatedPermissions);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};