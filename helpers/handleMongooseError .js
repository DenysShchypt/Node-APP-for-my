// Обробка помилки з невірним записом status
const handleMongooseError = (error, data, next) => {
    const { name, code } = error
    // Визначаємо чи є конфлікт 409 і присвоюємо відповідну помилку
    const status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
    // Присвоюємо статус помилки
    error.status = status;
    // Прокидаємо далі в модель
    next()
  };
  export default handleMongooseError;