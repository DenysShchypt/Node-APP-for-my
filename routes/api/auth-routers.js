import express from "express";
import { ctrlWrapper,validateBody } from "../../decorators/index.js";
import {isEmptyBody, isValidId, authenticate} from "../../middlewares/index.js"
import { userSignupSchema,userSigninSchema,userSubscriptionSchema } from "../../models/Users_schema.js";
import {getCurrent, signin, signout, signup, updateSubscription} from "../../controllers/auth/index.js";

// Створюємо об'єкт з маршрутами
const routerUsers = express.Router();

// Реєстрація користувача
routerUsers.post("/signup",isEmptyBody,validateBody(userSignupSchema),ctrlWrapper(signup));
// Логінізація користувача
routerUsers.post("/signin",isEmptyBody,validateBody(userSigninSchema),ctrlWrapper(signin));

routerUsers.get("/current",authenticate,ctrlWrapper(getCurrent));

routerUsers.post("/signout",authenticate,ctrlWrapper(signout));
// Оновлення статусу
routerUsers.patch("/subscription",authenticate,validateBody(userSubscriptionSchema),ctrlWrapper(updateSubscription));

export default routerUsers;