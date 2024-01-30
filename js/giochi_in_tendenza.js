
function getGameImageUrl(game) {
    return game.background_image || 'img/default.jpg'; // Immagine di fallback in caso di assenza
}


function createTrendingGameListItem(game) {
    const listItem = document.createElement('li');

    const box = document.createElement('div');
    box.className = 'box';

    const image = document.createElement('img');
    image.src = getGameImageUrl(game);
    image.alt = game.name;

    const detailsLink = document.createElement('a');
    detailsLink.href = `dettagli.php?gameId=${game.id}`;
    detailsLink.appendChild(image);
    box.appendChild(detailsLink);

    const textContainer = document.createElement('div');
    textContainer.className = 'box-text';

    const title = document.createElement('p');
    title.textContent = game.name;
    textContainer.appendChild(title);

    const rating = document.createElement('p');
    const ratingIcon = document.createElement('i');
    ratingIcon.className = 'bx bxs-star';
    rating.appendChild(ratingIcon);
    rating.innerHTML += ` ${game.rating || 'N/A'}`;
    textContainer.appendChild(rating);

    const genre = document.createElement('p');
    genre.textContent = `Genre: ${game.genres ? game.genres.map(genre => genre.name).join(', ') : 'N/A'}`;
    textContainer.appendChild(genre);

    box.appendChild(textContainer);
    listItem.appendChild(box);

    return listItem;
}


function displayTrendingGames(games) {
    const trendingGamesList = document.getElementById('trendingGamesList');

    const giochiEsclusi = ['Shoot Shoot My Waifu', 'Grown-Up Titans ( Teen Titans)'];


    const giochiFiltrati = games.filter(game => !giochiEsclusi.includes(game.name));

    giochiFiltrati.forEach(game => {
        const listItem = createTrendingGameListItem(game);
        trendingGamesList.appendChild(listItem);
    });

    // Inizializza Slick Slider per l'ul trendingGamesList
    $('.slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        margin: 10,
    });
}


axios.get(`https://api.rawg.io/api/games?key=360b3c1b1c224703b27b6ca8f75dafb8&ordering=-rating&dates=2020-01-01,2023-12-31&page_size=10`)
    .then(response => {
        const games = response.data.results;
        displayTrendingGames(games);
    })
    .catch(error => {
        console.error('Errore nella richiesta API per i giochi più popolari:', error);
    });