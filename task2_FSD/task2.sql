CREATE DATABASE IF NOT EXISTS task2_db;
USE task2_db;
CREATE TABLE IF NOT EXISTS task2_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    date_added DATE NOT NULL
);

-- Sample Data for testing the dashboard
INSERT INTO task2_records (name, department, date_added) VALUES
('Alice Smith', 'Computer Science', '2025-01-15'),
('Bob Johnson', 'Electrical Engineering', '2024-11-20'),
('Charlie Brown', 'Computer Science', '2025-02-10'),
('Diana Prince', 'Mechanical Engineering', '2023-08-05'),
('Evan Wright', 'Electrical Engineering', '2024-05-12'),
('Fiona Gallagher', 'Computer Science', '2023-12-01'),
('George Lucas', 'Mechanical Engineering', '2025-03-22'),
('Hannah Abbott', 'Civil Engineering', '2024-07-18'),
('Ian Somerhalder', 'Computer Science', '2025-01-05'),
('Julia Roberts', 'Civil Engineering', '2023-09-30');
