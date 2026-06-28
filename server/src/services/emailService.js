const nodemailer = require('nodemailer');

let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return transporter;
}

async function sendVerificationCode(email, code) {
  const transport = getTransporter();

  const mailOptions = {
    from: `"RABTA" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your RABTA verification code',
    html: `
      <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; background: #F6F4F0;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="font-family: 'Sora', Arial, sans-serif; font-size: 28px; font-weight: 700; letter-spacing: 8px; color: #0F1B2D; margin: 0;">RABTA</h1>
          <p style="font-size: 12px; color: #5B697D; letter-spacing: 2px; margin: 4px 0 0;">Incident Management</p>
        </div>
        <div style="background: #FFFFFF; border-radius: 6px; padding: 32px 24px; border: 1px solid #D9D4CC;">
          <h2 style="font-family: 'Sora', Arial, sans-serif; font-size: 18px; font-weight: 700; color: #0F1B2D; margin: 0 0 8px;">Verify your email</h2>
          <p style="font-size: 14px; color: #5B697D; line-height: 1.6; margin: 0 0 24px;">
            Enter this code to verify your email address and activate your account.
          </p>
          <div style="text-align: center; margin-bottom: 24px;">
            <span style="font-family: 'Sora', Arial, sans-serif; font-size: 36px; font-weight: 700; letter-spacing: 12px; color: #0F1B2D; background: #F6F4F0; padding: 12px 24px; border-radius: 6px;">${code}</span>
          </div>
          <p style="font-size: 12px; color: #5B697D; margin: 0;">
            This code expires in 10 minutes. If you didn't request this, ignore this email.
          </p>
        </div>
      </div>
    `,
  };

  await transport.sendMail(mailOptions);
}

module.exports = { sendVerificationCode };
