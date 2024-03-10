<?php
// Includi il file delle funzioni
require "../requirement/functions.php";

// Verifica se l'utente è loggato, altrimenti reindirizza alla pagina di login
check_login();
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Profile</title>
</head>
<body>

<h1>Profile</h1>

<!-- Verifica se l'utente è loggato -->
<?php if(check_login(false)): ?>
    <!-- Saluta l'utente mostrando il suo username -->
    Hi, <?= $_SESSION['USER']->username ?>;

    <br><br>
    <!-- Verifica se l'email dell'utente non è stata ancora verificata -->
    <?php if(!check_verified()): ?>
        <!-- Link per verificare l'email -->
        <a href="otp_verification.php">
            <button>Verify Profile</button>
        </a>
    <?php endif; ?>
<?php endif; ?>

</body>
</html>
