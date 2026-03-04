import { NextRequest, NextResponse } from "next/server";

// Contact API endpoint
// Handles contact form submissions from the chatbot and contact page

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, source = "Website" } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Log the contact submission
    console.log("New contact submission:", {
      name,
      email,
      phone: phone || "Not provided",
      message,
      source,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted successfully. We'll get back to you soon!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}

