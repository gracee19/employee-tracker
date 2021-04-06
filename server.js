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
        "View all department",
        "View all roles",
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
      switch (choice) {
        case "View all employees":
          viewEmployees();
          break;
        case "View all department":
          viewDept();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees by departmet":
          viewEmpDept();
          break;
        case "View all employees by manager":
          viewManagers();
          break;
        case "View all employees by role":
          viewEmpRoles();
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

  // View list of all the Employees
  const viewEmployees = () => {
    connection.query("SELECT * FROM employee", (err, results) => {
      console.table(results);
      start();
    });
  };

  // View list of all Department
  const viewDept = () => {
    connection.query("SELECT * FROM department", (err, results) => {
      console.table(results);
      start();
    });
  };

  // View list of roles
  const viewRoles = () => {
    connection.query("SELECT * FROM roles", (err, results) => {
      console.table(results);
      start();
    });
  };

  // View all employees that is working in each department
  const viewEmpDept = () => {
    connection.query("SELECT * FROM employee LEFT JOIN roles ON role_id = roles.id LEFT JOIN department ON department_id = department.id)", (err,results) => {
      console.table(results);
      start();
    });
    
  };

  //View all employees by each roles
  const viewEmpRoles = () => {
    connection.query("SELECT * FROM employee LEFT JOIN roles ON role_id = roles.id", (err,results) => {
      console.table(results);
      start();
    });
  };

  // View list of employee working in one Manager
  const viewManagers = () => {
    connection.query("SELECT * FROM employee", (err, results) => {
      inquirer
        .prompt({
          name: "pickManager",
          type: "list",
          message: "Which manager do you want to check?",
          choices: [],
        })
        .then(
          // results.Map
          "SELECT * FROM employee WHERE manager_id = ?",
          manager_id
        );
      console.log(results);
      start();
    });
  };

  // Add new employee
  const addEmp = () => {
    connection.query("SELECT * FROM roles", (err, res) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name? ",
          },
          {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name? ",
          },
          {
            name: "managerId",
            type: "input",
            message: "What is the employee's manager's ID? ",
          },
          {
            name: "role",
            type: "list",
            choices: function () {
              var roleArray = [];
              for (let i = 0; i < res.length; i++) {
                roleArray.push(res[i].title);
              }
              return roleArray;
            },
            message: "What is this employee's role? ",
          },
        ])
        .then(function (answer) {
          let role_id;
          for (let a = 0; a < res.length; a++) {
            if (res[a].title == answer.role) {
              role_id = res[a].id;
              console.log(role_id);
            }
          }
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answer.firstName,
              last_name: answer.lastName,
              manager_id: answer.managerId,
              role_id: role_id,
            },
            function (err) {
              if (err) throw err;
              console.log("Your employee has been added!");
              start();
            }
          );
        });
    });
  };

  // Add new role
  const addRole = () => {
    connection.query("SELECT * FROM department", (err, res) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "roleName",
            type: "input",
            message: "What is the title of the new role?",
          },
          {
            name: "salary",
            type: "input",
            message: "What is the salary of the new role?",
          },
          {
            name: "department",
            type: "list",
            choices: function () {
              var deptArray = [];
              for (let i = 0; i < res.length; i++) {
                deptArray.push(res[i].dep_name);
              }
              return deptArray;
            },
            message: "Which department does this role fall in? ",
          },
        ])
        .then(function (answer) {
          let department_id;
          for (let a = 0; a < res.length; a++) {
            if (res[a].dep_name == answer.department) {
              department_id = res[a].id;
              console.log(department_id);
            }
          }
          connection.query(
            "INSERT INTO roles SET ?",
            {
              title: answer.roleName,
              salary: answer.salary,
              department_id: department_id,
            },
            function (err) {
              if (err) throw err;
              console.log("New role has been added!");
              start();
            }
          );
        });
    });
  };

  // Add new department
  const addDept = () => {
    connection.query("SELECT * FROM roles", (err, res) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "deptName",
            type: "input",
            message: "What is the name of the new department?",
          }
        ])
        .then(function (answer) {
          for (let a = 0; a < res.length; a++) {
            if (res[a].dep_name == answer.deptName) {
              console.log(dep_name);
            }
          }
          connection.query(
            "INSERT INTO department SET ?",
            {
              dep_name: answer.deptName,
            },
            function (err) {
              if (err) throw err;
              console.log("New department has been added!");
              start();
            }
          );
        });
    });
  };
};

start();
