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
		('River', 'Banks', 2, NULL),
        ('Stew', 'Cramps', 3, NULL),
        ('Choy', 'Lou', 4, NULL);

-- Employees area
INSERT INTO employee(first_name, last_name, role_id, manager_id)
	VALUES('Nick', 'Lease', 1, 1),
	('Allen', 'Farms', 2, 1),
    ('Leroy', 'Jenkins', 3, 3),
    ('Foster', 'Ash', 4, 3);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;







       
    
       
      





