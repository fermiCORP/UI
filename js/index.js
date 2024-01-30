
const trendingGamesWrapper = document.getElementById('trendingGamesWrapper');
let menu = document.querySelector('.menu-icon');
let navbar = document.querySelector('.menu');
let bell= document.querySelector('.notification')




menu.onclick = () =>{
    navbar.classList.toggle('active');
    menu.classList.toggle('move');
    bell.classList.remove('active');
}



document.querySelector('#bell-icon').onclick = () => {
    bell.classList.toggle('active')
}


function getCyberpunkGameId(response) {
    const cyberpunkGame = response.data.results.find(game => game.name === 'Cyberpunk 2077');
    return cyberpunkGame ? cyberpunkGame.id : null;
}

