interface ContactSubmissionData {
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
  submissionDate: Date;
}

export function generateContactEmailHtml(data: ContactSubmissionData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form submission on XPromo.com.au</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .container {
          background-color: white;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          border-bottom: 3px solid #007bff;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .header h1 {
          color: #007bff;
          margin: 0;
          font-size: 24px;
        }
        .section {
          margin-bottom: 25px;
        }
        .section-title {
          color: #007bff;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
          border-bottom: 2px solid #e9ecef;
          padding-bottom: 5px;
        }
        .field {
          margin-bottom: 15px;
        }
        .field-label {
          font-weight: bold;
          color: #555;
          margin-bottom: 5px;
          display: block;
        }
        .field-value {
          background-color: #f8f9fa;
          padding: 10px;
          border-radius: 5px;
          border-left: 4px solid #007bff;
        }
        .message-content {
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 5px;
          border-left: 4px solid #007bff;
          white-space: pre-wrap;
          font-family: inherit;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e9ecef;
          text-align: center;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Form submission on XPromo.com.au</h1>
          <p style="margin: 10px 0 0 0;">Submitted on ${formatDate(data.submissionDate, true)}</p>
        </div>

        <div class="section">
          <h2 class="section-title">Contact Information</h2>
          
          <div class="field">
            <span class="field-label">Name:</span>
            <div class="field-value">${data.name}</div>
          </div>

          <div class="field">
            <span class="field-label">Company:</span>
            <div class="field-value">${data.company}</div>
          </div>

          <div class="field">
            <span class="field-label">Phone:</span>
            <div class="field-value">${data.phone}</div>
          </div>

          <div class="field">
            <span class="field-label">Email:</span>
            <div class="field-value">${data.email}</div>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Message</h2>
          <div class="message-content">${data.message}</div>
        </div>

        <div class="footer">
          <p>This message was sent from the XPromo contact form.</p>
          <p>Please respond to the customer at: <strong>${data.email}</strong></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function formatDate(dateInput: Date | string | undefined | null, includeTime: boolean = false): string {
  if (!dateInput) return 'Not specified';
  
  // Convert to Date object if it's a string
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  
  // Validate the date
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  if (includeTime) {
    // Format: YYYY-MM-DD -- HH:mm
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} -- ${hours}:${minutes}`;
  } else {
    // Format: YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }
} 