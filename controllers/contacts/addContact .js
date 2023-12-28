import { addNewContact } from "../../db/contacts.js";

export const addContact = async (req, res) => {
    const result = await addNewContact(req.body);
    res.json(result)
};