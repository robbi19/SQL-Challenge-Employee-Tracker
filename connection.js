const inquirer = require('inquirer');
const db = require('./db');

// Create a database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_mysql_password', // Replace with your actual MySQL password
  database: 'employeetrackerdb',
});

module.exports = db;