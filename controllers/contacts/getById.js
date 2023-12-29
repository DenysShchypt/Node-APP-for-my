import { getContactById } from "../../db/contacts.js";
import { HttpError } from "../../helpers/index.js";

const getById = async (req, res) => {
    const { id } = req.params
    const result = await getContactById(id);
    // Відповідь на фронтенд якщо немає об'єкта
    if (!result) {
        // Передаємо аргументи функції HttpError
        throw HttpError(404, `Contact with ${id} not found`)
    }
    res.json(result)
};

export default getById;