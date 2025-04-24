// models/RolePermission.js
import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
   title: String,
   isChecked: Boolean
});

const rolePermissionSchema = new mongoose.Schema({
   roleTitle: String,
   icon: String,
   isChecked: Boolean,
   childrens: [permissionSchema]
});

const roleSchema = new mongoose.Schema({
   roleName: {
      type: String,
      required: true,
      enum: ["Admin", "Manager", "Cashier", "User"]
   },
   permissions: [rolePermissionSchema]
}, { timestamps: true });

const RolePermission = mongoose.model("RolePermission", roleSchema);
export default RolePermission;