const ejs = require('ejs');

interface ITemplateData {
  signature: string;
  buttonText: string;
  lines: string[];
}

interface IEmailConfig {
  redirect: string;
  from: string;
  to: string;
  subject: string;
  templatePath: string;
  templateData: ITemplateData;
}

module.exports = (Model, emailConfig: IEmailConfig) => {
  const { Email } = Model.app.models;
  return new Promise((resolve, reject) => {
    const tempPath = emailConfig.templatePath || require.resolve('simple-transaction-email-ejs/simple-email.ejs');
    ejs.renderFile(tempPath, { ...emailConfig.templateData, url: emailConfig.redirect }, (ejsError, str) => {
      if (ejsError) return reject(ejsError);
      return Email.send({
        from: emailConfig.from,
        to: emailConfig.to,
        subject: emailConfig.subject,
        html: str,
      }, (err) => {
        if (err) return reject(`MailError: InvitationMail: ${err.message}`);
        return resolve(emailConfig.to);
      });
    });
  });
};
