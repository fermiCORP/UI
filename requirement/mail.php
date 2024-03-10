<?php

// Includi le classi necessarie per l'invio di email con PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Includi i file delle classi PHPMailer
require '../PHPMailer-master/src/Exception.php';
require '../PHPMailer-master/src/PHPMailer.php';
require '../PHPMailer-master/src/SMTP.php';

/**
 * Funzione per l'invio di email
 *
 * @param string $recipient Indirizzo email del destinatario
 * @param string $subject Oggetto dell'email
 * @param string $message Contenuto dell'email (HTML)
 * @return bool True se l'email è stata inviata con successo, altrimenti False
 */
function send_mail($recipient, $subject, $message)
{
    // Inizializza una nuova istanza di PHPMailer
    $mail = new PHPMailer();

    // Imposta il protocollo SMTP
    $mail->IsSMTP();

    // Impostazioni SMTP
    $mail->SMTPDebug  = 0;  // Livello di debug (0 per disabilitare)
    $mail->SMTPAuth   = TRUE;  // Abilita l'autenticazione SMTP
    $mail->SMTPSecure = "tls"; // Tipo di crittografia (tls o ssl)
    $mail->Port       = 587;   // Porta SMTP
    $mail->Host       = "smtp.gmail.com"; // Host SMTP
    //$mail->Host       = "smtp.mail.yahoo.com"; // Host SMTP per Yahoo
    $mail->Username   = "gameadvisorverify@gmail.com"; // Nome utente SMTP
    $mail->Password   = "pwyd hsij exuw dftw"; // Password SMTP

    // Imposta il formato dell'email come HTML
    $mail->IsHTML(true);

    // Aggiunge l'indirizzo email del destinatario e il nome del destinatario
    $mail->AddAddress($recipient, "esteemed customer");

    // Imposta l'indirizzo email del mittente e il nome del mittente
    $mail->SetFrom("gameadvisorverify@gmail.com", "My website");

    // Imposta l'oggetto dell'email
    $mail->Subject = $subject;

    // Imposta il contenuto dell'email (HTML)
    $content = $message;
    $mail->MsgHTML($content);

    // Invia l'email e restituisce True se l'operazione ha avuto successo, altrimenti False
    if (!$mail->Send()) {
        // Se si verifica un errore durante l'invio dell'email, restituisci False
        return false;
    } else {
        // Se l'email viene inviata correttamente, restituisci True
        return true;
    }
}

?>
