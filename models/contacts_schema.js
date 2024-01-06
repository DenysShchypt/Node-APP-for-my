import Joi from "joi";
import { Schema, model } from "mongoose";
import { addUpdateSettings, handleMongooseError } from "../helpers/index.js";


// ствоюємо Монгус схему
const contactsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
   owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }

}
  // Дата створення і дата оновлення версії __V
  , { versionKey: false, timestamps: true });
// Викликається хук після невдалого збереження
//Обробка помилки з невірним записом до/після pre/post збереження "save" схеми contactsSchema
contactsSchema.post("save", handleMongooseError);
// Обробник об'єкта перед збереженням
contactsSchema.pre("findByIdAndUpdate", addUpdateSettings);
// Хук для невдалого оновлення
contactsSchema.post("findByIdAndUpdate", handleMongooseError);
// Схема того що нам приходить з POST або PUT
export const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required()
});

// Схема обробки PATCH запиту
export const updatePatchSchema = Joi.object({
  favorite: Joi.boolean().required()
});

export const Contact = model("contact", contactsSchema);