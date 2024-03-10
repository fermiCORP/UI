

/**
 * Classe per gestire la visualizzazione dei dettagli di un gioco.
 */
class GameDetailsManager {
    /**
     * Costruttore della classe GameDetailsManager.
     * @param {string} apiKey - Chiave API per le richieste al servizio RAWG.
     * @param {HTMLElement} gameContainer - Elemento HTML in cui inserire i dettagli del gioco.
     */
    constructor(apiKey, gameContainer) {
        this.apiKey = apiKey;
        this.gameContainer = gameContainer;
    }

    /**
     * Ottiene l'ID del gioco dall'URL della pagina.
     * @returns {string} L'ID del gioco.
     */
    getGameIdFromUrl() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get('gameId');
    }

    /**
     * Crea un contenitore per il nome del gioco.
     * @param {string} gameName - Nome del gioco.
     */
    createNameContainer(gameName) {
        const nameContainer = document.createElement('div');
        nameContainer.className = 'Name Container';

        const heading = document.createElement('h2');
        heading.textContent = 'Nome';
        heading.style.display = 'inline-flex';
        heading.style.fontSize = '1.4rem';
        heading.style.fontWeight = '500';
        heading.style.borderBottom = '4px solid var(--main-color)';

        const gameNameParagraph = document.createElement('p');
        gameNameParagraph.textContent = gameName;
        gameNameParagraph.style.fontSize = '0.938rem';
        gameNameParagraph.style.marginTop = '1rem';
        gameNameParagraph.style.textAlign = 'justify';

        nameContainer.appendChild(heading);
        nameContainer.appendChild(gameNameParagraph);

        this.gameContainer.appendChild(nameContainer);
    }

    /**
     * Crea un div con un'intestazione e un paragrafo.
     * @param {string} className - Classe del div.
     * @param {string} headingText - Testo dell'intestazione.
     * @param {string} infoText - Testo del paragrafo.
     */
    createInfoDiv(className, headingText, infoText) {
        const infoContainer = document.createElement('div');
        infoContainer.className = className;

        const heading = document.createElement('h2');
        heading.textContent = headingText;
        heading.style.display = 'inline-flex';
        heading.style.fontSize = '1.4rem';
        heading.style.fontWeight = '500';
        heading.style.borderBottom = '4px solid var(--main-color)';
        infoContainer.appendChild(heading);

        const infoParagraph = document.createElement('p');
        infoParagraph.textContent = infoText;
        infoParagraph.style.fontSize = '0.938rem';
        infoParagraph.style.marginTop = '1rem';
        infoParagraph.style.textAlign = 'justify';
        infoContainer.appendChild(infoParagraph);

        this.gameContainer.appendChild(infoContainer);
    }

    /**
     * Crea un contenitore per le schermate di gioco.
     * @param {Array} screenshots - Array di oggetti con le informazioni sulle schermate.
     */
    createScreenshotContainer(screenshots) {
        const screenshotContainer = document.createElement('div');
        screenshotContainer.className = 'screenshot-container';

        const screenshotHeading = document.createElement('h2');
        screenshotHeading.textContent = 'Screenshot';
        screenshotHeading.style.display = 'inline-flex';
        screenshotHeading.style.fontSize = '1.4rem';
        screenshotHeading.style.fontWeight = '500';
        screenshotHeading.style.borderBottom = '4px solid var(--main-color)';
        screenshotHeading.style.margin = '1.6rem 0';
        screenshotContainer.appendChild(screenshotHeading);

        const screenshotContent = document.createElement('div');
        screenshotContent.className = 'screenshot-content';

        screenshots.forEach(screenshot => {
            const screenshotImage = document.createElement('img');
            screenshotImage.src = screenshot.image;
            screenshotImage.alt = 'Screenshot';
            screenshotImage.style.width ='100%';
            screenshotImage.style.height ='440px';
            screenshotImage.style.objectFit ='cover';
            screenshotContent.appendChild(screenshotImage);
        });

        screenshotContainer.appendChild(screenshotContent);

        this.gameContainer.appendChild(screenshotContainer);
    }

    /**
     * Visualizza le piattaforme del gioco.
     * @param {Array} platforms - Array di oggetti con le informazioni sulle piattaforme.
     */
    displayGamePlatforms(platforms) {
        const platformsElement = document.createElement('p');
        platformsElement.textContent = `Platforms: ${platforms ? platforms.map(platform => platform.platform.name).join(', ') : 'N/A'}`;
        this.gameContainer.appendChild(platformsElement);
    }

    /**
     * Ottiene l'URL dell'immagine del gioco.
     * @param {Object} game - Oggetto con le informazioni sul gioco.
     * @returns {string} URL dell'immagine del gioco.
     */
    getGameImageUrl(game) {
        return game.background_image || 'img/default.jpg';
    }

    /**
     * Crea un paragrafo.
     * @param {string} text - Testo del paragrafo.
     */
    createParagraph(text) {
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        this.gameContainer.appendChild(paragraph);
    }

    /**
     * Visualizza le schermate di gioco.
     * @param {Array} screenshots - Array di oggetti con le informazioni sulle schermate di gioco.
     */
    displayGameScreenshots(screenshots) {
        this.createScreenshotContainer(screenshots);
    }

    /**
     * Visualizza i dettagli del gioco.
     * @param {Object} game - Oggetto con le informazioni sul gioco.
     */
    displayGameDetails(game) {
        console.log('Game Details:', game);

        // Prima richiesta per ottenere il nome del gioco
        if (game.id) {
            axios.get(`https://api.rawg.io/api/games/${game.id}?key=${this.apiKey}`)
    .then(response => {
    const gameDetails = response.data;
    game.name = gameDetails.name; // Aggiorna il nome del gioco
    this.displayGameDetailsWithUpdatedName(game);
})
    .catch(error => {
        console.error('Errore nella richiesta API per il nome del gioco:', error);
        this.displayGameDetailsWithUpdatedName(game);
    });
} else {
    this.displayGameDetailsWithUpdatedName(game);
}
}

/**
 * Visualizza i dettagli del gioco con il nome aggiornato.
 * @param {Object} game - Oggetto con le informazioni sul gioco.
 */
displayGameDetailsWithUpdatedName(game) {
    const backgroundImageElement = document.createElement('img');
    backgroundImageElement.src = this.getGameImageUrl(game);
    backgroundImageElement.className = 'foto-container';
    backgroundImageElement.style.width = '100%';
    backgroundImageElement.style.aspectRatio = '16 / 9';
    this.gameContainer.appendChild(backgroundImageElement);

    this.createNameContainer(game.name);

    // Creazione dei div con gli h2 e p richiesti
    this.createInfoDiv('released', 'Rilascio', game.released);
    this.createInfoDiv('rating', 'valutazione', game.rating);
    this.createInfoDiv('developer', 'Sviluppatore', game.developers ? game.developers[0]?.name : 'N/A');
    this.createInfoDiv('publisher', 'Publicatore', game.publishers ? game.publishers[0]?.name : 'N/A');
    this.createInfoDiv('genres', 'Genere', game.genres ? game.genres.map(genre => genre.name).join(', ') : 'N/A');

    // Creazione del div con la classe 'description'
    this.createInfoDiv('description', 'Storia del gioco', game.description_raw || 'N/A');

    // Creazione della sezione degli screenshots
    if (game.id) {
        axios.get(`https://api.rawg.io/api/games/${game.id}/screenshots?key=${this.apiKey}`)
            .then(response => {
                const screenshots = response.data.results;
                if (screenshots && screenshots.length > 0) {
                    this.createScreenshotContainer(screenshots);
                } else {
                    this.createParagraph('Screenshots: N/A');
                }
            })
            .catch(error => {
                console.error('Errore nella richiesta API per gli screenshot:', error);
            });
    } else {
        this.createParagraph('Screenshots: N/A');
    }

    // Altre parti della funzione...
}

/**
 * Ottiene e visualizza i dettagli del gioco.
 * @param {string} gameId - ID del gioco.
 */
getAndDisplayGameDetails(gameId) {
    axios.get(`https://api.rawg.io/api/games/${gameId}?key=${this.apiKey}`)
        .then(response => {
            const gameDetails = response.data;
            this.displayGameDetails(gameDetails);
        })
        .catch(error => {
            console.error('Errore nella richiesta API:', error);
        });
}

/**
 * Avvia il processo di visualizzazione dei dettagli del gioco.
 */
init() {
    const gameId = this.getGameIdFromUrl();
    if (gameId) {
        this.getAndDisplayGameDetails(gameId);
    }
}
}

// Creazione di un'istanza della classe GameDetailsManager e avvio dell'inizializzazione.
const gameDetailsManager = new GameDetailsManager('360b3c1b1c224703b27b6ca8f75dafb8', document.getElementById('gameContainer'));
gameDetailsManager.init();
