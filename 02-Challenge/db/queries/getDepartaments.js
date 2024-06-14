const pool = require("../db");

const getDepartments = async () => {
  const result = await pool.query("SELECT * FROM department");
  return result.rows;
};

module.exports = getDepartments;
