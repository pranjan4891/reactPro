import * as nodemailer from 'nodemailer';

/**
 * Sends an email using Nodemailer with an HTML template.
 * @param to - Recipient email address.
 * @param subject - Subject of the email.
 * @param htmlContent - The HTML content of the email.
 * @returns A promise that resolves when the email is sent successfully, or rejects with an error.
 */
export const sendMail = async (
  to: string,
  subject: string,
  htmlContent: string,
  attachments: { filename: string; content: Buffer; contentType: string }[],
): Promise<void> => {
  try {
    // Configure the transporter using Gmail and the App Password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.VOUCHER_EMAIL,
        pass: process.env.VOUCHER_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: '"The Holidays Club" <voucher@theholidaysclubs.com>',
      to, // Recipient address
      subject, // Subject line
      html: htmlContent, // Email body (HTML)
      attachments, // Attachments (optional)
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};
