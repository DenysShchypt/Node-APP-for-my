import { getContactById } from "../../db/contacts.js";

export const getById = async (req, res) => {
    const { id } = req.params
    const result = await getContactById(id);
    res.json(result)
};