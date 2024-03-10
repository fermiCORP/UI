<?php

use master\src\Exception;
use master\src\PHPMailer;
use master\src\SMTP;

require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

require __DIR__ . "/vendor/autoload.php";

$mail = new PHPMailer(true);

$mail->SMTPDebug = SMTP::DEBUG_SERVER;

$mail->isSMTP();
$mail->SMTPAuth = true;

$mail->Host = "smtp.gmail.com";
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;
$mail->Username = "gameadvisorverify@gmail.com";
$mail->Password = "pwyd hsij exuw dftw";

$mail->isHtml(true);

return $mail;