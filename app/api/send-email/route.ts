import { NextResponse } from 'next/server';
import { generateQuoteEmailHtml } from '@/lib/email-templates/quote-submission';
import { generateContactEmailHtml } from '@/lib/email-templates/contact-submission';
import { generateQuoteConfirmationEmailHtml } from '@/lib/email-templates/quote-confirmation';
import { sendQuoteSubmissionEmail, sendQuoteConfirmationEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    console.log('Received email request');
    const data = await request.json();
    
    // Check if this is a contact form submission
    if (data.emailType === 'contact') {
      return handleContactSubmission(data);
    } else {
      return handleQuoteSubmission(data);
    }
  } catch (error: any) {
    console.error('Email API error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error?.message || 'Unknown error occurred',
        name: error?.name
      },
      { status: 500 }
    );
  }
}

async function handleContactSubmission(data: any) {
  try {
    // Validate required fields for contact form
    const requiredFields = ['name', 'company', 'email', 'phone', 'message'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      console.error('Missing required fields for contact form:', missingFields);
      return NextResponse.json(
        { 
          error: 'Missing required fields', 
          details: `Missing: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }
    
    console.log('Contact form data received:', {
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      emailTo: process.env.EMAIL_TO,
      emailFrom: process.env.EMAIL_FROM
    });
    
    // Generate contact email HTML
    console.log('Generating contact email HTML...');
    const emailHtml = generateContactEmailHtml(data);
    console.log('Contact email HTML generated successfully');
    
    // Send email
    console.log('Attempting to send contact email...');
    const emailResult = await sendQuoteSubmissionEmail(
      emailHtml, 
      'New Contact Form submission on XPromo.com.au'
    );
    
    if (!emailResult.success) {
      console.error('Contact email send error in API route:', {
        error: emailResult.error,
        data: emailResult.data
      });
      return NextResponse.json(
        { 
          error: 'Failed to send email', 
          details: emailResult.error
        },
        { status: 500 }
      );
    }
    
    console.log('Contact email API completed successfully');
    return NextResponse.json({ 
      success: true,
      message: 'Contact email sent successfully'
    });
  } catch (error: any) {
    console.error('Contact email API error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error?.message || 'Unknown error occurred',
        name: error?.name
      },
      { status: 500 }
    );
  }
}

async function handleQuoteSubmission(data: any) {
  try {
    // Validate required fields for quote form
    const requiredFields = ['products', 'name', 'company', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      console.error('Missing required fields for quote form:', missingFields);
      return NextResponse.json(
        { 
          error: 'Missing required fields', 
          details: `Missing: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }
    
    if (!Array.isArray(data.products) || data.products.length === 0) {
      console.error('Invalid products data:', data.products);
      return NextResponse.json(
        { error: 'Invalid request data', details: 'Products must be a non-empty array' },
        { status: 400 }
      );
    }
    
    console.log('Quote email data received:', {
      name: data.name,
      company: data.company,
      totalAmount: data.totalAmount,
      productsCount: data.products.length,
      emailTo: process.env.EMAIL_TO,
      emailFrom: process.env.EMAIL_FROM
    });
    
    // Generate email HTML
    console.log('Generating quote email HTML...');
    const emailHtml = generateQuoteEmailHtml(data);
    console.log('Quote email HTML generated successfully');
    
    // Send admin notification email
    console.log('Attempting to send quote email to admin...');
    const emailResult = await sendQuoteSubmissionEmail(emailHtml);
    
    if (!emailResult.success) {
      console.error('Quote email send error in API route:', {
        error: emailResult.error,
        data: emailResult.data
      });
      return NextResponse.json(
        { 
          error: 'Failed to send email', 
          details: emailResult.error
        },
        { status: 500 }
      );
    }
    
    // Send customer confirmation email
    console.log('Attempting to send quote confirmation email to customer...');
    const confirmationHtml = generateQuoteConfirmationEmailHtml({
      name: data.name,
      email: data.email,
      submissionDate: data.submissionDate
    });
    
    const confirmationResult = await sendQuoteConfirmationEmail(data.email, confirmationHtml);
    
    if (!confirmationResult.success) {
      console.error('Quote confirmation email send error in API route:', {
        error: confirmationResult.error,
        data: confirmationResult.data
      });
      // Don't fail the entire request if confirmation email fails
      console.warn('Quote confirmation email failed, but admin notification was sent successfully');
    }
    
    console.log('Quote email API completed successfully');
    return NextResponse.json({ 
      success: true,
      message: 'Quote email sent successfully'
    });
  } catch (error: any) {
    console.error('Quote email API error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error?.message || 'Unknown error occurred',
        name: error?.name
      },
      { status: 500 }
    );
  }
} 