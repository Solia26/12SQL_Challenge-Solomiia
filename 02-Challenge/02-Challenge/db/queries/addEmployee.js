const inquirer = require("inquirer");
const pool = require("../db");
const getEmployees = require("./getEmployees");
const getRoles = require("./getRoles");

const addEmployee = async () => {
  try {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "employeesRole",
        message: "What is the employee's Role?",
        choices: (await getRoles()).map(({ title }) => title),
      },
      {
        type: "list",
        name: "employeesManager",
        message: "What is the employee's manager?",
        choices: [
          "None",
          ...(
            await getEmployees()
          ).map(({ first_name, last_name }) => `${first_name} ${last_name}`),
        ],
      },
    ]);

    // Получение идентификатора роли
    const roleResult = await pool.query(
      "SELECT id FROM role WHERE title = $1",
      [answer.employeesRole]
    );

    if (roleResult.rows.length === 0) {
      throw new Error(`Role ${answer.employeesRole} not found`);
    }

    const roleId = roleResult.rows[0].id;

    // Получение идентификатора менеджера
    const managerNameParts = answer.employeesManager.split(" ");
    const managerResult = await pool.query(
      "SELECT id FROM employee WHERE first_name = $1 AND last_name = $2",
      [managerNameParts[0], managerNameParts[1]]
    );

    if (managerResult.rows.length === 0) {
      throw new Error(`Manager ${answer.employeesManager} not found`);
    }

    const managerId = managerResult.rows[0].id;

    // Вставка нового сотрудника
    const insertEmployeeQuery = `
      INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [answer.name, answer.lastName, roleId, managerId];

    const employeeResult = await pool.query(insertEmployeeQuery, values);

    return employeeResult.rows[0];
  } catch (error) {
    console.error("Error adding department:", error);
  }
};

module.exports = addEmployee;
