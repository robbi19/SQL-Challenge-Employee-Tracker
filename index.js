const util = require('util');
const consoleTable = require("console.table");
const { createConnection } = require('mysql2');
const { promisify } = require('util');
const { prompt } = require('inquirer');

// Connect to database
const db = createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employee_tracker_db'
});

db.query = util.promisify(db.query);

// Connect database
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected to employee_tracker_db database.");
  mainMenu();
});

// Main Menu function
function mainMenu() {
  prompt({
    name: "start",
    type: "rawlist",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "View All Roles",
      "View All Departments",
      "Add Employee",
      "Add Role",
      "Add Department",
      "Update Employee Role",
      "EXIT",
    ],
  })
    .then(function (answer) {
      switch (answer.start) {
        case "View All Employees":
          viewEmployees();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "View All Departments":
          viewDepartments();
          break;

        case "Add Employee":
          addEmployee(); // Implement this function
          break;

        case "Add Role":
          addRole(); // Implement this function
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Update Employee Role":
          updateEmployee(); // Implement this function
          break;

        case "EXIT":
          console.log(
            "Thank you for using the company search database. Have a nice day!"
          );
          db.end(); // Close the database connection
      }
    });
}

function viewEmployees() {
  const queryStr =
    "SELECT employees.id, employees.first_name AS 'First Name', employees.last_name AS 'Last Name', roles.title AS 'Title', departments.name AS 'Department', roles.salary AS 'Salary', CONCAT(manager.first_name, ' ' , manager.last_name) AS 'Manager' FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id";
  db.query(queryStr, function (err, data) {
    if (err) throw err;
    console.table(data);
    mainMenu();
  });
}

function viewRoles() {
  const queryStr =
    "SELECT roles.id, roles.title AS 'Title', roles.salary As 'Salary' FROM roles ORDER BY roles.id";
  db.query(queryStr, function (err, data) {
    if (err) throw err;
    console.table(data);
    mainMenu();
  });
}

function viewDepartments() {
  const queryStr =
    "SELECT departments.id, departments.name AS 'Department' FROM departments ORDER BY departments.id";
  db.query(queryStr, function (err, data) {
    if (err) throw err;
    console.table(data);
    mainMenu();
  });
}

// Function for adding a department
function addDepartment() {
  prompt({
    name: "department",
    type: "input",
    message: "What department would you like to add today?",
  })
    .then(function (answer) {
      let queryStr = "INSERT INTO departments (name) VALUES (?)";
      db.query(queryStr, answer.department, function (err, res) {
        if (err) throw err;
        console.log(answer.department + " has been added.");
        mainMenu();
      });
    });
}


// function to add an Employee
function addEmployee() {
  const roles = [];
  const managers = [];
  const queryRoles = "SELECT title FROM roles;";
  db.query(queryRoles, function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      roles.push(res[i].title);
    }
    const queryManager = "SELECT first_name, last_name FROM employees";
    db.query(queryManager, function (err, res) {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        managers.push(res[i].first_name + " " + res[i].last_name);
      }
      prompt([
          {
            name: "firstName",
            type: "input",
            message: " new employee's first name?",
          },
          {
            name: "lastName",
            type: "input",
            message: "new employee's last name?",
          },
          {
            name: "title",
            type: "list",
            message: " new employee's title?",
            choices: roles,
          },
          {
            name: "manager",
            type: "list",
            message: "new employee's manager?",
            choices: managers,
          },
        ])
        .then(function (answer) {
          const queryStr =
            "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, (SELECT id FROM roles WHERE title = ?), (SELECT id FROM employees AS e WHERE CONCAT(e.first_name, ' ', e.last_name) = ?))";
          connection.query(
            queryStr,
            [answer.firstName, answer.lastName, answer.title, answer.manager],
            function (err, res) {
              if (err) throw err;
              console.log("Great !Successfully added an employee!");
              mainMenu();

            }}
