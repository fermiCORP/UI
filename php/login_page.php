<?php
// Includi il file che contiene le funzioni necessarie per l'autenticazione e la registrazione
require "../requirement/functions.php";

// Array per memorizzare eventuali errori durante il processo di autenticazione o registrazione
$errors = array();

// Verifica se è stata inviata una richiesta POST dal modulo di login o di registrazione
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    // Se l'azione è "login", esegui il tentativo di accesso
    if (isset($_POST['action']) && $_POST['action'] == "login") {
        // Esegui il login utilizzando i dati POST inviati
        $errors = login($_POST);
        // Se non ci sono errori durante il login, reindirizza l'utente alla pagina del profilo
        if (count($errors) == 0) {
            header("Location: profile.php");
            die; // Termina lo script dopo il reindirizzamento
        }
    }
    // Se l'azione è "register", esegui il processo di registrazione
    elseif (isset($_POST['action']) && $_POST['action'] == "register") {
        // Registra l'utente utilizzando i dati POST inviati
        $errors = signup($_POST);
        // Se non ci sono errori durante la registrazione, reindirizza l'utente alla pagina di accesso
        if (count($errors) == 0) {
            header("Location: login_page.php");
            die; // Termina lo script dopo il reindirizzamento
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GAMEADVISOR | Login & Register</title>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="../css/login_page.css">
</head>
<body>

<!-- Contenitore del form di login e registrazione -->
<div class="form-container">
    <!-- Colonna sinistra con l'immagine di sfondo -->
    <div class="col col-1">
        <div class="image-layer">
            <!-- Immagini decorative per lo sfondo -->
            <img src="../Documentazione/styles/img/white-outline.png" class="form-image-main">
            <img src="../Documentazione/styles/img/dots.png" class="form-image dots">
            <img src="../Documentazione/styles/img/coin.png" class="form-image coin">
            <img src="../Documentazione/styles/img/spring.png" class="form-image spring">
            <img src="../Documentazione/styles/img/rocket.png" class="form-image rocket">
            <img src="../Documentazione/styles/img/cloud.png" class="form-image cloud">
            <img src="../Documentazione/styles/img/stars.png" class="form-image stars">
        </div>
        <p class="featured-words"></p>
    </div>

    <!-- Colonna destra con i form di login e registrazione -->
    <div class="col col-2">
        <!-- Pulsanti per accedere o registrarsi -->
        <div class="btn-box">
            <button class="btn btn-1" id="login">Accedi</button>
            <button class="btn btn-2" id="register">Registrati</button>
        </div>

        <!-- Form per il login -->
        <form method="post">
            <input type="hidden" name="action" id="login-action" value="login">
            <div class="login-form">
                <div class="form-title">
                    <span>Accedi</span>
                </div>
                <div class="form-inputs">
                    <!-- Visualizzazione degli errori -->
                    <div class="error-login" style="color: red">
                        <?php foreach ($errors as $error): ?>
                            <?= $error ?> <br>
                        <?php endforeach; ?>
                    </div>
                    <!-- Campi di input per email e password -->
                    <div class="input-box">
                        <input name="email" type="email" class="input-field" placeholder="Email" required>
                        <i class="bx bx-user icon"></i>
                    </div>
                    <div class="input-box">
                        <input name="password" type="password" class="input-field" placeholder="Password">
                        <i class="bx bx-lock-alt icon"></i>
                    </div>
                    <!-- Link per il ripristino della password -->
                    <div class="forgot-password">
                        <a href="#">Hai dimenticato la password?</a>
                    </div>
                    <!-- Pulsante di invio per il login -->
                    <div class="input-box">
                        <button class="input-submit">
                            <span>Accedi</span>
                            <i class="bx bx-right-arrow-alt"></i>
                        </button>
                    </div>
                </div>
                <!-- Opzioni di login tramite social media -->
                <div class="social-login">
                    <i class="bx bxl-google"></i>
                    <i class="bx bxl-github"></i>
                    <i class="bx bxl-steam"></i>
                </div>
            </div>
        </form>

        <!-- Form per la registrazione -->
        <form method="post">
            <input type="hidden" name="action" id="register-action" value="register">
            <div class="register-form">
                <div class="form-title">
                    <span>Crea un account</span>
                </div>
                <div class="form-inputs">
                    <!-- Visualizzazione degli errori -->
                    <div class="error-login" style="color: red">
                        <?php foreach ($errors as $error): ?>
                            <?= $error ?> <br>
                        <?php endforeach; ?>
                    </div>
                    <!-- Campi di input per nome utente, email e password -->
                    <div class="input-box">
                        <input name="username" class="input-field" placeholder="Nome Utente" type="username" required>
                        <i class="bx bx-user icon"></i>
                    </div>
                    <div class="input-box">
                        <input name="email" type="email" class="input-field" placeholder="Email" required>
                        <i class="bx bx-envelope icon"></i>
                    </div>
                    <div class="input-box">
                        <input name="password" type="password" class="input-field" placeholder="Password" required>
                        <i class="bx bx-lock-alt icon"></i>
                    </div>
                    <!-- Pulsante di invio per la registrazione -->
                    <div class="input-box">
                        <button type="submit" class="input-submit" value="Signup">
                            <span>Registrati</span>
                            <i class="bx bx-right-arrow-alt"></i>
                        </button>
                    </div>
                </div>
                <!-- Opzioni di registrazione tramite social media -->
                <div class="social-login">
                    <i class="bx bxl-google"></i>
                    <i class="bx bxl-github"></i>
                    <i class="bx bxl-steam"></i>
                </div>
            </div>
        </form>
    </div>
</div>
    <script src="../js/login_page.js"></script>
</body>
</html>