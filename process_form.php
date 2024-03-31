<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = $_POST['Name'];
    $email = $_POST['Email'];
    $message = $_POST['message'];

    // Validate form data (you can add more validation)
    if (empty($name) || empty($email) || empty($message)) {
        echo "Please fill in all fields";
    } else {
        // Send email
        $to = "excellenceacademic@yahoo.com"; // Your email address
        $subject = "New Message from Your Website";
        $body = "Name: $name\nEmail: $email\nMessage: $message";
        
        if (mail($to, $subject, $body)) {
            echo "Message sent successfully";
        } else {
            echo "Error sending message";
        }
    }
}
?>
