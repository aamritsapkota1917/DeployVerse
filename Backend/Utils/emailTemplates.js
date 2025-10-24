export const verificationEmailTemplate = (token, clientUrl) => {
  const currentYear = new Date().getFullYear();
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333;">Verify Your Account</h2>
            <p style="color: #555;">
                Please verify your account by clicking on the button below.
            </p>
            <a href="${clientUrl}/api/auth/verify/${token}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px;">
                Verify Account
            </a>
            <p style="color: #555; margin-top: 20px;">
                If you did not request this, please ignore this email.
            </p>
            <p style="color: #777; font-size: 12px; margin-top: 20px;">
                &copy; ${currentYear} Your Company Name. All rights reserved.
            </p>
        </div>
    </body>
    </html>
    `;
};

export const resetEmailTemplate = (clientUrl, token) => {
  const currentYear = new Date().getFullYear();
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #333;">Reset Your Password</h2>
          <p style="color: #555;">
              We received a request to reset your password. Click the button below to reset it.
          </p>
          <a href="${clientUrl}/reset-password/${token}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #dc3545; text-decoration: none; border-radius: 5px; margin-top: 20px;">
              Reset Password
          </a>
          <p style="color: #555; margin-top: 20px;">
              If you did not request a password reset, please ignore this email or contact support if you have questions.
          </p>
          <p style="color: #777; font-size: 12px; margin-top: 20px;">
              &copy; ${currentYear} Your Company Name. All rights reserved.
          </p>
      </div>
  </body>
  </html>
  `;
};
