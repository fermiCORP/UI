/**
 * Rappresenta le caratteristiche di un gioco di tipo Shooter.
 */
class GameShooter {
    /**
     * Crea una nuova istanza di GameShooter.
     * @param {number} id - L'ID del gioco.
     * @param {string} name - Il nome del gioco.
     * @param {number} rating - Il rating del gioco.
     * @param {Array} genres - Array contenente i generi del gioco.
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
     * @returns {string} URL dell'immagine del gioco.
     */
    getGameImageUrl() {
        return this.background_image || 'img/default.jpg';
    }
}

/**
 * Rappresenta una lista di giochi di tipo shooter.
 */
class ShooterGameList {
    /**
     * Crea una nuova istanza di ShooterGameList.
     * @param {string} elementId - L'ID dell'elemento HTML in cui inserire la lista di giochi.
     * @param {Array} excludedGames - Array contenente i nomi dei giochi da escludere dalla lista.
     */
    constructor(elementId, excludedGames) {
        this.element = document.getElementById(elementId);
        this.excludedGames = excludedGames;
    }

    /**
     * Crea un elemento della lista per un gioco shooter.
     * @param {GameShooter} game - Il gioco shooter.
     * @returns {HTMLLIElement} Elemento della lista per il gioco shooter.
     */
    createListItem(game) {
        const listItem = document.createElement('li');
        const box = document.createElement('div');
        box.className = 'box ';  // Aggiungi le classi richieste

        const image = document.createElement('img');
        image.src = game.getGameImageUrl();
        image.alt = game.name;

        const detailsLink = document.createElement('a');
        detailsLink.href = `./php/dettagli.php?gameId=${game.id}`; // Modifica l'URL qui
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

    /**
     * Visualizza i giochi shooter nella lista.
     * @param {Array} games - Array contenente i giochi shooter da visualizzare.
     */
    displayGames(games) {
        const filteredGames = games.filter(game => !this.excludedGames.includes(game.name));
        filteredGames.forEach(game => {
            const listItem = this.createListItem(game);
            this.element.appendChild(listItem);
        });

        $('.slider4').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
        });
    }
}

/**
 * Effettua una richiesta API per ottenere i giochi di tipo shooter più popolari e li visualizza.
 */
axios.get(`https://api.rawg.io/api/games?key=360b3c1b1c224703b27b6ca8f75dafb8&genres=shooter&ordering=-rating&dates=2020-01-01,2023-12-31&page_size=10`)
    .then(response => {
        const games = response.data.results.map(gameData => new GameShooter(gameData.id, gameData.name, gameData.rating, gameData.genres, gameData.background_image));
        const shooterGamesList = new ShooterGameList('GiochiSparatutto', []);
        shooterGamesList.displayGames(games);
    })
    .catch(error => {
        console.error('Errore nella richiesta API per i giochi sparatutto più popolari:', error);
    });
