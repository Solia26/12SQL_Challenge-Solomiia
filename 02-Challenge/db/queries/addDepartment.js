const inquirer = require("inquirer");
const pool = require("../db");

const addDepartment = async () => {
  try {
    const { action } = await inquirer.prompt({
      type: "input",
      name: "action",
      message: "What is the name of the departament?",
    });

    const result = await pool.query(
      "INSERT INTO department (name) VALUES ($1) RETURNING *",
      [action]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error adding department:", error);
    throw error;
  }
};

module.exports = addDepartment;
