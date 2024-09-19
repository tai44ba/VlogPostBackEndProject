import nodemailer from 'nodemailer'
import { genEmailTemplate } from "./helper.js";

export const emailSender = async (user,verify) => {
  try {
    const {token , userId} = verify
    // setup transporter
    let transporter = nodemailer.createTransport({
      host: "smtp.mail.de",
      port: 465,
      secure: true,
      auth: {
        user: process.env.mailerEmail,
        pass: process.env.mailerPassword,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.mailerEmail,
      to: user.email,
      subject: "Verify your account!",
      html: genEmailTemplate(user.name, token, userId),
    });
  } catch (error) {
    console.error(error)
  }
};
