<?php

$servername = "localhost";
$username = "root";               // your mysql username
$password = "123zyxr3";      // change this to your mysql password
$database = "student_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Collect form data
$fullname = $_POST['fullname'];
$email = $_POST['email'];
$passwordHash = password_hash($_POST['password'], PASSWORD_DEFAULT);
$dob = $_POST['dob'];
$gender = $_POST['gender'];
$course = $_POST['course'];
$address = $_POST['address'];

// Prepare statement
$stmt = $conn->prepare("INSERT INTO students
(fullname, email, password, dob, gender, course, address)
VALUES (?, ?, ?, ?, ?, ?, ?)");

$stmt->bind_param("sssssss",
    $fullname,
    $email,
    $passwordHash,
    $dob,
    $gender,
    $course,
    $address
);

// Execute
if ($stmt->execute()) {
    echo "<h2 style='color:green;text-align:center;'>Registration Successful!</h2>";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();

?>
