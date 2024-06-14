const inquirer = require("inquirer");
const pool = require("../db");
const getEmployees = require("./getEmployees");
const getRoles = require("./getRoles");
const { getRoleByTitle, getEmployeeByName } = require("../../helpers");

const updateEmployeeRole = async () => {
  try {
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "employee",
        message: "Which employee's role do you want to update?",
        choices: (
          await getEmployees()
        ).map(({ first_name, last_name }) => `${first_name} ${last_name}`),
      },
      {
        type: "list",
        name: "role",
        message: "Which role do you want to assign the selected employee?",
        choices: (await getRoles()).map(({ title }) => title),
      },
    ]);

    const [firstName, lastName] = answer.employee.split(" ");
    const employee = await getEmployeeByName(firstName, lastName);
    const role = await getRoleByTitle(answer.role);

    const updateQuery = "UPDATE employee SET role_id = $1 WHERE id = $2";
    const updateValues = [role.id, employee.id];

    const result = await pool.query(updateQuery, updateValues);
    return result.rowCount;
  } catch (error) {
    console.error("Error adding department:", error);
    throw error;
  }
};

module.exports = updateEmployeeRole;
