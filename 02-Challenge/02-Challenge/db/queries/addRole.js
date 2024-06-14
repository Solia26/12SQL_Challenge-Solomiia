const inquirer = require("inquirer");
const pool = require("../db");
const getDepartments = require("./getDepartaments");

const addRole = async () => {
  try {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "roleName",
        message: "What is the name of the role?",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "What is the salary of the role?",
      },
      {
        type: "list",
        name: "roleDepartment",
        message: "Which department does the role belong to?",
        choices: (await getDepartments()).map(({ name }) => name),
      },
    ]);
    // Получение идентификатора департамента
    const departmentResult = await pool.query(
      "SELECT id FROM department WHERE name = $1",
      [answer.roleDepartment]
    );
    if (departmentResult.rows.length === 0) {
      throw new Error(`Department ${role.roleDepartment} not found`);
    }
    const departmentId = departmentResult.rows[0].id;
    // Вставка новой роли
    const insertRoleQuery = `
      INSERT INTO role (title, salary, department_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [answer.roleName, answer.roleSalary, departmentId];

    const roleResult = await pool.query(insertRoleQuery, values);
    return roleResult.rows[0];
  } catch (error) {
    console.error("Error adding department:", error);
    throw error;
  }
};

module.exports = addRole;
