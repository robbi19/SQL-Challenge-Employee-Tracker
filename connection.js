const mysql = require('mysql');
const db = require('./db.sql');

// Create a database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_mysql_password', // Replace with your actual MySQL password
  database: 'employee_tracker_db',
});

module.exports = db;
