<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="css/style.css?version=1.6">
    <title>Game Details</title>

</head>
<body>

<header>
    <div class="nav container">
        <a href="index.php" class="logo">Game<span>Advisor</span></a>
        <div class="nav-icons">
            <i class="bx bx-bell bx-tada" id="bell-icon"></i>
            <i class='bx bx-user-circle'></i>
            <div class="menu-icon">
                <div class="line1"></div>
                <div class="line2"></div>
                <div class="line3"></div>
            </div>
        </div>
        <div class="menu">
            <img src="img/menu.png" alt="">
            <div class="navbar">
                <li><a href="index.html">Home</a></li>
                <li><a href="#new">Ultime Uscite</a></li>
                <li><a href="#contatti">Contattaci</a></li>
            </div>
        </div>
    </div>
    <div class="notification">
        <div class="notification-box"></div>
        <div class="notification-box"></div>
    </div>
</header>
<section class="adventure container">
<div class="game-container" id="gameContainer">

</div>
</section>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="js/dettagli.js?v=<?php echo time(); ?>">

</script>
<script src="./js/index.js?v=<?php echo time(); ?>"></script>
</body>
</html>
