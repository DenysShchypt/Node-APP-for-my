import { updateOneContact } from "../../db/contacts.js";

export const updateContact = async(req,res)=>{
    const{id}=req.params;
    const result = await updateOneContact(id,req.body);
    res.json(result)
}