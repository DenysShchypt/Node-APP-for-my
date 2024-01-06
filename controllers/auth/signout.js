import User from "../../models/Users_schema.js";

const signout =async(req,res)=>{
const{_id}=req.user;
await User.findByIdAndUpdate(_id,{token:""});
res.json({
    message:"Signout success"
})
};

export default signout;