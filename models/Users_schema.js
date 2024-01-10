import Joi from "joi";
import { Schema, model } from "mongoose";
import { addUpdateSettings, handleMongooseError} from "../helpers/index.js";
const emailRegexp= /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const versionSubscription = ["starter", "pro", "business"];
const userSchema= new Schema({
username:{
    type:String,
    required:true
},
email:{
    type:String,
    match:emailRegexp,
    unique:true,
    required:true,
},
password:{
    type:String,
    required:true,
    minlength:6
}, 
subscription: {
    type: String,
    enum: versionSubscription,
    default: "starter"
  },
 token: {
    type: String,
    default: ""
  },
  avatarURL: {
    type: String,
    required: [true, 'avatarURL is required']
  }
},{ versionKey: false, timestamps: true });

// Викликається хук після невдалого збереження
//Обробка помилки з невірним записом до/після pre/post збереження "save" схеми contactsSchema
userSchema.post("save", handleMongooseError);
// Обробник об'єкта перед збереженням
userSchema.pre("findByIdAndUpdate", addUpdateSettings);
// Хук для невдалого оновлення
userSchema.post("findByIdAndUpdate", handleMongooseError);

export const userSignupSchema=Joi.object({
username:Joi.string().required(),
email:Joi.string().pattern(emailRegexp).required(),
password:Joi.string().min(6).required()
});

export const userSigninSchema=Joi.object({
email:Joi.string().pattern(emailRegexp).required(),
password:Joi.string().min(6).required()
});

export const userSubscriptionSchema=Joi.object({
    subscription:Joi.string().valid(...versionSubscription).required(),
});

const User = model("user",userSchema);

export default User;