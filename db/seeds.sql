INSERT INTO department(name)
	VALUES('Sales'),
		('Engineering'),
        ('Finance'),
        ('Legal');
        
INSERT INTO role(title, salary, department_id)
	VALUES('Sales Lead', 100000, 1),
        ('Software Engineer', 148000, 2),
        ('Accountant', 205000, 3),
        ('Legal Team Lead', 270000, 4);

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

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;