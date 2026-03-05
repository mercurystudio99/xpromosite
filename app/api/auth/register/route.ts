import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// MONGODB CODE DISABLED - Commented out
// import User from "@/models/User";
// import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // MONGODB CODE DISABLED - Database operations commented out
    // // Connect to MongoDB
    // await connectToDatabase();

    // // Check if user already exists
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return NextResponse.json(
    //     { message: "User already exists" },
    //     { status: 409 }
    //   );
    // }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // MONGODB CODE DISABLED - User creation commented out
    // // Create new user using User model
    // const newUser = await User.create({
    //   name,
    //   email,
    //   password: hashedPassword,
    //   image: null
    // });

    // return NextResponse.json(
    //   { message: "User created successfully", userId: newUser._id },
    //   { status: 201 }
    // );
    
    // Return error since MongoDB is disabled
    return NextResponse.json(
      { message: "MongoDB disabled - User registration not available" },
      { status: 503 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}