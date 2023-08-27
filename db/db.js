const connection = require('./connection');
const cTable = require('console.table');

class DB {
    constructor(db) {
        this.db = db;
    }

    viewDepartments = () => 
        this.db.promise().query('SELECT * FROM department')
            .then(([data]) => console.table(data));

    viewEmployees = () => 
        this.db.promise().query(`
            SELECT
                e.id,
                e.first_name,
                e.last_name,
                r.title,
                d.name AS department,
                r.salary,
                CONCAT(e2.first_name, ' ', e2.last_name) manager
            FROM employee e
            JOIN role r ON e.role_id = r.id
            JOIN department d ON r.department_id = d.id
            JOIN employee e2 ON e.manager_id = e2.id`)
        .then(([data]) => console.table(data));

};

module.exports = new DB(connection);