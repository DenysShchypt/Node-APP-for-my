import express from "express";
import { ctrlWrapper,validateBody } from "../../decorators/index.js";
import { addContact, deleteContact, getAll, getById, updateContact } from "../../controllers/contacts/index.js";
import {contactAddSchema,contactUpdateSchema} from "../../schemas/contacts_schema.js"
import {isEmptyBody} from "../../middlewares/index.js"

// Створюємо об'єкт з маршрутами
const router = express.Router()

// Запит на головну сторінку контактів
router.get("/", ctrlWrapper(getAll));
// Запит контакта за ID
router.get("/:id", ctrlWrapper(getById));
// Створення нового контакту
router.post("/",isEmptyBody,validateBody(contactAddSchema) ,ctrlWrapper(addContact));
//Оновлення контакту за ID
router.put("/:id",isEmptyBody,validateBody(contactUpdateSchema) , ctrlWrapper(updateContact));
//Видалення контакту за ID
router.delete("/:id", ctrlWrapper(deleteContact));

export default router;