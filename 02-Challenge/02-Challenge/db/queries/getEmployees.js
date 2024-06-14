const pool = require("../db");

const getEmployees = async () => {
  const result = await pool.query(`
    SELECT 
      e.id,
      e.first_name,
      e.last_name,
      r.title AS role,
      r.salary,
      d.name AS department,
      e.manager_id,
      m.first_name AS manager_first_name,
      m.last_name AS manager_last_name
    FROM 
      employee e
    JOIN 
      role r ON e.role_id = r.id
    JOIN
      department d ON r.department_id = d.id
    LEFT JOIN 
      employee m ON e.manager_id = m.id
  `);

  const employees = result.rows.map((employee) => {
    return {
      id: employee.id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      role: employee.role,
      salary: employee.salary,
      department: employee.department,
      manager: employee.manager_id
        ? `${employee.manager_first_name} ${employee.manager_last_name}`
        : null,
    };
  });

  return employees;
};

module.exports = getEmployees;
