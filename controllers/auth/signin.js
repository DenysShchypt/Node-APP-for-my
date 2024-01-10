import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Додавання данних з env змінні оточення process.env
import "dotenv/config";
import { HttpError } from "../../helpers/index.js";
import User from "../../models/Users_schema.js";

const { JWT_SECRET } = process.env;

const signin = async (req, res) => {
    const { email, password } = req.body;
    // Перевіряємо чи є користувач з таким email в базі
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password invalid")
    };
    // Перевіряємо чи збігається пароль з тим що в базі
    const passwordCompare = await bcrypt.compare(password, user.password);
    // Якщо пароль не підходить
    if (!passwordCompare) {
        throw HttpError(401, "Email or password invalid")
    };
    // Створюємо token
    const payload = { id: user._id }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "20h" });
    // Записуємо token в базу
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        token: token, user: {
            email: user.email,
            subscription: user.subscription
        }
    })

};

export default signin;