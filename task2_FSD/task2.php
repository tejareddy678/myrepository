<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "123zyxr3", "task2_db");

if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

$filter_dept = $_GET['department'] ?? '';
$sort_by = $_GET['sort'] ?? 'name';

// Basic validation for sort to prevent SQL injection
$allowed_sorts = ['name' => 'name ASC', 'date' => 'date_added DESC'];
$order_clause = $allowed_sorts[$sort_by] ?? 'name ASC';

// 1. Fetch Department Counts
$count_query = "SELECT department, COUNT(*) as total FROM task2_records GROUP BY department";
$count_result = $conn->query($count_query);
$counts = [];
while ($row = $count_result->fetch_assoc()) {
    $counts[] = $row;
}

// 2. Fetch Records (Filtered and Sorted)
$records_query = "SELECT * FROM task2_records";
$params = [];
$types = "";

if (!empty($filter_dept) && $filter_dept !== 'All') {
    $records_query .= " WHERE department = ?";
    $params[] = $filter_dept;
    $types .= "s";
}

$records_query .= " ORDER BY " . $order_clause;

$stmt = $conn->prepare($records_query);

if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$result = $stmt->get_result();
$records = [];
while ($row = $result->fetch_assoc()) {
    $records[] = $row;
}

$stmt->close();
$conn->close();

echo json_encode([
    "counts" => $counts,
    "records" => $records
]);
?>