import util from 'util';
import consoleTable from 'console.table';
import { createConnection } from 'mysql2/promise';
import { prompt } from 'inquirer';

// Connect to the database
const db = createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'employee_tracker_db',
});

// Connect database
async function connectToDatabase() {
  try {
    await db.connect();
    console.log('Connected to the employee_tracker_db database.');
    mainMenu();
  } catch (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); 
  }
}


// Main Menu function
async function mainMenu() {
  try {
    const answer = await inquirer.prompt({
      name: 'start',
      type: 'list',
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
    });


    switch (answer.start) {
      case 'View All Employees':
        await viewEmployees();
        break;

      case 'View All Roles':
        await viewRoles();
        break;

      case 'View All Departments':
        await viewDepartments();
        break;

      case 'Add Employee':
        await addEmployee();
        break;

      case 'Add Role':
        await addRole(); 
        break;

      case 'Add Department':
        await addDepartment();
        break;

      case 'Update Employee Role':
        await updateEmployee(); 
        break;

      case 'EXIT':
        console.log('Thank you for using the employee tracker. Have a nice day!');
        await db.end(); 
        process.exit(0); // Exit the program
    }
  } catch (err) {
    console.error('Error:', err);
  }
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
async function addDepartment() {
  inquirer
    .prompt({
      name: 'department',
      type: 'input',
      message: 'What department would you like to add today?',
    })
    .then(function (answer) {
      let queryStr = 'INSERT INTO departments (name) VALUES (?)';
      db.query(queryStr, answer.department, function (err, res) {
        if (err) throw err;
        console.log(answer.department + ' has been added.');
        mainMenu();
      });
    });
}

async function addEmployee() {
  const roles = [];
  const managers = [];
  try {
    // Use async/await to fetch roles and managers
    const [roleRows] = await db.query("SELECT title FROM roles;");
    const [managerRows] = await db.query("SELECT first_name, last_name FROM employees");

    for (const row of roleRows) {
      roles.push(row.title);
    }
    for (const row of managerRows) {
      managers.push(row.first_name + ' ' + row.last_name);
    }

    const answers = await prompt([
      {
        name: 'firstName',
        type: 'input',
        message: "new employee's first name?",
      },
      {
        name: 'lastName',
        type: 'input',
        message: "new employee's last name?",
      },
      {
        name: 'title',
        type: 'list',
        message: "new employee's title?",
        choices: roles,
      },
      {
        name: 'manager',
        type: 'list',
        message: "new employee's manager?",
        choices: managers,
      },
    ]);

    // Insert the new employee using async/await
    const [employeeRows] = await db.query(
      'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, (SELECT id FROM roles WHERE title = ?), (SELECT id FROM employees AS e WHERE CONCAT(e.first_name, " ", e.last_name) = ?))',
      [answers.firstName, answers.lastName, answers.title, answers.manager]
    );

    console.log('Great! Successfully added an employee!');
    mainMenu();
  } catch (err) {
    throw err;
  }
}
connectToDatabase();
