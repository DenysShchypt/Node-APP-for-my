
import nodemailer from 'nodemailer';
// Додавання данних з env змінні оточення process.env
import "dotenv/config";

const { UKRNET_API_KEY, MAIL_UKRNET_FROM } = process.env;

const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
        user: MAIL_UKRNET_FROM,
        pass: UKRNET_API_KEY
    }
};
const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
    const email = { ...data, from: MAIL_UKRNET_FROM };
    await transport.sendMail(email)
    return true
}

export default sendEmail
