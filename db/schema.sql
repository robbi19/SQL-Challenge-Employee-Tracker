DROP DATABASE IF EXISTS employeetrackerdb;

CREATE DATABASE employeetrackerdb;

USE employeetrackerdb;

/*   department table area*/
CREATE TABLE department (
    id INT AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);


