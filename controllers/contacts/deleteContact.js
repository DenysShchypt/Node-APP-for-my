// import { removeContact } from "../../db/contacts.js";
import { Contact } from "../../models/contacts_schema.js";

const deleteContact = async (req, res) => {
    const { id:_id } = req.params;
    const {_id:owner}=req.user;
    const result = await Contact.findOneAndDelete({_id,owner});
    if (!result) {
        throw HttpError(404, `Contact with ${id} not found`)   
    }
    res.json({message:"Delete success"});
};

export default deleteContact;
