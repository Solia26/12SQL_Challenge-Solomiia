drop database if exists employee_db;
create database employee_db;

\c employee_db;

create table department(

  id SERIAL PRIMARY KEY,

  name VARCHAR(30) UNIQUE NOT NULL
);

create table role( 
    
  id SERIAL PRIMARY KEY,

  title VARCHAR(30) UNIQUE NOT NULL, 

  salary DECIMAL NOT NULL,

  department_id INTEGER NOT NULL,

  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE

);

create table employee(

id SERIAL PRIMARY KEY,

  first_name VARCHAR(30) NOT NULL,

  last_name VARCHAR(30) NOT NULL,

  role_id INTEGER NOT NULL,

  manager_id INTEGER,

FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,

FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);