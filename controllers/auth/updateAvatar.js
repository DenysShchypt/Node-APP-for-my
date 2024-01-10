import fs from "fs/promises"
import path from "path";
import Jimp from "jimp";
import User from "../../models/Users_schema.js";
// import { cloudinary } from "../../helpers/index.js";
const avatarsDir = path.resolve("public", "avatars");

const updateAvatar = async (req, res) => {

    // Завантаження файлу на cloudinary
    // try {
    //     const { url: avatarURL } = await cloudinary.uploader.upload(req.file.path, {
    //         folder: "avatars",
    //     })
    //     await fs.unlink(req.file.path);
    //     await User.findByIdAndUpdate(_id, { avatarURL });
    //     res.status(200).json({ avatarURL });
    // } catch (error) {
    //     await fs.unlink(req.file.path);
    //     throw error;
    // }

    const { _id } = req.user

    const { path: oldPath, filename } = req.file
    // Створюємо новий шлях до файлу
    const resultUpload = path.join(avatarsDir, filename)
    // Оброби аватарку пакетом jimp і постав для неї розміри 250 на 250
    Jimp.read(oldPath).then(image => {
        image.autocrop()
            .resize(250, 250)
            .write(resultUpload)
    }).catch(error => {
        console.log(error.message);
    });
    // Змінюємо старий шлях на новий
    await fs.rename(oldPath, resultUpload);
    // Шлях де лишається файл
    const avatarURL = path.join("public", "avatars", filename);
    // Перезаписуємо на user avatarURL
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({ avatarURL })
}

export default updateAvatar;