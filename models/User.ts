// MONGODB CODE DISABLED - Commented out
// import { Schema, model, models } from "mongoose";

// const UserSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Name is required"],
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       unique: true,
//     },
//     password: {
//       type: String,
//     },
//     image: {
//       type: String,
//     },
//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user",
//     },
//     status: {
//       type: String,
//       enum: ["active", "inactive"],
//       default: "active",
//     }
//   },
//   { timestamps: true }
// );

// const User = models.User || model("User", UserSchema);

// Placeholder export to prevent import errors
const User = null as any;
export default User;