import { allContacts } from "../../db/contacts.js";

const getAll = async (req, res) => {
    const result = await allContacts();
    // відправлення відповіді
    res.json(result)
};

export default getAll