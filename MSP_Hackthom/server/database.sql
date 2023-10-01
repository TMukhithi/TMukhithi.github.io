CREATE DATABASE perntodo;

CREATE TABLE todo(
    transaction_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);