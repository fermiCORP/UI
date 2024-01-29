const apiKey = '360b3c1b1c224703b27b6ca8f75dafb8';
const gameContainer = document.getElementById('gameContainer');


function displayGameDetails(game) {

    const titleElement = document.createElement('h1');
    titleElement.textContent = game.name;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = game.description;

    const releaseDateElement = document.createElement('p');
    releaseDateElement.textContent = `Released on: ${game.released}`;

    const ratingElement = document.createElement('p');
    ratingElement.textContent = `Rating: ${game.rating}`;

    const developerElement = document.createElement('p');
    developerElement.textContent = `Developer: ${game.developers ? game.developers[0]?.name : 'N/A'}`;

    const publisherElement = document.createElement('p');
    publisherElement.textContent = `Publisher: ${game.publishers ? game.publishers[0]?.name : 'N/A'}`;

    const genreElement = document.createElement('p');
    genreElement.textContent = `Genre: ${game.genres ? game.genres.map(genre => genre.name).join(', ') : 'N/A'}`;

    const platformElement = document.createElement('p');
    platformElement.textContent = `Platform: ${game.platforms ? game.platforms.map(platform => platform.platform.name).join(', ') : 'N/A'}`;

    const storesElement = document.createElement('p');
    if (game.stores && game.stores.length > 0) {
        const storeLinks = game.stores
            .filter(store => store.store && store.store.name)
            .map(store => `<span class="store-link" data-url="${store.url}">${store.store.name}</span>`);
        storesElement.innerHTML = `Available on: ${storeLinks.length > 0 ? storeLinks.join(', ') : 'N/A'}`;
    } else {
        storesElement.textContent = 'Stores: N/A';
    }

    storesElement.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('store-link')) {
            const storeUrl = target.getAttribute('data-url');
            if (storeUrl) {
                window.open(storeUrl, '_blank');
            }
        }
    });

    const tagsElement = document.createElement('p');
    tagsElement.textContent = `Tags: ${game.tags ? game.tags.map(tag => tag.name).join(', ') : 'N/A'}`;


    document.getElementById('gameContainer').appendChild(titleElement);
    document.getElementById('gameContainer').appendChild(descriptionElement);
    document.getElementById('gameContainer').appendChild(releaseDateElement);
    document.getElementById('gameContainer').appendChild(ratingElement);
    document.getElementById('gameContainer').appendChild(developerElement);
    document.getElementById('gameContainer').appendChild(publisherElement);
    document.getElementById('gameContainer').appendChild(genreElement);
    document.getElementById('gameContainer').appendChild(platformElement);
    document.getElementById('gameContainer').appendChild(storesElement);
    document.getElementById('gameContainer').appendChild(tagsElement);


}


function getGameIdFromUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('gameId');
}


function getGameDetails(gameId) {
    axios.get(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`)
        .then(response => {
            const gameDetails = response.data;
            displayGameDetails(gameDetails);
        })
        .catch(error => {
            console.error('Errore nella richiesta API:', error);
        });
}


const gameId = getGameIdFromUrl();
if (gameId) {
    getGameDetails(gameId);
}