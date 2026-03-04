interface QuoteConfirmationData {
  name: string;
  email: string;
  submissionDate: Date;
}

export function generateQuoteConfirmationEmailHtml(data: QuoteConfirmationData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>We Got Your Enquiry – We're Already on It 🚀</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
          }
          .header {
            background-color: #05172D;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            background-color: #fff;
            padding: 30px;
            border: 1px solid #eee;
            border-radius: 0 0 5px 5px;
          }
          .message {
            font-size: 16px;
            line-height: 1.8;
            margin-bottom: 25px;
          }
          .highlight {
            color: #05172D;
            font-weight: bold;
          }
          .phone-number {
            color: #05172D;
            font-weight: bold;
            font-size: 18px;
          }
          .signature {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }
          .footer {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">We Got Your Enquiry – We're Already on It 🚀</h1>
            <p style="margin: 10px 0 0 0;">Submitted on ${formatDate(data.submissionDate, true)}</p>
          </div>

          <div class="content">
            <div class="message">
              <p>Hi ${data.name},</p>
              
              <p>Thanks for sending in your quote request — we're already on the case.</p>
              
              <p>One of our team members is reviewing it right now, and you'll hear back from us within <span class="highlight">30 minutes</span> (yep, we're that fast ⚡️).</p>
              
              <p>Got questions in the meantime? Don't hesitate to give us a ring at <span class="phone-number">02 8014 3214</span>.</p>
            </div>

            <div class="signature">
              <p>Talk soon,<br>
              <strong>The Xpromo Team</strong></p>
            </div>
          </div>

          <div class="footer">
            <p>This email was sent automatically from XPromo.com.au</p>
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