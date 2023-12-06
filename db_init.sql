CREATE DATABASE Blitz WITH ENCODING 'UTF8' LC_COLLATE='en_US.UTF-8' LC_CTYPE='en_US.UTF-8';

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    isAdmin BOOLEAN DEFAULT false
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(255),
    category VARCHAR(255),
    description TEXT,
    discountPercentage DOUBLE PRECISION,
    price DOUBLE PRECISION,
    rating DOUBLE PRECISION,
    stock INTEGER,
    thumbnail VARCHAR(255),
    title VARCHAR(255)
);

DROP TABLE product_images IF EXISTS;
CREATE TABLE product_images (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    image_url VARCHAR(255)
);



ALTER USER postgres WITH PASSWORD 'postgres';

CREATE USER dbAdmin WITH PASSWORD 'ThisgUyIsTheBestSysAdminEver!@';
ALTER USER dbAdmin WITH SUPERUSER;
ALTER USER dbadmin VALID UNTIL 'infinity';

INSERT INTO users(fullname, username, email, password) VALUES ('test','test2','test3','test4') RETURNING *;
DELETE FROM users WHERE id=4;