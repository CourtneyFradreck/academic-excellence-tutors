<?php

$hostname = "localhost";
$username = "root";
$password = "";
$database = "tutoring_school";

$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["Name"];
    $email = $_POST["Email"];
    $message = $_POST["Message"];

    $sql = "INSERT INTO users (name, email, message) VALUES ('$name', '$email', '$message')";
    mysqli_query($conn, $sql);
}
