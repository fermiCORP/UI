<?php
// Ottenere l'indirizzo email dalla richiesta POST
$email = $_POST["email"];

// Generare un token casuale per il reset della password
$token = bin2hex(random_bytes(16));

// Calcolare l'hash del token
$token_hash = hash("sha256", $token);

// Calcolare la data di scadenza del token (30 minuti da ora)
$expiry = date("Y-m-d H:i:s", time() + 60 * 30);

// Includere il file per la connessione al database
$mysqli = require __DIR__ . "/database.php";

// Preparare la query SQL per aggiornare il token di reset della password nel database
$sql = "UPDATE user
        SET reset_token_hash = ?,
            reset_token_expires_at = ?
        WHERE email = ?";

$stmt = $mysqli->prepare($sql);

// Collegare i parametri alla query preparata
$stmt->bind_param("sss", $token_hash, $expiry, $email);

// Eseguire la query
$stmt->execute();

// Verificare se la query ha avuto successo e ha influenzato righe nel database
if ($mysqli->affected_rows) {
    // Include il file per l'invio di email
    $mail = require __DIR__ . "/mailer.php";

    // Imposta l'indirizzo email del mittente
    $mail->setFrom("gameadvisorverify@gmail.com");

    // Aggiungi l'indirizzo email del destinatario
    $mail->addAddress($email);

    // Oggetto dell'email
    $mail->Subject = "Password Reset";

    // Costruire il link per il reset della password, codificando correttamente l'URL
    $resetLink = "http://localhost:80/UI-ALESSIO-V2-main/verify-email-master/reset-password.php?token=" . rawurlencode($token);

    // Corpo dell'email con il link per il reset della password
    $mail->Body = <<<END
    Click <a href="$resetLink">here</a> 
    to reset your password.
    END;

    // Tentativo di invio dell'email
    try {
        $mail->send();
    } catch (Exception $e) {
        // Gestione degli errori nel caso in cui l'invio dell'email fallisca
        echo "Message could not be sent. Mailer error: {$mail->ErrorInfo}";
    }
}

// Messaggio di conferma per l'utente
echo "Message sent, please check your inbox.";
?>
