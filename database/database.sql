-- Database Create
CREATE DATABASE homebasket;
USE homebasket;

-- Users Table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Items Table
CREATE TABLE items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    quantity DECIMAL(10,2) DEFAULT 1,
    unit VARCHAR(20) DEFAULT 'KG',
    is_purchased BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Insert Default Categories
INSERT INTO categories (name, icon) VALUES
('Fruits & Vegetables', '🍎'),
('Dairy & Eggs', '🥚'),
('Oils, Spices & Condiments', '🌶️'),
('Household & Cleaning', '🧹');

-- Insert Sample User
INSERT INTO users (name, email, password) VALUES
('Sachin', 'sachin@example.com', 'hashed_password_here');

-- Insert Sample Items
INSERT INTO items (category_id, name, quantity, unit, is_purchased) VALUES
(1, 'Apple', 2, 'KG', FALSE),
(2, 'Milk', 1, 'Litre', FALSE),
(3, 'Turmeric Powder', 0.5, 'KG', FALSE),
(4, 'Floor Cleaner', 1, 'Bottle', FALSE);
