
import { Contact } from "../../models/contacts_schema.js";

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5,favorite} = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find(favorite?{ owner,favorite }:{owner},
    // Виключення полів які не треба повертати через "-"
    "-createdAt -updatedAt",
    // додаткові налаштування пошуку skip(скільки пропустити об'єктів с початку бази), limit(скільки повернути об'єктів)
    { skip, limit }
  )
  // Першим параметром йде повна інформація про користувача, другим окрема властивість
  .populate("owner","username");
  // відправлення відповіді
  res.json(result)
};

export default getAll