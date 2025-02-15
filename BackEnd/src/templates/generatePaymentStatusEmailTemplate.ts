export function PaymentStatusEmailTemplate(voucher: any): string {
  return `
    <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Confirmation - The Holidays Club</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Arial', sans-serif;
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
      letter-spacing: -0.5px;
    }
    .gift-code {
      background: #f3e8ff;
      padding: 12px 24px;
      border-radius: 8px;
      color: #374151;
      font-size: 18px;
      margin-bottom: 20px;
    }
    .key-points {
      background: #f8fafc;
      padding: 32px;
      border-radius: 12px;
      margin-bottom: 24px;
      border: 1px solid #e5e7eb;
    }
    .confirmation-details {
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 24px;
      margin-bottom: 24px;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
      padding: 12px 0;
    }
    .detail-label {
      color: #4b5563;
      font-weight: 500;
      width: 45%;
    }
    .detail-value {
      color: #1f2937;
      font-weight: 600;
      width: 50%;
      text-align: right;
    }
    .next-steps {
      padding: 20px 0;
    }
    .next-steps h3 {
      color: #51226a;
      margin-top: 0;
      margin-bottom: 18px;
      font-size: 18px;
    }
    .next-steps ul {
      color: #4b5563;
      padding-left: 24px;
      line-height: 1.6;
      margin: 0;
    }
    .next-steps li {
      margin-bottom: 12px;
    }
    .cta-button {
      display: block;
      text-align: center;
      background: #51226a;
      color: white;
      padding: 16px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      margin: 32px 0;
      transition: transform 0.2s ease;
    }
    .cta-button:hover {
      transform: translateY(-2px);
    }
    .footer {
      padding-top: 24px;
    }
    .footer p {
      color: #6b7280;
      font-size: 14px;
      line-height: 1.5;
      margin: 8px 0;
    }
    .footer a {
      color: #51226a;
      text-decoration: none;
      font-weight: 500;
    }

    @media (max-width: 600px) {
      .container {
        padding: 16px;
        border: none;
      }
      .gift-code {
        padding: 10px 16px;
        font-size: 16px;
      }
      .detail-row {
        flex-direction: column;
      }
      .detail-label,
      .detail-value {
        width: 100%;
        text-align: left;
      }
      .detail-value {
        margin-top: 4px;
      }
      .cta-button {
        padding: 14px 24px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <a href="https://www.theholidaysclubs.com/" target="_blank">
        <img src="https://vms.theholidaysclubs.com/email/logo.png" alt="The Holidays Club">
      </a>
    </div>

    <!-- Banner -->
    <img src="https://vms.theholidaysclubs.com/email/bg.jpg" alt="Travel Experience" class="banner">

    <!-- Main Content -->
    <div class="content">
      <!-- Title Section -->
      <div style="text-align: center; margin-bottom: 32px;">
        <div class="gift-code">
          Booking Reference: <strong>${voucher.voucherCode}</strong>
        </div>
        <h1>Payment Confirmation</h1>
      </div>

      <!-- Confirmation Details -->
      <div class="key-points">
        <div class="confirmation-details">
          <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 24px;">
            Thank you for choosing The Holidays Club. We have successfully processed your payment 
            of <strong>₹ 5000/- </strong> and your booking is now confirmed.
          </p>

          <div class="detail-row">
            <span class="detail-label">Destination:</span>
            <span class="detail-value">${voucher.finalChoice.city}</span>
          </div>

          <div class="detail-row">
            <span class="detail-label">Travel Dates:</span>
            <span class="detail-value">
              ${
                voucher.finalChoice?.date
                  ? new Date(voucher.finalChoice.date).toLocaleDateString(
                      'en-US',
                      {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      },
                    )
                  : 'Dates not confirmed'
              }
            </span>
          </div>
        </div>

        <!-- Next Steps -->
        <div class="next-steps">
          <h3>What's Next?</h3>
          <ul>
            <li>Detailed itinerary will be emailed within 24 working hours</li>
            <li>Check your registered email for visa requirements (if applicable)</li>
            <li>Contact our support team for special requests or dietary needs</li>
          </ul>
        </div>
      </div>

      <!-- CTA Button -->
      <a href="https://www.theholidaysclubs.com/my-bookings" class="cta-button" style='color: #ffff;'>
        View Booking Details
      </a>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>Need assistance? <a href="mailto:booking@theholidaysclubs.com">Contact our support team</a></p>
      <p>Follow us on <a href="https://www.instagram.com/theholidaysclubs">Instagram</a> for travel inspiration</p>
      <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">
        This is an automated message. Please do not reply directly to this email.<br>
        © 2024 The Holidays Club. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}
