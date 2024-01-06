import {HttpError} from "../../helpers/index.js";
import { Contact } from "../../models/contacts_schema.js";

const updateFavorite = async(req,res)=>{
    const { id:_id } = req.params;
    const {_id:owner}=req.user;
const result = await Contact.findOneAndUpdate({_id,owner},req.body,
    // Третій аргумент для повернення оновленого об'єкту
{ new: true });
if (!result) {
    throw HttpError(404, `Contact with ${id} not found`)   
}
res.json(result);
};

export default updateFavorite;

