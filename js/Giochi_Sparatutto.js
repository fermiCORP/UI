

function createTrendingSparatuttoListItem(game) {
    const listItem = document.createElement('li');

    const box = document.createElement('div');
    box.className = 'box ';  // Aggiungi le classi richieste

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
    const genresLimit = 3;
    genre.textContent = `Genre: ${game.genres ? game.genres.slice(0, genresLimit).map(genre => genre.name).join(', ') : 'N/A'}`;
    textContainer.appendChild(genre);


    box.appendChild(textContainer);
    listItem.appendChild(box);

    return listItem;
}

function displayTrendingSparatuttoGames(games) {
    const GiochiSparatutto = document.getElementById('GiochiSparatutto');
    games.forEach(game => {
        const listItem = createTrendingSparatuttoListItem(game);
        GiochiSparatutto.appendChild(listItem);
    });

    $('.slider4').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,

    });
}

axios.get(`https://api.rawg.io/api/games?key=360b3c1b1c224703b27b6ca8f75dafb8&genres=shooter&ordering=-rating&dates=2020-01-01,2023-12-31&page_size=10`)
    .then(response => {
        const games = response.data.results;
        displayTrendingSparatuttoGames(games);
    })
    .catch(error => {
        console.error('Errore nella richiesta API per i giochi RPG più popolari:', error);
    });
