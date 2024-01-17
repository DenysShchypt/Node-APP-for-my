import bcrypt from "bcrypt";
import ElasticEmail from '@elasticemail/elasticemail-client';
import {
    HttpError,
    sendElasticEmail,
    // sendEmail
} from "../../helpers/index.js";
import User from "../../models/Users_schema.js";
import gravatar from "gravatar";
import { v4 as uuidv4 } from 'uuid';
import "dotenv/config";
const { BASE_URL, ELASTICEMAIL_FROM } = process.env

const signup = async (req, res) => {
    // Шукаємо користувача в базі
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email already in use")
    }
    // Хешуємо пароль за допомогою bcrypt
    const hashPassword = await bcrypt.hash(password, 10);
    // Cтворюємо тимчасову аватар
    const avatarURL = gravatar.url(email);
    const verificationToken = uuidv4();
    // Зберігаємо user в базі з захешованим паролем
    const newUser = await User.create({ ...req.body, avatarURL, verificationToken, password: hashPassword });
    // Варіант верифікації з nodemailer
    // const verifyEmail = {
    //     to: email,
    //     subject: "Verify email",
    //     html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`
    // };
    // await sendEmail(verifyEmail)

    // Варіант верифікації з elasticemail
    const emailData = {
        Recipients: [{
            Email: email,
            Fields: {
                name: "Denys"
            }
        }],
        Content: {
            Body: [
                {
                    ContentType: "HTML",
                    Charset: "utf-8",
                    Content: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`
                }
            ],
            From: ELASTICEMAIL_FROM,
            Subject: "Verify your email"
        }
    }

    sendElasticEmail(emailData);

    res.json({
        username: newUser.username,
        email: newUser.email
    })
}

export default signup