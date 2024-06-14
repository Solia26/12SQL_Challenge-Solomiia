const pool = require("../db/db");
const getRoleByTitle = async (title) => {
  // Реализация запроса к базе данных для получения роли по названию
  const query = "SELECT id FROM role WHERE title = $1";
  const values = [title];

  const res = await pool.query(query, values);
  return res.rows[0];
};
module.exports = getRoleByTitle;
