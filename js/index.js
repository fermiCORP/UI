const apiKey = '360b3c1b1c224703b27b6ca8f75dafb8';
const theme = 'casual';
const limit = 11;
const trendingGamesWrapper = document.getElementById('trendingGamesWrapper');
let menu = document.querySelector('.menu-icon');
let navbar = document.querySelector('.menu');
let bell= document.querySelector('.notification')
// Funzione per ottenere l'URL dell'immagine del gioco
function getLatestGameImageUrl() {
    const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&ordering=-released&page_size=1`;
    return axios.get(apiUrl)
        .then(response => {
            const latestGame = response.data.results[0];
            return latestGame.background_image;
        })
        .catch(error => {
            console.error('Errore nella richiesta API:', error);
            return 'img/default.jpg'; // Immagine di fallback in caso di errore
        });
}

// Funzione per visualizzare l'immagine principale
async function displayMainImage() {
    const mainImage = document.getElementById('mainImage');
    const imageUrl = await getLatestGameImageUrl();
    mainImage.src = imageUrl;
}

// Funzione per creare un elemento di gioco
function createGameListItem(game) {
    const listItem = document.createElement('li');

    const image = document.createElement('img');
    image.src = game.background_image;
    image.alt = game.name;
    image.style.maxWidth = '100%';

    const detailsLink = document.createElement('a');
    detailsLink.href = `dettagli.html?gameId=${game.id}`;
    detailsLink.appendChild(image);
    listItem.appendChild(detailsLink);

    const title = document.createElement('p');
    title.textContent = game.name;
    listItem.appendChild(title);

    const rating = document.createElement('p');
    const ratingIcon = document.createElement('i');
    ratingIcon.className = 'bx bxs-star';
    rating.appendChild(ratingIcon);
    rating.innerHTML += ` ${game.rating}`;
    listItem.appendChild(rating);

    const genre = document.createElement('p');
    genre.textContent = `Genre: ${game.genres ? game.genres.map(genre => genre.name).join(', ') : 'N/A'}`;
    listItem.appendChild(genre);

    return listItem;
}

// Funzione per visualizzare gli altri giochi con slider e rating/genere
function displayGamesWithSlider(games) {
    const gameList = document.getElementById('gameList');
    games.forEach(game => {
        const listItem = createGameListItem(game);
        gameList.appendChild(listItem);
    });

    // Inizializza Slick Slider per l'ul gameList
    $('.slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        margin: 10,
    });
}

// Chiamata API per ottenere i giochi in tendenza
axios.get(`https://api.rawg.io/api/games?key=${apiKey}&genres=${theme}&page_size=${limit}`)
    .then(response => {
        const games = response.data.results;
        displayGamesWithSlider(games.slice(1)); // Rimuovi il primo gioco perché è già mostrato sopra
    })
    .catch(error => {
        console.error('Errore nella richiesta API:', error);
    });


// menu sito
menu.onclick = () =>{
    navbar.classList.toggle('active');
    menu.classList.toggle('move');
    bell.classList.remove('active');
}


// notifiche sito
document.querySelector('#bell-icon').onclick = () => {
    bell.classList.toggle('active')
}

displayMainImage();