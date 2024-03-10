/**
 * Rappresenta un gioco di avventura.
 */
class GameAdventure {
    /**
     * Crea una nuova istanza di Game.
     * @param {number} id - L'ID del gioco.
     * @param {string} name - Il nome del gioco.
     * @param {number} rating - Il rating del gioco.
     * @param {Array} genres - Array dei generi del gioco.
     * @param {string} background_image - L'URL dell'immagine di sfondo del gioco.
     */
    constructor(id, name, rating, genres, background_image) {
        this.id = id;
        this.name = name;
        this.rating = rating;
        this.genres = genres;
        this.background_image = background_image;
    }
    /**
     * Ottiene l'URL dell'immagine del gioco, restituendo un'immagine predefinita se non disponibile.
     * @returns {string} L'URL dell'immagine del gioco.
     */
    getGameImageUrl() {
        return this.background_image || 'img/default.jpg';
    }
}

/**
 * Gestisce la lista dei giochi di avventura.
 */
class AdventureGameList {
    /**
     * Crea una nuova istanza di AdventureGameList.
     * @param {string} elementId - L'ID dell'elemento HTML in cui visualizzare i giochi.
     * @param {Array} excludedGames - Array dei giochi esclusi.
     */
    constructor(elementId, excludedGames) {
        this.element = document.getElementById(elementId);
        this.excludedGames = excludedGames;
    }
    /**
     * Crea un elemento della lista per un gioco.
     * @param {GameAdventure} game - Il gioco da aggiungere alla lista.
     * @returns {HTMLElement} L'elemento della lista creato.
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
     * Visualizza i giochi di avventura sulla pagina.
     * @param {Array} games - Array dei giochi da visualizzare.
     */
    displayGames(games) {
        const filteredGames = games.filter(game => !this.excludedGames.includes(game.name));
        filteredGames.forEach(game => {
            const listItem = this.createListItem(game);
            this.element.appendChild(listItem);
        });
        $('.slider3').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
        });
    }
}

// Richiesta API per i giochi di avventura più popolari
axios.get(`https://api.rawg.io/api/games?key=360b3c1b1c224703b27b6ca8f75dafb8&genres=adventure&ordering=-rating&dates=2020-01-01,2023-12-31&page_size=10`)
    .then(response => {
        // Mappa i dati dei giochi ottenuti dalla risposta API in oggetti Game
        const games = response.data.results.map(game => new GameAdventure(game.id, game.name, game.rating, game.genres, game.background_image));
        // Crea una nuova istanza di AdventureGameList e visualizza i giochi
        const adventureGamesList = new AdventureGameList('GiochiAdventure', ['Shoot Shoot My Waifu', 'Grown-Up Titans ( Teen Titans)', 'The Coffin of Andy and Leyley', 'Sisterly Lust']);
        adventureGamesList.displayGames(games);
    })
    .catch(error => {
        console.error('Error fetching popular adventure games:', error);
    });
