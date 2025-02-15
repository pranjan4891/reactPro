export const generateFinalChoiceEmailTemplate = (
  city: string,
  validatedDate: Date,
): string => {
  return `
<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>The Holidays Club</title>
      <style>
        body {
          margin: 0;
          padding: 15px;
          font-family: Arial, sans-serif;
          background-color: #ffffff;
        }
        .container {
          max-width: 100%;
          width: 700px;
          margin: 0 auto;
          padding: 32px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
        }
        .header, .footer {
          text-align: center;
        }
        .header img {
          width: 180px;
          height: auto;
        }
        .banner {
          width: 100%;
          border-radius: 12px;
          margin-bottom: 24px;
          margin-top: 15px;
        }
        .content {
          background: white;
          border-radius: 16px;
         
        }
        h1 {
          font-size: 24px;
          color: #51226a;
          margin: 0;
        }
        .gift-code {
          background: #f3e8ff;
          padding: 8px 16px;
          border-radius: 8px;
          color: #374151;
        }
        .main-text {
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .key-points {
          background: #f8fafc;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 24px;
        }
        .key-points ul {
          list-style: none;
          padding: 0;
          margin: 0;
          color: #4b5563;
        }
        .key-points li {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }
        .key-points svg {
          margin-right: 8px;
          stroke: #51226a;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
        }
        .table td {
          padding: 12px;
          border: 1px solid #e5e7eb;
          text-align: center;
        }
        .cta-button {
          display: block;
          text-align: center;
          background: #51226a;
          color: #ffff;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: bold;
          margin-bottom: 24px;
        }
        .terms {
          border-top: 2px solid #e5e7eb;
          padding-top: 24px;
        }
        .terms h3 {
          color: #51226a;
          margin-bottom: 16px;
        }
        .terms ul {
          color: #4b5563;
          padding-left: 20px;
          line-height: 1.6;
        }
        .footer p {
          color: #6b7280;
          font-size: 12px;
        }
        .footer a {
          color: #51226a;
          text-decoration: none;
        }

        /* Responsive Design */
        @media (max-width: 600px) {
          .container {
            padding: 16px;
          }
          .banner {
            width: 100%;
          }
          .cta-button {
            padding: 10px 20px;
            font-size: 14px;
            color: #ffffff;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header with Logo -->
        <div class="header">
          <a href="https://www.theholidaysclubs.com/" target="_blank">
            <img src="https://vms.theholidaysclubs.com/email/logo.png" alt="The Holidays Club">
          </a>
        </div>

        <!-- Banner Image -->
        <img src="https://vms.theholidaysclubs.com/email/bg.jpg" alt="Banner" class="banner">

        <!-- Main Content -->
        <div class="content">
          <!-- Title Section -->
          <div style="display: block; margin-bottom: 24px;">
          <div style="text-align: center; margin-bottom: 20px;">
           <h2 style="color: #51226a;">Final Choice Updated</h2>
           <p style="font-size: 16px; color: #555;">We have successfully updated your final choice!</p>
           </div>
          </div>

         <!-- Main Text -->
          <div class="key-points">
            <h3 style="color: #3d405b;">Your New Final Choice: ${city}</h3>
              <p style="font-size: 14px; color: #333; line-height: 1.6;">
              <strong>City:</strong> ${city} <br>
              <strong>Date:</strong> ${validatedDate.toDateString()}
              </p>
             
          </div>
          
          <p><span style="color:#f00">*</span>Kindly proceed with the payment of the booking fee of <strong>₹ 5000/-</strong>.</p>
          <p><span style="color:#f00">*</span>Once the payment is successfully processed, please share the payment receipt with us.</p>

           
            <!-- CTA Button -->
          <a href="https://pages.razorpay.com/makePayments" class="cta-button">Pay Now</a>

          <!-- Terms & Conditions -->
          <div class="terms">
            <h3>Terms & Conditions</h3>
            <ul>
              <li>Valid at associate Hotels & Resorts only</li>
              <li>Excludes peak seasons and major holidays</li>
              <li>Non-transferable and non-refundable</li>
              <li>Requires ₹5000 prepaid administration fee</li>
            </ul>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p>For bookings: <a href="mailto:booking@theholidaysclubs.com">booking@theholidaysclubs.com</a></p>
          <p>*Terms & Conditions Apply</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
