DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(256) not NULL,
  department_name VARCHAR(256) not NULL,
  price dec(45) not NULL,
  stock_quantity int(150) not null,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("diapers", "baby", 25.00, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("granola bars", "snacks", 2.50, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shaving cream", "beauty", 1.39, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("coffee", "drinks", 10.00, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("formula", "baby", 20.00, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cat food", "pets", 13.50, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Javascript for Kids", "books", 16.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("toothpaste", "health", 3.50, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pens", "office", 5.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("scissors", "office", 3.00, 10);

SELECT * FROM products;