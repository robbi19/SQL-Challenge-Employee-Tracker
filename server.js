const util = require('util');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const mysql = require('mysql'); // Add this line for importing the mysql module
const validate = require('./validation');

// Create a database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employeetrackerdb',
});

const queryAsync = util.promisify(connection.query).bind(connection);

connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected to employeetrackerdb database.');
  mainMenu();
});

// Main Menu function
function mainMenu() {
  inquirer
    .prompt([
      {
        name: 'start',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
          'View All Employees',
          'View All Roles',
          'View All Departments',
          'Add Employee',
          'Add Role',
          'Add Department',
          'Update Employee Role',
          'EXIT',
        ],
      },
    ])
    .then(function (answer) {
      switch (answer.start) {
        case 'View All Employees':
          viewEmployees();
          break;

        case 'View All Roles':
          viewRoles();
          break;

        case 'View All Departments':
          viewDepartments();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Add Role':
          addRole();
          break;

        case 'Add Department':
          addDepartment();
          break;

        case 'Update Employee Role':
          updateEmployee();
          break;

        case 'EXIT':
          console.log('Thank you for using the company search database. Have a nice day!');
          connection.end();
      }
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: "What is the title of the new role?",
      },
      {
        name: 'salary',
        type: 'input',
        message: "What is the salary for this role?",
      },
      
    ])
    .then(function (answer) {
      const queryStr = "INSERT INTO roles (title, salary) VALUES (?, ?)";
      connection.query(queryStr, [answer.title, answer.salary], function (err, res) {
        if (err) throw err;
        console.log(`${answer.title} role has been added.`);
        mainMenu();
      });
    });
}

// Update Employee Role function
function updateEmployee() {
  // Get the list of employees and roles for prompt choices
  const employees = [];
  const roles = [];
  
  const queryEmployees = "SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employees";
  const queryRoles = "SELECT id, title FROM roles";
  
  Promise.all([
    queryAsync(queryEmployees),
    queryAsync(queryRoles)
  ])
  .then(([employeeResults, roleResults]) => {
    employeeResults.forEach(employee => employees.push({ name: employee.name, value: employee.id }));
    roleResults.forEach(role => roles.push({ name: role.title, value: role.id }));

    inquirer
      .prompt([
        {
          name: 'employee',
          type: 'list',
          message: "Select the employee to update:",
          choices: employees,
        },
        {
          name: 'role',
          type: 'list',
          message: "Select the new role for the employee:",
          choices: roles,
        },
      ])
      .then(function (answer) {
        const queryStr = "UPDATE employees SET role_id = ? WHERE id = ?";
        connection.query(queryStr, [answer.role, answer.employee], function (err, res) {
          if (err) throw err;
          console.log("Employee role has been updated.");
          mainMenu();
        });
      });
  })
  .catch(err => {
    console.error("Error fetching employee and role data:", err);
    mainMenu();
  });
}
