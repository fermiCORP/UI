<?php
// Includi i file necessari
require "../requirement/mail.php";
require "../requirement/functions.php";

// Verifica se l'utente è loggato, altrimenti reindirizza alla pagina di login
check_login();

// Inizializza l'array per gli errori e il codice di verifica
$errors = array();
$verificationCode = '';

// Verifica se è stato cliccato il link "Reinvia Codice" e l'utente non è ancora verificato
if (isset($_GET['resend']) && !check_verified()) {
    // Genera un nuovo codice di verifica casuale
    $verificationCode = rand(10000, 99999);

    // Prepara i dati per l'inserimento nel database
    $vars['expires'] = (time() + (60 * 10)); // Il codice scade dopo 10 minuti
    $vars['email'] = $_SESSION['USER']->email;

    // Esegui la query per inserire il nuovo codice di verifica nel database
    $query = "INSERT INTO verify (code, expires, email) VALUES (:code, :expires, :email)";
    database_run($query, ['code' => $verificationCode, 'expires' => $vars['expires'], 'email' => $vars['email']]);

    // Invia l'email contenente il nuovo codice di verifica all'utente
    $message = "Il tuo nuovo codice è " . $verificationCode;
    $subject = "Verifica email";
    $recipient = $vars['email'];
    send_mail($recipient, $subject, $message);
}

// Gestisce il submit del form
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    // Verifica se l'utente non è ancora verificato
    if (!check_verified()) {
        // Esegui la query per verificare il codice inserito dall'utente
        $query = "SELECT * FROM verify WHERE code = :code AND email = :email";
        $vars = array();
        $vars['email'] = $_SESSION['USER']->email;
        $vars['code'] = $_POST['code'];

        // Ottieni il risultato della query
        $row = database_run($query, $vars);

        // Se è stato trovato un risultato (il codice è corretto)
        if (is_array($row)) {
            $row = $row[0];
            $time = time();

            // Verifica se il codice non è scaduto
            if ($row->expires > $time) {
                // Aggiorna lo stato di verifica dell'email per l'utente nel database
                $id = $_SESSION['USER']->id;
                $query = "UPDATE user SET email_verified = email WHERE id = '$id' LIMIT 1";
                database_run($query);

                // Reindirizza l'utente al profilo dopo la verifica
                header("Location: profile.php");
                die;
            } else {
                echo "Codice scaduto";
            }
        } else {
            echo "Codice errato";
        }
    } else {
        echo "Hai già verificato l'email";
    }
}
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Verifica OTP</title>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="../css/otp_verification.css">
</head>
<body>
<div class="otp-card">
    <h1>VERIFICA OTP</h1>
    <?php if ($verificationCode): ?>
        <p>Il codice è stato inviato a <?php echo $_SESSION['USER']->email; ?></p>
    <?php endif; ?>
    <div class="otp-card-inputs">
        <!-- Input per inserire il codice OTP -->
        <input type="text" maxlength="1" autofocus>
        <input type="text" maxlength="1">
        <input type="text" maxlength="1">
        <input type="text" maxlength="1">
        <input type="text" maxlength="1">
    </div>
    <!-- Link per richiedere l'invio del codice OTP nuovamente -->
    <p>Non hai ricevuto il codice di verifica? <a href="?resend">Richiedilo nuovamente</a></p>
    <!-- Form per inviare il codice inserito dall'utente -->
    <form method="post">
        <input type="hidden" name="code" id="combinedCode">
        <button type="submit" disabled>Verifica</button>
    </form>
</div>

<script src="../js/otp_verification.js"></script>
<script>
    // Funzione per combinare i valori degli input in un unico codice
    document.addEventListener('DOMContentLoaded', function() {
        var inputFields = document.querySelectorAll('input[type="text"]');
        inputFields.forEach(function(input, index) {
            input.addEventListener('input', function() {
                if (index === inputFields.length - 1) {
                    var combinedCode = Array.from(inputFields).map(function(input) {
                        return input.value;
                    }).join('');
                    document.getElementById('combinedCode').value = combinedCode;
                }
            });
        });
    });
</script>
</body>
</html>
