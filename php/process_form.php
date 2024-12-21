<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form fields
    $name = $_POST["Name"];
    $email = $_POST["Email"];
    $message = $_POST["Message"];
    
    // Set up the recipient email address
    $to = "excellenceacademic@yahoo.com";
    
    // Set up the email subject
    $subject = "New message from $name";
    
    // Set up the email body
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Message:\n$message";
    
    // Set up additional headers
    $headers = "From: $name <$email>";
    
    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        // Email sent successfully
        echo "Thank you for your message. We will get back to you shortly.";
    } else {
        // Email sending failed
        echo "Sorry, there was an error sending your message. Please try again later.";
    }
} else {
    // If the form is not submitted, redirect to the homepage or show an error message
    echo "Form submission error: Please try again.";
}
?>
