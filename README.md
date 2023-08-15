# SQL-Challenge-Employee-Tracker
## Description
```
A command line application to manage the Departments, Roles and Employees of a company.

All information is stored, retrieved and modified using MySQL.

A user story and acceptance criteria were provided for this assignment, but no starter code was given.
```


## Table of Contents

Please use the links in the table below to navigate the ReadMe contents.

- [Employee-tracker](#Employee-tracker)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [User Story](#user-story)
      - [Summary](#summary)
  - [Installation](#installation)
  - [Website](#website)
  - [Deployed on](#deployed-on)


## User Story

```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```


#### Summary 
```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## Installation
```
1. npm init

2. npm install inquirer

3. npm install mysql2

4.Run the following command at the root of your project and answer the prompted questions:

npm start
```

## Website
- [Node.js](https://nodejs.org/en/)
- [MySQL2 package](https://www.npmjs.com/package/mysql2)
- [Inquirer package](https://www.npmjs.com/package/inquirer)
- [console.table package](https://www.npmjs.com/package/console.table)

## Deployed on
- 