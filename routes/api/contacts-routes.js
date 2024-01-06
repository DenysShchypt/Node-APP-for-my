import express from "express";
import { ctrlWrapper,validateBody } from "../../decorators/index.js";
import { addContact, deleteContact, getAll, getById, updateContact, updateFavorite } from "../../controllers/contacts/index.js";
import {contactAddSchema,updatePatchSchema} from "../../models/contacts_schema.js"
import {authenticate, isEmptyBody, isValidId} from "../../middlewares/index.js"

// Створюємо об'єкт з маршрутами
const routerContacts = express.Router();
// Перевірка всіх маршрутів мідлваре authenticate
routerContacts.use(authenticate);
// Запит на головну сторінку контактів
routerContacts.get("/", ctrlWrapper(getAll));
// Запит контакта за ID
routerContacts.get("/:id",isValidId, ctrlWrapper(getById));
// Створення нового контакту
routerContacts.post("/",isEmptyBody,validateBody(contactAddSchema) ,ctrlWrapper(addContact));
//Оновлення контакту за ID
routerContacts.put("/:id",isValidId,isEmptyBody,validateBody(contactAddSchema) , ctrlWrapper(updateContact));
//Видалення контакту за ID
routerContacts.delete("/:id",isValidId, ctrlWrapper(deleteContact));
//Оновлення контакту за ID окремого поля
routerContacts.patch("/:id/favorite",isValidId,isEmptyBody,validateBody(updatePatchSchema), ctrlWrapper(updateFavorite));

export default routerContacts;