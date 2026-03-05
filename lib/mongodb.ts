// MONGODB CODE DISABLED - Commented out
// import { MongoClient } from "mongodb";
// import mongoose from "mongoose";

// if (!process.env.MONGODB_URI) {
//   throw new Error("Please add your MongoDB URI to .env.local");
// }

// const uri = process.env.MONGODB_URI;
// const options = {};

// let client;
// let clientPromise: Promise<MongoClient>;

// if (process.env.NODE_ENV === "development") {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR
//   let globalWithMongo = global as typeof global & {
//     _mongoClientPromise?: Promise<MongoClient>;
//   };

//   if (!globalWithMongo._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     globalWithMongo._mongoClientPromise = client.connect();
//   }
//   clientPromise = globalWithMongo._mongoClientPromise;
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// // Function to connect to MongoDB via mongoose
// export async function connectToDatabase() {
//   if (mongoose.connection.readyState >= 1) {
//     return;
//   }

//   console.log("Connecting to MongoDB:", process.env.MONGODB_URI);
//   const res = await mongoose.connect(process.env.MONGODB_URI!);
//   console.log("Connected to MongoDB", res);
//   return res;
// }

// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// export default clientPromise;

// Placeholder exports to prevent import errors
export async function connectToDatabase() {
  console.warn("MongoDB connection disabled - connectToDatabase() called but not implemented");
  return Promise.resolve();
}

export default Promise.resolve(null as any);