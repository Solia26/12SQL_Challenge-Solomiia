const inquirer = require("inquirer");
const {
  getDepartments,
  getRoles,
  getEmployees,
  generateTestData,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} = require("./db/queries");

async function questionForYou() {
  const answer = await inquirer.prompt({
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: [
      "Generate test data",
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Exit",
    ],
  });

  switch (answer.action) {
    case "Generate test data":
      try {
        await generateTestData();
      } catch (error) {
        console.log(error);
      }
      break;
    case "View all departments":
      const departments = await getDepartments();
      console.table(departments);
      break;
    case "View all roles":
      const roles = await getRoles(); //тут по работе с roles
      console.table(roles);
      break;
    case "View all employees":
      const employees = await getEmployees(); //тут по работе с employees
      console.table(employees);
      break;
    case "Add a department":
      const department = await addDepartment(); //тут по работе с employees
      console.log(`Added ${department.name} to the database`);
      break;
    case "Add a role":
      const role = await addRole(); //тут по работе с employees
      console.log(`Added ${role.title} to the database`);
      break;
    case "Add an employee":
      const employee = await addEmployee(); //тут по работе с employees
      console.log(
        `Added ${employee.first_name} ${employee.last_name} to the database`
      );
      break;
    case "Update an employee role":
      const count = await updateEmployeeRole(); //тут по работе с employees
      count ? console.log("Updated emloees role") : console.log("Ooops :(");
      break;

    case "Exit":
      process.exit();
  }

  questionForYou();
}

questionForYou();
