import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import dotenv from 'dotenv';
dotenv.config();

let nodeConfig = {
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
};

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Mihriban',
    link: 'https://mailgen.js/',
  },
});

// POST http://localhost:5000/api/registermail
// Send a welcome email to the user
export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  let email = {
    body: {
      name: username,
      intro:
        text ||
        'Welcome to My Project! We’re very excited to have you on board.',
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
  let emailBody = MailGenerator.generate(email);

  let message = {
    from: `${process.env.EMAIL}`,
    to: userEmail,
    subject: subject || 'Welcome!',
    html: emailBody,
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    res
      .status(200)
      .json({ message: 'You should receive an email from us.', info });
  });
};
