import puppeteer from 'puppeteer';

export const generateMovieVoucherPDF = async (data: {
  name: string;
  giftCode: string;
  expiryDate: string;
}): Promise<Buffer> => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Holidays Club | Movie Ticket</title>
    <style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    #voucher-top, #voucher-bottom {
        background: url(https://vms.theholidaysclubs.com/pdf-converter/thc/movie-voucher/bnr1.png);
        height: 400px;
        width: 800px;
        background-size: cover !important;
        background-position: 15px center !important;
        border: 1px dashed #ddd;
        margin: 0 auto;
        background-repeat: no-repeat;
        padding: 15px;
    }
    #voucher-bottom {
        background: url(https://vms.theholidaysclubs.com/pdf-converter/thc/movie-voucher/bnr2.png);
        margin-top: 15px;
        background-position: center center !important;
    }
    .cntnt {
        max-width: 315px;
        height: 100%;
    }
    img {
        max-width: 100%;
    }
    .cntnt {
        max-width: 350px;
    }
    .dtlcntnt {
        display: block;
        border-bottom: 2px dotted #f000;
    }
    .member-dtls table tr td {
        padding-bottom: 15px;
    }
    .member-dtls table tr td .dtlcntnt {
        border-bottom: 2px dotted #222;
    }
    .contnt222 {
        width: 430px;
        float: right;
        height: 100%;
    }
    .condtns {
        padding-left: 100px;
        font-size: 18px;
        margin-top: 28px;
        margin-bottom: 29px;
    }
    .condtns ul li {
        margin-top: 5px;
    }
    .cnect {
        padding-left: 18px;
        font-size: 16px;
        margin-top: 58px;
    }
    </style>
</head>
<body>
    <main>
        <div id="voucher-top">
            <div class="cntnt">
                <img src="https://vms.theholidaysclubs.com/email/logo.png" style="max-width: 150px;margin-bottom: 25px; margin-top: 20px;" alt="" class="logo">
                <div class="member-dtls">
                    <div class="titleofcntnt" style="text-align: center; margin: 15px 0 30px;">
                        <img src="https://vms.theholidaysclubs.com/pdf-converter/thc/movie-voucher/title.png" style="max-width: 230px;" alt="Couple Movie Voucher">
                    </div>
                    <table style="width: 100%; font-size: 18px;">
                        <tr>
                            <td style="width: 90px;"><strong>Name:</strong></td>
                            <td><div class="dtlcntnt">${data.name}</div></td>
                        </tr>
                        <tr>
                            <td style="width: 90px;"><strong>Code:</strong></td>
                            <td><div class="dtlcntnt" style="font-weight: 600;">${data.giftCode}</div></td>
                        </tr>
                        <tr>
                            <td style="width: 90px;"><strong>Issue Date:</strong></td>
                            <td><div class="dtlcntnt">${data.expiryDate}</div></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div id="voucher-bottom">
            <div class="contnt222">
                <div class="trms111" style="padding-left: 80px;margin-top: 36px;text-align: center;">
                    <h2 style="color: #6a0dad; font-size: 24px;">Terms & Conditions Apply</h2>
                    <h3 style="color: #bd1b15;font-size: 18px;margin-bottom: 15px;margin-top: 9px;">Valid From Monday to Friday Only.</h3>
                </div>
                <div class="condtns">
                    <ul>
                        <li>Valid for 3 months from issue date</li>
                        <li>Booking to be done 3 days in advance.</li>
                        <li>No transferable.</li>
                        <li>To redeem this voucher kindly mail on booking@theholidaysclubs.com.</li>
                    </ul>
                </div>
                <div class="cnect">
                    <p>For any further assistance please feel free to contact us at <br>1800 274 3000 (From 10 AM to 6 PM India Time) or</p>
                </div>
            </div>
        </div>
    </main>
</body>
</html>
`;

  // TODO: change this to according to OS if linux server wala code other wise local in windows

  // for local

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
      // Set HTML content
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

      // Generate PDF
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
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
