import puppeteer from 'puppeteer';

export const generateVoucherPDF = async (data: {
  name: string;
  giftCode: string;
  issueDate: string;
  expiryDate: string;
  voucherUrl: string;
}): Promise<Buffer> => {
  const htmlContent = `
   <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>The Holidays Club</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background-color: #ffffff;
        }
        .container {
        width: 794px; /* A4 width */
        max-width: 100%;
        margin: 0 auto;
        padding: 10px;
        border: 2px solid #e5e7eb;
        border-radius: 12px;
        box-sizing: border-box;

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
          margin-bottom: 10px;
          margin-top: 10px;
        }
        .content {
          background: white;
        }
        h1 {
          font-size: 16px;
          color: #51226a;
          text-align: center;
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
          margin-bottom: 10px;
        }
        .key-points {
          background: #f8fafc;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 10px;
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
          margin-bottom: 8px;
        }
        .key-points svg {
          margin-right: 8px;
          stroke: #51226a;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
          
        }
        .table td {
          padding: 8px;
          border: 1px solid #e5e7eb;
          text-align: center;
          font-size: 12px;
        }
        .cta-button {
          display: block;
          text-align: center;
          background: #51226a;
          color: white;
          padding: 8px 20px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .terms {
          border-top: 2px solid #e5e7eb;
          padding-top: 10px;
        }
        .terms, .key-points {
          page-break-inside: avoid;
        }
        .terms h3 {
          color: #51226a;
          margin-bottom: 10px;
        }
        .terms ul {
          color: #4b5563;
          padding-left: 20px;
          line-height: 1.2;
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
            padding: 10px;
          }
          .banner {
            width: 100%;
          }
          .cta-button {
            padding: 8px 20px;
            font-size: 12px;
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
             <span>Gift Code:</span>
             <strong>${data.giftCode}</strong>
          </div>
             <h1 style="text-align: center;">Congratulations! ${data.name}</h1>
          </div>


          <!-- Main Text -->
          <p class="main-text">
            On participation in the presentation of <strong>The Holidays Club</strong>, 
            this voucher is issued to: <strong>${data.name}</strong> on ${data.issueDate} and is 
            <strong>valid for six months</strong> until ${data.expiryDate}.
          </p>

          <!-- Key Points -->
          <div class="key-points">
            <ul>
              <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#51226a"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Requires three date/destination options for booking</li>
              <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#51226a"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>3N/4D accommodation in STD/Semi Deluxe rooms</li>
              <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#51226a"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Valid for 2 adults + 2 children (below 12 years)</li>
            </ul>
          </div>

          <!-- Destination Choices Table -->
         <!-- Preferred Destinations & Dates -->
          <div>
             <h3>Preferred Destinations & Dates</h3>
             <table class="table">
               <tr>
                <th>Choice</th>
                <th>Destination</th>
                <th>Date</th>
              </tr>
              <tr>
                 <td>Choice 1</td>
                 <td>..............</td>
                  <td>..............</td>
              </tr>
              <tr>
               <td>Choice 2</td>
               <td>..............</td>
               <td>..............</td>
              </tr>
              <tr>
              <td>Choice 3</td>
              <td>..............</td>
              <td>..............</td>
             </tr>
           </table>
        </div>


          <!-- CTA Button -->
          <a href="${data.voucherUrl}" class="cta-button" style="margin-top: 15px;">Redeem Voucher Online</a>

          <!-- Terms & Conditions -->
          <div class="terms">
            <h3>Terms & Conditions</h3>
            <ul>
              <li>Valid at associate Hotels & Resorts only</li>
              <li>Excludes peak seasons and major holidays</li>
              <li>Non-transferable and non-refundable</li>
              <li>Requires ₹5000 prepaid administration fee</li>
              <li>Destinations: Rishikesh, Shimla, Goa, Agra, Jaipur, etc.</li>
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

  // TODO: change this to according to OS if linux server wala code other wise local in windows

  // For Local

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // Set HTML content
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
    });

    await browser.close();

    // Convert Uint8Array to Buffer
    return Buffer.from(pdfBuffer);
  } catch (error) {
    await browser.close();
    throw error;
  }

  //   for server

  try {
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium-browser', // Path to Chromium
      headless: true, // Ensures Puppeteer runs in headless mode
      ignoreDefaultArgs: ['--disable-extensions'], // To avoid unnecessary default args
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    return Buffer.from(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error; // Re-throw error after logging
  }
};
