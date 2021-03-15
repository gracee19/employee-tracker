const mysql = require('mysql');
const inquirer = require('inquirer');
const { type } = require('os');
require('dotenv').config();

//connection
const connection = mysql.createConnection({
    host: 'localhost',

    // port
    port: 3306,

    // user
    user: 'root',

    // password
    password: process.env.DB_password,
    database: 'company_DB',
});

const start = () => {
    inquirer
        .prompt({
            name: 'pick',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all employees by department',
                'View all employees by manager',
                'View all employees by role',
                'Add employee',
                'Add role',
                'Add department',
                'Update employee role',
                'Update employee manager',
                'Delete employee',
                'Delete role',
                'Delete department',
                'View department budgets'
            ],
        })
    .then((answer) => {
        // if (answer.pick ==='View all employees'){
        //     console.table();
        // } else if (answer.pick === 'View all employees by department') {
        //     console.table();
        // } else if (answer.pick === 'View all employees by manager'){
        //     console.table();
        // } else if (answer.pick === 'View all employees by role'){

        // } else

        switch(answer) {
            case 'View all employees':
                viewEmployees();
              break;
            case 'View all employees by department':
                viewDept();
              break;
            case 'View all employees by manager':
                viewManagers();
                break;
            case 'View all employees by role':
                console.table();
                break;
            case 'Add employee':
                console.table();
                break;
            case 'View all employees by manager':
                console.table();
                break;
            case 'View all employees by manager':
                console.table();
                break;
            default:
              connection.end();
          }
    });
    const viewEmployees = ()=>{
        connection.query("SELECT * FROM ", (err,results)=>{
            console.table(results);
            start();
        });
        
    };
    const viewDept = ()=>{
        connection.query("SELECT * FROM ", (err,results)=>{
            console.table(results);
            start();
        });
        
    };
    const viewManagers = ()=>{
        connection.query("SELECT * FROM ", (err,results)=>{
            console.table(results);
            start();
        });
        
    };
}