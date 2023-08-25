USE employee_tracker_db;


INSERT INTO department(name)
	VALUES('Sales'),
		('Engineering'),
        ('Finance'),
        ('Legal');
        
INSERT INTO role(title, salary, department_id)
	VALUES('Sales Lead', 100000, 1),
		('Salesperson', 95000, 1),
        ('Lead Engineer', 130000, 2),
        ('Software Engineer', 148000, 2),
        ('Account Manager', 210000, 3),
        ('Accountant', 205000, 3),
        ('Legal Team Lead', 270000, 4),
        ('Lawyer',250000, 4);

-- Manager area
INSERT INTO employee(first_name, last_name, role_id, manager_id)
	VALUES('John', 'West', 1, NULL),
		('River', 'Banks', 3, NULL),
        ('Stew', 'Cramps', 5, NULL),
        ('Choy', 'Lou', 7, NULL);

-- Employees area
INSERT INTO employee(first_name, last_name, role_id, manager_id)
	VALUES('Nick', 'Lease', 2, 1),
	('Allen', 'Farms', 4, 2),
    ('Leroy', 'Jenkins', 6, 3),
    ('Foster', 'Ash', 8, 4);

 -- SELECTING FOR CREATING 
--TABLES IN OUR SQL WORKBENCH 
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;