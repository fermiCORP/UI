<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GameAdvisor</title>
    <link rel="stylesheet" type="text/css" href="./css/slick.css?version=1.3" />
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css" />
    <link rel="stylesheet" href="css/style.css?version=1.2">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link href="https://cdn.jsdelivr.net/npm/swiper@11.0.5/swiper-bundle.min.css" rel="stylesheet">
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

<section class="home container" id="home">

        <img id="mainImage" src="./img/home.png" alt="Main Image">

    <div class="home-text">
        <h1>LA CITTÀ DEL <br> FUTURO</h1>
        <a href="dettagli.php?gameId=41494" class="btn">Scopri Di Più</a>
    </div>
</section>


<section class="trending container" id="trending">
    <div class="heading">
        <i class="bx bxs-flame"></i>
        <h2>Giochi In Tendenza</h2>
    </div>
    <div class="trending-content swiper">
        <div class="swiper-wrapper" >
            <div class="swiper-slide">
                <div class="box">

                    <?php include('./php/Giochi_Di_Tendenza.php'); ?>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="sports container" id="sports">
    <div class="heading">
        <i class='bx bxs-trophy'></i>
        <h2>Giochi Sportivi</h2>
    </div>
    <div class="sport-content swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <div class="box">
    <?php include './php/Giochi_Sportivi.php'; ?>
                </div>
            </div>
        </div>
    </div>
</section>


<section class="adventure container" id="adventure">
    <div class="heading">
        <i class='bx bxs-heart'></i>
        <h2>Giochi Di Avventura</h2>
    </div>
    <div class="adventure-content swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <div class="box">
                    <?php include './php/Giochi_Adventure.php'; ?>
                </div>
            </div>
        </div>
    </div>
</section>


<section class="sparatutto container" id="sparatutto">
    <div class="heading">
        <i class='bx bx-cross'></i>
        <h2>Giochi Sparatutto</h2>
    </div>
    <div class="spara-content swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <div class="box">
                    <?php include './php/Giochi_Sparatutto.php'; ?>
                </div>
            </div>
        </div>
    </div>
</section>



<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@11.0.5/swiper-bundle.min.js"></script>
<script src="./js/giochi_in_tendenza.js?v=<?php echo time(); ?>"></script>
<script src="js/giochi_sportivi.js?v=<?php echo time(); ?>"></script>
    <script src="js/Giochi_Adventure.js?v=<?php echo time(); ?>"></script>
<script src="js/Giochi_Sparatutto.js?v=<?php echo time(); ?>"></script>
<script src="./js/index.js?v=<?php echo time(); ?>"></script>

</body>
</html>
