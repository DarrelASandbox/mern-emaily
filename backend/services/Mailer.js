const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class Mailer {
  constructor({ subject, recipients }, htmlContent) {
    this.recipients = recipients.map(({ email }) => email);
    this.isMultiple = true;

    if (this.recipients.length === 1) {
      this.recipients = this.recipients[0];
      this.isMultiple = false;
    }

    this.emails = {
      to: this.recipients,
      from: 'no-reply@example.com',
      subject: subject,
      html: htmlContent,

      tracking_settings: {
        click_tracking: {
          enable: true,
          enable_text: true,
        },
      },

      // Set isMultiple to true to send a single email to multiple
      // recipients but not by using the "to", "cc", or "bcc"
      isMultiple: this.isMultiple,
    };
  }

  async send() {
    try {
      if (!this.recipients.length) return null;
      return await sgMail.send(this.emails);
    } catch (error) {
      console.log(error);
    } finally {
      return null;
    }
  }
}

module.exports = Mailer;
