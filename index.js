const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const cTable = require('console.table');

// Create a connection pool for better efficiency
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cemployee_tracker_db'
});

const run = async () => {
  try {
    const connection = await pool.getConnection();

    console.log('\u001b[1;32m---- Successfully connected! ----');

    await runPrompt();

    connection.release();
  } catch (error) {
    console.error(error);
  } finally {
    pool.end();
  }
};

const query = async (sql, params) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(sql, params);
    return rows;
  } catch (error) {
    console.error(error);
  } finally {
    connection.release();
  }
};

const runPrompt = async () => {
  try {
    const selection = await inquirer.prompt({
      type: 'list',
      name: 'choice',
      message: '\u001b[1;43mWhat would you like to do right now?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add A Department',
        'Add A Role',
        'Add An Employee',
        'Update An Employee Role',
        'Exit'
      ]
    });

    switch (selection.choice) {
      case 'View All Departments':
        await viewAllDept();
        break;
      case 'View All Roles':
        await viewAllRoles();
        break;
      // Implement cases for other options
      case 'Exit':
        console.log('Bye!');
        break;
    }
  } catch (error) {
    console.error(error);
  }
};

const viewAllDept = async () => {
  try {
    console.log('\u001b[1;35m---- Now Viewing All Departments ----\u001b[0m');
    const sql = 'SELECT * FROM department';
    const departments = await query(sql);
    console.table(departments);
    await runPrompt();
  } catch (error) {
    console.error(error);
  }
};

// Implement viewAllRoles, viewAllEmp, addDept, addRole, addEmp, and updateEmpRole using similar structures.

run();
