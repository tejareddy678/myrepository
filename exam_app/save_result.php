<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers");

// Based on the reference code pattern
$conn = new mysqli("localhost", "root", "123zyxr3", "exam_db");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Get the posted JSON data from the frontend fetch
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->name) && isset($data->score) && isset($data->accuracy)) {

    $name = htmlspecialchars(strip_tags($data->name));
    $score = $data->score;
    $accuracy = $data->accuracy;
    $date = !empty($data->date) ? htmlspecialchars(strip_tags($data->date)) : date("Y-m-d");

    // Prepared statement following your exact pattern
    $stmt = $conn->prepare("INSERT INTO results (name, score, accuracy, date) VALUES (?, ?, ?, ?)");

    // Bind parameters: string, integer, double, string
    $stmt->bind_param("sids", $name, $score, $accuracy, $date);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Result saved."]);
    } else {
        echo json_encode(["success" => false, "error" => "Error: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "error" => "Incomplete data."]);
}

$conn->close();
?>