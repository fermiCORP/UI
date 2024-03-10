<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Collegamento al foglio di stile delle icone di Boxicons -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <!-- Collegamento al foglio di stile personalizzato -->
    <link rel="stylesheet" href="../css/style.css?version=1.4">
    <title>Dettagli del Gioco</title>
</head>
<body>

<!-- Barra di progresso -->
<div class="progress">
    <div class="progress-bar" id="scroll-bar"></div>
</div>

<!-- Intestazione -->
<header>
    <!-- Barra di navigazione -->
    <div class="nav container">
        <!-- Logo -->
        <a href="index.php" class="logo">Game<span>Advisor</span></a>
        <!-- Icone di navigazione -->
        <div class="nav-icons">
            <i class="bx bx-bell bx-tada" id="bell-icon"></i>
            <i class='bx bx-user-circle'></i>
            <!-- Icona per il menu mobile -->
            <div class="menu-icon">
                <div class="line1"></div>
                <div class="line2"></div>
                <div class="line3"></div>
            </div>
        </div>
        <!-- Menu di navigazione -->
        <div class="menu">
            <!-- Immagine del menu (visualizzata solo su desktop) -->
            <img src="img/menu.png" alt="">
            <!-- Voci del menu -->
            <div class="navbar">
                <li><a href="index.html">Home</a></li>
                <li><a href="#new">Ultime Uscite</a></li>
                <li><a href="#contatti">Contattaci</a></li>
            </div>
        </div>
    </div>
    <!-- Notifiche -->
    <div class="notification">
        <div class="notification-box"></div>
        <div class="notification-box"></div>
    </div>
</header>

<!-- Sezione per visualizzare i dettagli del gioco -->
<section class="adventure container">
    <div class="game-container" id="gameContainer"></div>
</section>

<!-- Collegamento agli script JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="../js/dettagli.js?v=<?php echo time(); ?>"></script>
<script src="../js/index.js?v=<?php echo time(); ?>"></script>
</body>
</html>
