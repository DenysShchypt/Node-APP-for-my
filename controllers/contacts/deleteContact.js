import { removeContact } from "../../db/contacts.js";

const deleteContact = async (req, res) => {
    const { id } = req.params;
    const result = await removeContact(id);
    if (!result) {
        throw HttpError(404, `Contact with ${id} not found`)   
    }
    res.json({message:"Delete success"});
};

export default deleteContact;
