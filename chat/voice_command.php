<?php
$servername = "localhost";
$username = "root"; // Change if necessary
$password = ""; // Change if necessary
$dbname = "jarvis";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch the contact based on the recognized name
if (isset($_POST['name'])) {
    $name = $_POST['name'];
    $sql = "SELECT phone FROM contacts WHERE name LIKE ?";
    $stmt = $conn->prepare($sql);
    $likeName = "%".$name."%";
    $stmt->bind_param("s", $likeName);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $phone = $row['phone'];
        echo json_encode(['phone' => $phone]);
    } else {
        echo json_encode(['phone' => '']);
    }
}

$conn->close();
?>
