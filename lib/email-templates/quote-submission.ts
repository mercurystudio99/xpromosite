import { formatDate } from '../utils';

interface ProductQuote {
  name: string;
  quantity: number;
  specialInstruction?: string;
  price: number | string;  // Allow string for budget values
}

interface QuoteSubmissionData {
  products: ProductQuote[];
  totalAmount: number | string;  // Allow string for budget values
  targetDate?: Date;
  noDeadline: boolean;
  projectDescription?: string;
  hasLogo: boolean;
  name: string;
  company: string;
  phone: string;
  email: string;
  submissionDate: Date;
  projectFor?: string;  // Added for homepage form
  budget?: string;      // Added for homepage form
  formType?: 'homepage' | 'product';  // To differentiate between form types
}

export function generateQuoteEmailHtml(data: QuoteSubmissionData): string {
  const productsHtml = data.products.map(product => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #eee;">
        <strong>${product.name}</strong><br>
        Quantity: ${product.quantity}<br>
        ${product.specialInstruction ? `<span style="color: #666;">Special Instructions: ${product.specialInstruction}</span><br>` : ''}
        ${typeof product.price === 'number' 
          ? `<span style="color: #05172D;">Estimated (ex GST): $${product.price.toLocaleString()}</span>`
          : ''
        }
      </td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Quote Submission - XPromo</title>
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
          .section {
            background-color: #fff;
            padding: 20px;
            margin-bottom: 20px;
            border: 1px solid #eee;
            border-radius: 5px;
          }
          .section-title {
            color: #05172D;
            border-bottom: 2px solid #05172D;
            padding-bottom: 10px;
            margin-bottom: 15px;
          }
          .total {
            background-color: #f8f9fa;
            padding: 15px;
            margin-top: 10px;
            border-radius: 5px;
            font-weight: bold;
          }
          table {
            width: 100%;
            border-collapse: collapse;
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
            <h1 style="margin: 0;">New Quote Submission</h1>
            <p style="margin: 10px 0 0 0;">Submitted on ${formatDate(data.submissionDate, true)}</p>
            ${data.formType ? `<p style="margin: 5px 0 0 0;">Form Type: ${data.formType === 'homepage' ? 'Homepage Form' : 'Product Form'}</p>` : ''}
          </div>

          <div class="section">
            <h2 class="section-title">Quote Summary</h2>
            ${data.projectFor ? `<p><strong>Project Type:</strong> ${data.projectFor}</p>` : ''}
            ${data.budget ? `<p><strong>Budget:</strong> $${data.budget}</p>` : ''}
            <table>
              ${productsHtml}
            </table>
            <div class="total">
              Total Estimated (ex GST): ${typeof data.totalAmount === 'number' 
                ? `$${data.totalAmount.toLocaleString()}`
                : data.totalAmount
              }
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">Project Information</h2>
            <p><strong>Target Date:</strong> ${data.noDeadline ? 'No Deadline' : data.targetDate ? formatDate(data.targetDate, false) : 'Not specified'}</p>
            <p><strong>Project Description:</strong> ${data.projectDescription || 'None'}</p>
            <p><strong>Logo Uploaded:</strong> ${data.hasLogo ? '<span style="color: #28a745;">YES</span>' : '<span style="color: #dc3545;">NO</span>'}</p>
          </div>

          <div class="section">
            <h2 class="section-title">Contact Details</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Company:</strong> ${data.company}</p>
            <p><strong>Phone Number:</strong> ${data.phone}</p>
            <p><strong>Business Email:</strong> ${data.email}</p>
          </div>

          <div class="footer">
            <p>This email was generated automatically from the quote submission form on XPromo.com.au</p>
          </div>
        </div>
      </body>
    </html>
  `;
} 