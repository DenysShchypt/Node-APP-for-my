import express from "express";
import logger from "morgan";
import cors from "cors";
import router from "./routes/api/contacts-routes.js";
 const app =express();//web-server 

const formatsLogger = app.get("env")==="development"?"dev":"short";
// Middleware для логування
app.use(logger(formatsLogger))
// Middleware for CORS questions
app.use(cors());
app.use(express.json());
// Обробка запитів на API за допомогою маршрутів
app.use("/api/contacts", router)
// Middleware для невірного запиту
app.use((req,res)=>{
    res.status(404).json({message:'Not found'})
});

export default app;