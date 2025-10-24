import { Resend } from "resend";

export const sendMail = (userEmail, mailContent) => {
  const resend = new Resend(process.env.EMAIL_API);
  const emailSubject = mailContent.subject;
  const content = mailContent.message;
  const host = `Medium <medium@${process.env.MAIL}>`;
  const response = resend.emails.send({
    from: host,
    to: userEmail,
    subject: emailSubject,
    html: content,
  });
  return response;
};
