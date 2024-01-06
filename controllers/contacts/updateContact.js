// import { updateOneContact } from "../../db/contacts.js";
import {HttpError} from "../../helpers/index.js";
import { Contact } from "../../models/contacts_schema.js";

const updateContact = async(req,res)=>{
    const { id:_id } = req.params;
    const {_id:owner}=req.user;
    const result = await Contact.findByIdAndUpdate({_id,owner},req.body,

    { new: true, runValidators:true });
    if (!result) {
        throw HttpError(404, `Contact with ${id} not found`)   
    }
    res.json(result)
};

export default updateContact;