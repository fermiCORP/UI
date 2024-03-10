/**
 * Rappresenta un gioco in tendenza.
 */
class GameTrending {
    /**
     * Crea una nuova istanza di GameTrending.
     * @param {number} id - L'ID del gioco.
     * @param {string} name - Il nome del gioco.
     * @param {number} rating - Il rating del gioco.
     * @param {Array} genres - Array di generi del gioco.
     * @param {string} background_image - URL dell'immagine di sfondo del gioco.
     */
    constructor(id, name, rating, genres, background_image) {
        this.id = id;
        this.name = name;
        this.rating = rating;
        this.genres = genres;
        this.background_image = background_image;
    }

    /**
     * Ottiene l'URL dell'immagine del gioco.
     * @returns {string} - URL dell'immagine del gioco.
     */
    getGameImageUrl() {
        return this.background_image || 'img/default.jpg';
    }
}

/**
 * Rappresenta una lista di giochi in tendenza.
 */
class TrendingGameList {
    /**
     * Crea una nuova istanza di TrendingGameList.
     * @param {string} elementId - ID dell'elemento HTML in cui visualizzare la lista dei giochi.
     * @param {Array} excludedGames - Array di nomi di giochi da escludere dalla lista.
     */
    constructor(elementId, excludedGames) {
        this.element = document.getElementById(elementId);
        this.excludedGames = excludedGames;
    }

    /**
     * Crea un elemento di lista per il gioco specificato.
     * @param {GameTrending} game - Il gioco per cui creare l'elemento di lista.
     * @returns {HTMLElement} - Elemento di lista creato per il gioco.
     */
    createListItem(game) {
        const listItem = document.createElement('li');
        const box = document.createElement('div');
        box.className = 'box';
        const image = document.createElement('img');
        image.src = game.getGameImageUrl();
        image.alt = game.name;
        const detailsLink = document.createElement('a');
        detailsLink.href = `./php/dettagli.php?gameId=${game.id}`;
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

    /**
     * Visualizza i giochi nella lista.
     * @param {Array} games - Array di giochi da visualizzare.
     */
    displayGames(games) {
        const filteredGames = games.filter(game => !this.excludedGames.includes(game.name));
        filteredGames.forEach(game => {
            const listItem = this.createListItem(game);
            this.element.appendChild(listItem);
        });
        $('.slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            margin: 10,
        });
    }
}

// Esegui la richiesta API per ottenere i giochi in tendenza
axios.get(`https://api.rawg.io/api/games?key=360b3c1b1c224703b27b6ca8f75dafb8&ordering=-rating&dates=2020-01-01,2023-12-31&page_size=10`)
    .then(response => {
        // Mappa i dati dei giochi nella classe GameTrending
        const games = response.data.results.map(gameData => new GameTrending(gameData.id, gameData.name, gameData.rating, gameData.genres, gameData.background_image));
        // Crea e visualizza la lista dei giochi in tendenza
        const trendingGamesList = new TrendingGameList('trendingGamesList', ['Shoot Shoot My Waifu','Sisterly Lust']);
        trendingGamesList.displayGames(games);
    })
    .catch(error => {
        console.error('Errore nella richiesta API per i giochi in tendenza:', error);
    });
