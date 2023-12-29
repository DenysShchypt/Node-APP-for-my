import app from "./app.js";
import mongoose from "mongoose";
const DB_HOST = "mongodb+srv://Denys:9jnIRUZcC4wZkFNE@cluster0.uuj4fhd.mongodb.net/?retryWrites=true&w=majority"

// Підключення до бази
mongoose.connect(DB_HOST).then(
    // Запуск сервера
    app.listen(3000, () => { console.log("Server on port 3000")})
).catch(error => {
    console.log(error.message);
    // Команда яка закриває запущені процеси
    process.exit(1)
})
