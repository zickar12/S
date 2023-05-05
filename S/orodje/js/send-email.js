const nodemailer = require('nodemailer');

exports.handler = function(event, context, callback) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'YOUR_EMAIL_ADDRESS',
      pass: 'YOUR_EMAIL_PASSWORD'
    }
  });

  const { email } = JSON.parse(event.body);

  const mailOptions = {
    from: 'YOUR_EMAIL_ADDRESS',
    to: email,
    subject: 'Thank you for signing up!',
    text: 'Thank you for signing up!'
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      callback(error);
    } else {
      console.log('Email sent: ' + info.response);
      callback(null, {
        statusCode: 200,
        body: 'Email sent'
      });
    }
  });
};
