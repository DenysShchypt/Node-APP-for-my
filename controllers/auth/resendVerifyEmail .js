import "dotenv/config";
import { HttpError, sendEmail } from "../../helpers/index.js";
import User from "../../models/Users_schema.js";
const { BASE_URL } = process.env

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    // Перевіряємо чи є такий користувач в базі
    const user = await User.findOne({ email });
    // Якщо користувача немає в базі
    if (!user) {
        throw HttpError(400, "missing required field email")
    };
    // Якщо користувач вже верифікований
    if (user.verify) {
        throw HttpError(400, "Verification has already been passed");
    };
    // Якщо користувач не підтвердив верифікацію
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`
    };
    await sendEmail(verifyEmail);
    res.json({
        message: `Verify ${user.email} send success`,
    });
};

export default resendVerifyEmail;