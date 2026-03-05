// MONGODB CODE DISABLED - Commented out
// import mongoose, { Schema, Document } from "mongoose";

// MONGODB CODE DISABLED - Using interface without Document
export interface IProject {
  projectFor: string;
  budget: string;
  quantity: number;
  deadline?: Date;
  noDeadline: boolean;
  logo?: string;
  specialInstructions?: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  status: 'new' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

// MONGODB CODE DISABLED - Schema commented out
// const ProjectSchema: Schema = new Schema(
//   {
//     projectFor: { type: String, required: true },
//     budget: { type: String, required: true },
//     quantity: { type: Number, required: true },
//     deadline: { type: Date },
//     noDeadline: { type: Boolean, default: false },
//     logo: { type: String },
//     specialInstructions: { type: String },
//     name: { type: String, required: true },
//     company: { type: String, required: true },
//     phone: { type: String, required: true },
//     email: { 
//       type: String, 
//       required: true,
//       validate: {
//         validator: function(v: string) {
//           return /^\S+@\S+\.\S+$/.test(v);
//         },
//         message: 'Please enter a valid email address'
//       }
//     },
//     status: { 
//       type: String, 
//       enum: ['new', 'in-progress', 'completed', 'cancelled'], 
//       default: 'new'
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

// Placeholder export to prevent import errors
const Project = null as any;
export default Project;