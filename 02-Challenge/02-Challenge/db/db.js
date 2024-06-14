const { Pool } = require("pg"); // Импортируем библиотеку по работе с БД
require("dotenv").config(); // Импотрируем пакет с конфигом, чтобы обращатся к переменным окружения с файла .env. Чтобы личные данные не хранились на гите

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env; // Через деструктуризацию достаём переменные окружения с файла .env

// Ниже через пакет pg и его конструктор Pool подключаемся к БД
const pool = new Pool({
  host: DB_HOST, // Указали хост
  user: DB_USER, // Указали имя юзера в ПГ
  password: DB_PASS, // Указали пароль юзера в ПГ
  database: DB_NAME, // Указали название БД
  port: 5432, // Указали порт
});

module.exports = pool;
