<?php
/**
 * Examly Portal Backend
 * Handles secure result submission to MySQL Server/Workbench
 */
header("Content-Type: application/json");

// --- DATABASE CONFIGURATION ---
$servername = "localhost"; 
$username = "root";
$password = "123zyxr3"; 
$dbname = "project";
// ------------------------------

try {
    $conn = new mysqli($servername, $username, $password);
    if ($conn->connect_error) {
        throw new Exception("MySQL CONNECTION FAILED: " . $conn->connect_error . "\n\n1. Ensure MySQL (Workbench) is Running.\n2. Check Username/Password in project.php.");
    }
    if (!$conn->select_db($dbname)) {
        throw new Exception("DATABASE NOT FOUND: '$dbname' does not exist.\n\nPlease create it in MySQL Workbench: CREATE DATABASE IF NOT EXISTS $dbname;");
    }
    $inputJSON = file_get_contents("php://input");
    $data = json_decode($inputJSON, true);
    if (isset($data['score'])) {
        $score = $conn->real_escape_string($data['score']);
        $insertQuery = "INSERT INTO results (score) VALUES ('$score')";
        if ($conn->query($insertQuery) === TRUE) {
            echo json_encode(["status" => "success", "message" => "Exam score of $score saved safely."]);
        } else {
            if ($conn->errno == 1146) {
                throw new Exception("TABLE NOT FOUND: Table 'results' does not exist in your '$dbname' schema.\n\nPlease create it: CREATE TABLE results (id INT AUTO_INCREMENT PRIMARY KEY, score VARCHAR(10));");
            } else { throw new Exception("QUERY FAILED: " . $conn->error); }
        }
    } else { throw new Exception("MALFORMED REQUEST: No score data found in the submission."); }
    $conn->close();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>