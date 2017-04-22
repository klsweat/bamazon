CREATE DATABASE bamazon_DB.sql;

USE bamazon_DB;

CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(item_id),
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL(7, 2);
    stock_quantity INTEGER(11)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("perfume", "health and beauty", "100.00", "20");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("foundation", "health and beauty", "150.00", "100");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shoes", "fashion", "75.50", "40");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bed sheets", "home", "200", "10");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lamps", "home", "50.00", "35");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPads", "electronics", "299.00", "150");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("computers", "electronics", "3000.00", "500");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cameras", "electronics", "199.00", "75");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shirts", "fashion", "29.99", "40");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("purses", "fashion", "89.99", "40");