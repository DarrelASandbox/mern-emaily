const sgMail = require('@sendgrid/mail');

// /*
class Mailer {
  constructor({ subject, recipients }, content) {
    sgMail.setApiKey(process.env.API_KEY_SENDGRID);
    this.msg = {
      to: recipients.map(({ email }) => email),
      from: 'no-reply@emaily.com',
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
// */
/*
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
      from: 'no-reply@emaily.com',
      subject,
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
// */
