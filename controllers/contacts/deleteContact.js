import { removeContact } from "../../db/contacts.js";

 export const deleteContact = async(req,res)=>{
    const{id}=req.params;
    const result = await removeContact(id);
    res.json(result)
}