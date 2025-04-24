import mongoose from "mongoose";
import RolePermission from "../models/Role.js";

const seedRoles = async () => {
   // await mongoose.connect('mongodb+srv://--:--@mycluster.aghoq.mongodb.net/Junwang-Backend', {
   //    useNewUrlParser: true,
   //    useUnifiedTopology: true,
   // });

   const roles = [
      {
         roleName: "Manager",
         permissions: [
            {
               roleTitle: "Dashboard",
               icon: "sales-icon",
               isChecked: true,
               childrens: [
                  // { title: "View Analytics", isChecked: true },
                  // { title: "Edit Sales", isChecked: true }
               ]
            },
            {
               roleTitle: "Menu-Management",
               icon: "revenue-icon",
               isChecked: true,
               childrens: [
                  // { title: "Add New Recipe", isChecked: true },
                  // { title: "Auditing", isChecked: true }
               ]
            },
            {
               roleTitle: "Order History",
               icon: "roles-icon",
               isChecked: true,
               childrens: [
                  // { title: "Change Order Status", isChecked: true },
                  // { title: "Change Roles", isChecked: true },
                  // { title: "View Roles", isChecked: true },
                  // { title: "Delete Roles", isChecked: true }
               ]
            },
            {
               roleTitle: "Access-Control",
               icon: "dashboard-icon",
               isChecked: true,
               childrens: [
                  // { title: "", isChecked: true },
                  // { title: "View Time Graph", isChecked: true },
                  // { title: "Edit Items", isChecked: true },
                  // { title: "View Prices", isChecked: true }
               ]
            }
         ]
      }
   ];
   // const roles = [
   //    {
   //       roleName: "Admin",
   //       permissions: [
   //          {
   //             roleTitle: "Sales",
   //             icon: "sales-icon",
   //             isChecked: true,
   //             childrens: [
   //                { title: "View Sales", isChecked: true },
   //                { title: "Edit Sales", isChecked: true }
   //             ]
   //          },
   //          {
   //             roleTitle: "Revenue",
   //             icon: "revenue-icon",
   //             isChecked: true,
   //             childrens: [
   //                { title: "View Revenue Charts", isChecked: true },
   //                { title: "Auditing", isChecked: true }
   //             ]
   //          },
   //          {
   //             roleTitle: "Roles & Permissions",
   //             icon: "roles-icon",
   //             isChecked: true,
   //             childrens: [
   //                { title: "Edit Roles", isChecked: true },
   //                { title: "Change Roles", isChecked: true },
   //                { title: "View Roles", isChecked: true },
   //                { title: "Delete Roles", isChecked: true }
   //             ]
   //          },
   //          {
   //             roleTitle: "Dashboard",
   //             icon: "dashboard-icon",
   //             isChecked: true,
   //             childrens: [
   //                { title: "View Popular Items", isChecked: true },
   //                { title: "View Time Graph", isChecked: true },
   //                { title: "Edit Items", isChecked: true },
   //                { title: "View Prices", isChecked: true }
   //             ]
   //          }
   //       ]
   //    }
   // ];

   // await RolePermission.deleteMany({}); // Clear existing data
   await RolePermission.insertMany(roles);
   console.log("Roles seeded successfully!");
   mongoose.connection.close();
};

seedRoles().catch((err) => console.error(err));
