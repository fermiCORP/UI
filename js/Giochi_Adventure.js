function createTrendingAdventureListItem(game) {
    const listItem = document.createElement('li');

    const box = document.createElement('div');
    box.className = 'box';  // Aggiungi le classi richieste senza spazio aggiuntivo

    const image = document.createElement('img');
    image.src = getGameImageUrl(game);
    image.alt = game.name;

    const detailsLink = document.createElement('a');
    detailsLink.href = `./dettagli.php?gameId=${game.id}`;
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
    const genresLimit = 2;
    genre.textContent = `Genres: ${game.genres ? game.genres.slice(0, genresLimit).map(genre => genre.name).join(', ') : 'N/A'}`;
    textContainer.appendChild(genre);

    box.appendChild(textContainer);
    listItem.appendChild(box);

    return listItem;
}

function displayTrendingAdventureGames(games) {
    const GiochiAdventure = document.getElementById('GiochiAdventure');

    const giochiEsclusi = ['Shoot Shoot My Waifu', 'Grown-Up Titans ( Teen Titans)' , 'The Coffin of Andy and Leyley'];


    const giochiFiltrati = games.filter(game => !giochiEsclusi.includes(game.name));


    giochiFiltrati.forEach(game => {
        const listItem = createTrendingAdventureListItem(game);
        GiochiAdventure.appendChild(listItem);
    });

    $('.slider3').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    });
}

axios.get(`https://api.rawg.io/api/games?key=360b3c1b1c224703b27b6ca8f75dafb8&genres=adventure&ordering=-rating&dates=2020-01-01,2023-12-31&page_size=10`)
    .then(response => {
        const games = response.data.results;
        displayTrendingAdventureGames(games);
    })
    .catch(error => {
        console.error('Errore nella richiesta API per i giochi di avventura più popolari:', error);
    });
