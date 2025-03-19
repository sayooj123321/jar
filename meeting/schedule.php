<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "jarvis";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handling GET request to load schedules
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM schedules";
    $result = $conn->query($sql);

    $schedules = [];
    while ($row = $result->fetch_assoc()) {
        $schedules[] = $row;
    }

    echo json_encode($schedules);
    exit;
}

// Handling POST request to add a new schedule
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $type = $_POST['type'];
    $date = $_POST['date'];
    $time = $_POST['time'];
    $alarm_time = $_POST['alarm_time'];

    $sql = "INSERT INTO schedules (type, date, time, alarm_time) VALUES ('$type', '$date', '$time', '$alarm_time')";
    if ($conn->query($sql) === TRUE) {
        echo "New schedule created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    exit;
}

// Handling alarm notifications
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['check_alarms'])) {
    $now = new DateTime();
    $sql = "SELECT * FROM schedules WHERE alarm_time IS NOT NULL";
    $result = $conn->query($sql);

    while ($row = $result->fetch_assoc()) {
        $alarm_time = new DateTime($row['date'] . ' ' . $row['alarm_time']);
        $alarm_time_end = clone $alarm_time;
        $alarm_time_end->modify('+30 seconds');

        if ($now >= $alarm_time && $now <= $alarm_time_end) {
            // Send email notification
            $to = 'alanrajurk47@gmail.com';
            $subject = 'Alarm Notification';
            $message = "It's time for: " . $row['type'] . " at " . $row['date'] . " " . $row['time'];
            $headers = 'From: ssayooj758@gmail.com' . "\r\n" .
                       'Reply-To: noreply@example.com' . "\r\n" .
                       'X-Mailer: PHP/' . phpversion();

            mail($to, $subject, $message, $headers);

            echo "Alarm triggered and email sent.";
            exit;
        }
    }

    echo "No alarms due.";
    exit;
}

$conn->close();
?>