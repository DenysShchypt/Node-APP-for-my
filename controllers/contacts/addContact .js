import { Contact } from "../../models/contacts_schema.js";

const addContact = async (req, res) => {
    // додаємо id user який робить запит
    const{_id:owner}= req.user;
    const result = await Contact.create({...req.body,owner});
    res.status(201).json(result)
};

export default addContact;