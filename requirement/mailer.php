<?php

// Includi le classi necessarie per l'invio di email con PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Includi i file delle classi PHPMailer
require '../PHPMailer-master/src/Exception.php';
require '../PHPMailer-master/src/PHPMailer.php';
require '../PHPMailer-master/src/SMTP.php';

// Carica l'autoloader di Composer per caricare automaticamente le classi PHPMailer
require __DIR__ . "./vendor/autoload.php";

/**
 * Funzione per configurare e restituire un'istanza di PHPMailer
 *
 * @return PHPMailer Istanzia un oggetto PHPMailer configurato per l'invio di email
 * @throws Exception Se si verificano errori durante la configurazione di PHPMailer
 */
function configure_mailer()
{
    // Inizializza una nuova istanza di PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Imposta il livello di debug del server SMTP
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;

        // Abilita l'autenticazione SMTP
        $mail->isSMTP();
        $mail->SMTPAuth = true;

        // Configura le impostazioni del server SMTP (per Gmail)
        $mail->Host = "smtp.gmail.com";
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;
        $mail->Username = "gameadvisorverify@gmail.com";
        $mail->Password = "pwyd hsij exuw dftw";

        // Imposta il formato dell'email come HTML
        $mail->isHtml(true);

        // Restituisci l'oggetto PHPMailer configurato
        return $mail;
    } catch (Exception $e) {
        // Se si verifica un'eccezione durante la configurazione di PHPMailer, gestiscila e restituisci null
        echo "Error: " . $e->getMessage();
        return null;
    }
}

// Configura e restituisci un'istanza di PHPMailer
$mail = configure_mailer();

// Restituisci l'istanza di PHPMailer configurata
return $mail;

?>
