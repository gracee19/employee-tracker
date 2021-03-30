const mysql = require("mysql");
const inquirer = require("inquirer");
// const { type } = require("os");
// const { get } = require("lodash");
require("dotenv").config();

//connection
const connection = mysql.createConnection({
  host: "localhost",

  // port
  port: 3306,

  // user
  user: "root",

  // password
  password: process.env.DB_password,
  database: "company_DB",
});

const start = () => {
  inquirer
    .prompt({
      name: "choice",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all employees by department",
        "View all employees by manager",
        "View all employees by role",
        "Add employee",
        "Add role",
        "Add department",
        "Update employee role",
        "Update employee manager",
        "Delete employee",
        "Delete role",
        "Delete department",
        "View department budgets",
      ],
    })
    .then(({ choice }) => {
      // if (answer.pick ==='View all employees'){
      //     console.table();
      // } else if (answer.pick === 'View all employees by department') {
      //     console.table();
      // } else if (answer.pick === 'View all employees by manager'){
      //     console.table();
      // } else if (answer.pick === 'View all employees by role'){

      // } else

      switch (choice) {
        case "View all employees":
          viewEmployees();
          break;
        case "View all employees by department":
          viewDept();
          break;
        case "View all employees by manager":
          viewManagers();
          break;
        case "View all employees by role":
          viewRoles();
          break;
        case "Add employee":
          addEmp();
          break;
        case "Add role":
          addRole();
          break;
        case "Add department":
          addDept();
          break;
        case "Update employee role":
          uptEmp();
          break;
        case "Update employee manager":
          addDept();
          break;
        case "Delete employee":
          addDept();
          break;
        case "Delete role":
          addDept();
          break;
        case "Delete department":
          addDept();
          break;
        case "View department budget":
          addDept();
          break;
        default:
          connection.end();
        }
    });
  const viewEmployees = () => {
    connection.query("SELECT * FROM employee", (err, results) => {
      console.table(results);
      start();
    });
  };
  const viewDept = () => {
    connection.query("SELECT * FROM department", (err, results) => {
      console.table(results);
      start();
    });
  };
  const viewManagers = () => {
    connection.query("SELECT * FROM employee", (err, results) => {
      inquirer.prompt[
        {
          name: "pickEmp",
          type: "GET",
        }
      ].then(
        // results.Map
        "SELECT * FROM company_DB.employee WHERE manager_id = ?",
        manager_id
      );
      console.log(results);
      start();
    });
  };
  const viewRoles = () => {
    connection.query("SELECT * FROM roles", (err, results) => {
      console.table(results);
      start();
    });
  };
};

start();
