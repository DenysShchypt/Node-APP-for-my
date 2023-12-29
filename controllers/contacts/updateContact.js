import { updateOneContact } from "../../db/contacts.js";
import {HttpError} from "../../helpers/index.js";

const updateContact = async(req,res)=>{
    const{id}=req.params;
    const result = await updateOneContact(id,req.body);
    if (!result) {
        throw HttpError(404, `Contact with ${id} not found`)   
    }
    res.json(result)
};

export default updateContact;