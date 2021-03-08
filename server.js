const mysql = require('mysql');
const inquirer = require('inquirer');

//connection
const connection = mysql.createConnection({
    host: 'localhost',

    // port
    port: 3308,

    // user
    user: 'root',

    // password
    password: '',
    database: 'employee_DB',
});