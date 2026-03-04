import nodemailer from 'nodemailer';

// Create transporter for Brevo SMTP
const transporter = nodemailer.createTransport({
  // host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
  // port: parseInt(process.env.SMTP_PORT || '587'),
  host: 'smtp-relay.brevo.com',
  port: parseInt('587'),
  secure: false, // true for 465, false for other ports
  auth: {
    // user: process.env.SMTP_USER || '6afedc002@smtp-brevo.com',
    // pass: process.env.SMTP_PASS || 'xsmtpsib-16fdc274c2c61ebcc04079601f910e7ba4dc59f08077173a27b7298ed8ef9748-04pq5jUzYdNPZ7LJ',
    user: '6afedc002@smtp-brevo.com',
    pass: 'xsmtpsib-16fdc274c2c61ebcc04079601f910e7ba4dc59f08077173a27b7298ed8ef9748-04pq5jUzYdNPZ7LJ',
  },
});

export async function sendQuoteSubmissionEmail(htmlContent: string, subject?: string) {
  try {
    console.log('Starting email send attempt...');
    // console.log('From:', process.env.FROM_EMAIL || 'noreply@xpromo.com.eu');
    // console.log('To:', process.env.EMAIL_TO || 'test@test.com');
    console.log('Subject:', subject || 'New Quote Submitted on XPromo.com.au');

    const mailOptions = {
      // from: process.env.FROM_EMAIL || 'noreply@xpromo.com.eu',
      // to: process.env.EMAIL_TO || 'test@test.com',
      from: 'noreply@xpromo.com.eu',
      to: 'test@test.com',
      subject: subject || 'New Quote Submitted on XPromo.com.au',
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully via Brevo SMTP:', info.messageId);

    return { success: true, data: info };
  } catch (error: any) {
    console.error('Detailed error sending email:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      details: error
    });
    return {
      success: false,
      error: error?.message || 'Unknown error occurred while sending email'
    };
  }
}

export async function sendQuoteConfirmationEmail(toEmail: string, htmlContent: string) {
  try {
    console.log('Starting quote confirmation email send attempt...');
    // console.log('From:', process.env.FROM_EMAIL || 'noreply@xpromo.com.eu');
    console.log('To:', toEmail);
    console.log('Subject: We Got Your Enquiry – We\'re Already on It 🚀');

    const mailOptions = {
      // from: process.env.FROM_EMAIL || 'noreply@xpromo.com.eu',
      from: 'noreply@xpromo.com.eu',
      to: toEmail,
      subject: 'We Got Your Enquiry – We\'re Already on It 🚀',
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Quote confirmation email sent successfully via Brevo SMTP:', info.messageId);

    return { success: true, data: info };
  } catch (error: any) {
    console.error('Detailed error sending quote confirmation email:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      details: error
    });
    return {
      success: false,
      error: error?.message || 'Unknown error occurred while sending quote confirmation email'
    };
  }
}