CREATE DATABASE exam_db;
USE exam_db;
CREATE TABLE results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    score INT NOT NULL,
    accuracy FLOAT NOT NULL,
    date VARCHAR(255) NOT NULL
);

SELECT *
FROM results;
