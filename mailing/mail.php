<?php
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
ini_set('display_errors','1');
//header("Access-Control-Allow-Origin: *");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$values = json_decode($_POST);

if (empty($values->email)) die();
 

if ($_POST)
	{

	// set response code - 200 OK

	$to = 'mattenigeria@gmail.com';
	$from = $_POST['email'];

	$mail = new \PHPMailer\PHPMailer\PHPMailer();

try {
    //Server settings
    $mail->SMTPDebug = \PHPMailer\PHPMailer\SMTP::DEBUG_SERVER;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'matte.ng';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'nonreply@matte.ng';                     // SMTP username
    $mail->Password   = 'ZDfeu2d$F_YC';  //                        // SMTP password
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    //Recipients
    $mail->setFrom('nonreply@matte.ng', 'MatteNG');
    $mail->addAddress($to);     // Add a recipient
    /*$mail->addCC('cc@example.com');
    $mail->addBCC('bcc@example.com');*/

   // Optional name

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = "Contact message from ".$values->name;
    $mail->Body    = "From: ".$values->email."<br>"."message: ".$values->body;
    $mail->AltBody = $values->email.''.$values->body;

    $mail->send();
    http_response_code(200);
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
	//echo json_encode( $_POST );

	echo json_encode(array(
		"sent" => true
	));
	}
  else
	{

	// tell the user about error
    http_response_code(400);

	echo json_encode(["sent" => false, "message" => "Something went wrong"]);
	}
?>
