const sgMail = require('@sendgrid/mail');

class Mailer {
  constructor({ subject, recipients }, content) {
    sgMail.setApiKey(process.env.API_KEY_SENDGRID);
    this.msg = {
      to: recipients.map(({ email }) => email),
      from: process.env.GMAIL,
      subject: subject,
      html: content,
      trackingSettings: { enable_text: true, enabled: true },
    };
  }

  async send() {
    const response = await sgMail.send(this.msg);
    return response;
  }
}

module.exports = Mailer;
