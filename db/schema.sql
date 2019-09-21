DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NULL,
    department_name VARCHAR(30) NULL,
    price DECIMAL(8,2) DEFAULT 0.00,
    stock_quantity INT DEFAULT 0,
    PRIMARY KEY(item_id)
);

SELECT * FROM products;

