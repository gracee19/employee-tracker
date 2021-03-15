USE company_DB;

-- department --
INSERT INTO department (dep_name)
VALUES ('Engineering');

INSERT INTO department (dep_name)
VALUES ('Finance');

INSERT INTO department (dep_name)
VALUES ('Legal');

INSERT INTO department (dep_name)
VALUES ('Sales');

INSERT INTO department (dep_name)
VALUES ('Administration');

-- roles -- 
INSERT INTO roles (title, salary, department_id)
VALUES ('Software Engineer', 100000.00, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ('HR', 70000.00, 5);

INSERT INTO roles (title, salary, department_id)
VALUES ('Lead Engineer', 120000.00, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ('Lawyer', 90000.00, 3);

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Lead', 60000.00, 4);

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Man', 55000.00, 4);

INSERT INTO roles (title, salary, department_id)
VALUES ('Accountant', 80000.00, 2);


-- employee --
