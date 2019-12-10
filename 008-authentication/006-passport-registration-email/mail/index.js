const config = require("config");
const nodemailer = require('nodemailer');

const SMTP_CONFIG = config.get("mail.smtp");

const transporter = nodemailer.createTransport(SMTP_CONFIG, {
  from: SMTP_CONFIG.auth.user
});

module.exports = {
  sendHtml(to, subject, html) {
    return transporter.sendMail({
      to,
      subject,
      html,
    })
  },
  template: require('./template')
};
