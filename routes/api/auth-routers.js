import express from "express";
import { ctrlWrapper, validateBody } from "../../decorators/index.js";
import { isEmptyBody, isValidId, authenticate, upload } from "../../middlewares/index.js"
import { userSignupSchema, userSigninSchema, userSubscriptionSchema } from "../../models/Users_schema.js";
import { getCurrent, signin, signout, signup, updateAvatar, updateSubscription } from "../../controllers/auth/index.js";

// Створюємо об'єкт з маршрутами
const routerUsers = express.Router();

// Реєстрація користувача   
routerUsers.post("/signup", isEmptyBody, validateBody(userSignupSchema), ctrlWrapper(signup));
// Логінізація користувача
routerUsers.post("/signin", isEmptyBody, validateBody(userSigninSchema), ctrlWrapper(signin));

routerUsers.get("/current", authenticate, ctrlWrapper(getCurrent));

routerUsers.post("/signout", authenticate, ctrlWrapper(signout));
// Оновлення статусу
routerUsers.patch("/subscription", authenticate, validateBody(userSubscriptionSchema), ctrlWrapper(updateSubscription));
// upload.single("") це коли очикується один файл
// upload.array("",10) це коли очікується більше одного файлу
// upload.fields([{name:"a",maxCount:5},{name:"b",maxCount:10}]) це коли очікується декілька файлів з різних полів
routerUsers.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(updateAvatar));
export default routerUsers;