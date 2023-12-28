import express from "express";
import { getAll } from "../../controllers/contacts/getAll.js";
import { getById } from "../../controllers/contacts/getById.js";
import { addContact } from "../../controllers/contacts/addContact .js";
import { updateContact } from "../../controllers/contacts/updateContact.js";
import { deleteContact } from "../../controllers/contacts/deleteContact.js";
// Створюємо об'єкт з маршрутами
const router = express.Router()

// Запит на головну сторінку контактів
router.get("/", getAll);
// Запит контакта за ID
router.get("/:id", getById);
// Створення нового контакту
router.post("/", addContact);
//Оновлення контакту за ID
router.put("/:id", updateContact);
//Видалення контакту за ID
router.delete("/:id", deleteContact);

export default router;