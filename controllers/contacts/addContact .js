import { addNewContact } from "../../db/contacts.js";

const addContact = async (req, res) => {
    const result = await addNewContact(req.body);
    res.status(201).json(result)
};

export default addContact;