import { allContacts } from "../../db/contacts.js";

export const getAll = async(req,res)=>{
    const result = await allContacts();
    // відправлення відповіді
    res.json(result)
};