CREATE DATABASE gozatu_1;
-- \c gozatu_1

CREATE TABLE restaurants(
  restaurant_id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(30) NOT NULL,
  city VARCHAR(30) NOT NULL,
  cuisine VARCHAR(30),
  description VARCHAR(200),
  price INT,
  visit_date DATE,
  rating INT NOT NULL,
  favorite BOOLEAN NOT NULL
);