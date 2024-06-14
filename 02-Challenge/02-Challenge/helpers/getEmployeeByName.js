const pool = require("../db/db");
const getEmployeeByName = async (firstName, lastName) => {
  // Реализация запроса к базе данных для получения сотрудника по имени
  const query =
    "SELECT id FROM employee WHERE first_name = $1 AND last_name = $2";
  const values = [firstName, lastName];

  const res = await pool.query(query, values);
  return res.rows[0]; // Предполагается, что уникальность имени и фамилии гарантируется на уровне бизнес-логики
};

module.exports = getEmployeeByName;
