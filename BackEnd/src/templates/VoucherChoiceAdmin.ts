export const VoucherChoicesAdminEmailTemplate = (
  newChoice: any,
  voucher: any,
) => {
  return `
     <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Voucher Update Notification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #ffffff;
    }
    .container {
      max-width: 100%;
      width: 700px;
      margin: 0 auto;
      padding: 32px 16px;
      border: 2px solid #e5e7eb;
      border-radius: 16px;
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
      color: white;
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
        <div class="gift-code" style="margin-bottom: 12px; text-align: center; display: block">
          <span>Voucher Code:</span>
          <strong>${voucher.voucherCode}</strong>
        </div>
        <h1 style="text-align: center;">${voucher.customerName} has updated their voucher choices.</h1>
      </div>

      <!-- User Details -->
      <div class="key-points">
        <div style="padding: 20px; color: #555;">
          <p style="font-size: 16px; margin-bottom: 16px;">
            <strong>User:</strong> ${voucher.customerName}<br>
            <strong>Email:</strong> ${voucher.email}<br>
            <strong>Submission Date:</strong> ${new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
          </p>
        </div>
      </div>

      <!-- Updated Choices -->
      <div class="key-points">
        <div style="padding: 20px; color: #555;">
          <p style="font-size: 16px; margin-bottom: 16px;">Updated travel preferences:</p>
          
          <ul style="list-style-type: none; padding: 0; font-size: 16px;">
            <li style="padding-bottom: 10px;">
              <strong style="color: #6a0dad;">First Preference:</strong> 
              ${newChoice.choice1.city} - 
              ${new Date(newChoice.choice1.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </li>
            <li style="padding-bottom: 10px;">
              <strong style="color: #6a0dad;">Second Preference:</strong> 
              ${newChoice.choice2.city} - 
              ${new Date(newChoice.choice2.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </li>
            <li style="padding-bottom: 10px;">
              <strong style="color: #6a0dad;">Third Preference:</strong> 
              ${newChoice.choice3.city} - 
              ${new Date(newChoice.choice3.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </li>
          </ul>
        </div>
      </div>

      <!-- Admin Action Button -->
      <a  href="https://app.theholidaysclubs.com/Voucher/temp/${voucher._id}" 
         class="cta-button"
         style="margin-top: 20px; color: #fff;">
         Review Full Details in Dashboard
      </a>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p style="color: #dc2626; font-weight: bold;">Action required: Please confirm availability within 48 hours</p>
      <p>Need assistance? <a href="mailto:support@theholidaysclubs.com">Contact support team</a></p>
      <p>*This is an automated notification - please do not reply directly</p>
    </div>
  </div>
</body>
</html>
  `;
};
