import { HttpError } from "../../helpers/index.js";
import User from "../../models/Users_schema.js";

const updateSubscription =async(req,res)=>{
const{_id}=req.user
const isSubscription = "subscription" in req.body;
if (!isSubscription) {
    throw HttpError(400, "missing field subscription");
}
const result = await User.findOneAndUpdate(_id,req.body,{ new: true, runValidators:true });
if (!result) {
    throw HttpError(404,"Not found")
}
res.status(200).json(result)
};

export default updateSubscription;