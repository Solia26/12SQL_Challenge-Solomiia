const pool = require("../db");

const getRoles = async () => {
  const result = await pool.query(`
    SELECT 
      r.id,
      r.title,
      d.name AS department,
      r.salary
    FROM 
      role r
    JOIN 
      department d ON r.department_id = d.id
  `);

  return result.rows;
};

module.exports = getRoles;
