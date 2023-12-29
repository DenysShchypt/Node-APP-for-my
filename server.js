import app from "./app.js";
import mongoose from "mongoose";
const { DB_HOST, PORT = 3000 } = process.env;
// Підключення до бази
mongoose.connect(DB_HOST).then(
    // Запуск сервера
    app.listen(PORT, () => { console.log("Server on port 3000") })
).catch(error => {
    console.log(error.message);
    // Команда яка закриває запущені процеси
    process.exit(1)
})
