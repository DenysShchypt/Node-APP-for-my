import bcrypt from "bcrypt";
import { HttpError } from "../../helpers/index.js";
import User from "../../models/Users_schema.js";
import gravatar from "gravatar";

const signup = async(req,res)=>{
    // Шукаємо користувача в базі
    const{email,password}=req.body;
    const user = await User.findOne({email});
    if (user) {
        throw HttpError(409,"Email already in use")
    }
    // Хешуємо пароль за допомогою bcrypt
const hashPassword = await bcrypt.hash(password,10);
    // Cтворюємо тимчасову аватар
    const avatarURL = gravatar.url(email);
// Зберігаємо user в базі з захешованим паролем
const newUser = await User.create({...req.body,avatarURL,password:hashPassword});

res.json({
    username:newUser.username,
    email:newUser.email
})
}

export default signup