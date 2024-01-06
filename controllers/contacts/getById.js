
import { HttpError } from "../../helpers/index.js";
import { Contact } from "../../models/contacts_schema.js";

const getById = async (req, res) => {
    const { id:_id } = req.params;
    const {_id:owner}=req.user;
    const result = await Contact.findOne({_id,owner});
    // Відповідь на фронтенд якщо немає об'єкта
    if (!result) {
        // Передаємо аргументи функції HttpError
        throw HttpError(404, `Contact with ${id} not found`)
    };
    res.json(result);
};

export default getById;