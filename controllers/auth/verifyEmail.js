import { HttpError } from "../../helpers/index.js";
import User from "../../models/Users_schema.js";

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    // Переверяємо чи є в базі користувач з токеном verificationToken
    const user = await User.findOne({ verificationToken });
    if (!user) {
        throw HttpError(404, "Email not found or email verify")
    }
    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });
    res.status(200).json({ message: "Verification successful" });
};

export default verifyEmail