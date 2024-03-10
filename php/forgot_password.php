<!DOCTYPE html>
<html lang="en">
<head>
    <title>Forgot Password - Site Zoon</title>

    <!-- Metadati -->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Icona del sito -->
    <link rel="icon" type="image/x-icon" href="">

    <!-- Fogli di stile -->
    <link rel="stylesheet" href="../css/bootstrap5.css">
    <link rel="stylesheet" href="../css/forgot_password.css">

    <!-- Collegamento al font Poppins -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap" rel="stylesheet">

    <!-- Icone FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
<!-- Contenitore principale -->
<div class="container pt-5">
    <div class="row">
        <!-- Colonna sinistra con l'immagine -->
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 text-center">
            <img src="../Documentazione/styles/img/forgot_password.png" alt="Main IMG" class="img-fluid">
        </div>
        <!-- Colonna destra con il modulo di recupero password -->
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 pt-5">
            <h2 class="main-text pt-5 mt-5">Recupera <br> La tua password</h2>
            <!-- Form di recupero password -->
            <form method="post" action="../requirement/invio_link_reset_password.php">
                <input type="email" name="email" id="email" placeholder="Inserisci la tua email" class="form-control main-input mt-5">
                <div class="row">
                    <div class="col-3">
                        <button class="btn btn-sz-primary mt-5">Reset</button>
                    </div>
            </form>
            <!-- Link per tornare alla pagina di login -->
            <div class="col-6 pt-5">
                <a href="login_page.php" class="back-to-login">Torna al login</a>
            </div>
        </div>
    </div>
</div>
</div>

<!-- Script JavaScript -->
<script src="../js/jquery.js"></script>
<script src="../js/bootstrap5.js"></script>
</body>
</html>
