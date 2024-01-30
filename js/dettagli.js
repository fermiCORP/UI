const apiKey = '360b3c1b1c224703b27b6ca8f75dafb8';
const gameContainer = document.getElementById('gameContainer');

function getGameIdFromUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('gameId');
}

function createNameContainer(gameName) {
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

    gameContainer.appendChild(nameContainer);
}

function createInfoDiv(className, headingText, infoText) {
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

    gameContainer.appendChild(infoContainer);
}

// Seleziona tutti gli elementi con la classe .name
const nameElements = document.querySelectorAll('.name p');

// Applica le proprietà di stile a ciascun elemento
nameElements.forEach(element => {
    element.style.fontSize = '0.938rem';
    element.style.marginTop = '1rem';
    element.style.textAlign = 'justify';
});

function displayGamePlatforms(platforms) {
    const platformsElement = document.createElement('p');
    platformsElement.textContent = `Platforms: ${platforms ? platforms.map(platform => platform.platform.name).join(', ') : 'N/A'}`;
    gameContainer.appendChild(platformsElement);
}

function getGameImageUrl(game) {
    return game.background_image || 'img/default.jpg';
}

function createParagraph(text) {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    gameContainer.appendChild(paragraph);
}

function displayGameScreenshots(screenshots) {
    const screenshotsContainer = document.createElement('div');
    screenshotsContainer.className = 'screenshots-container';

    screenshots.forEach(screenshot => {
        const screenshotImage = document.createElement('img');
        screenshotImage.src = screenshot.image;
        screenshotImage.alt = 'Screenshot';

        screenshotsContainer.appendChild(screenshotImage);
    });

    gameContainer.appendChild(screenshotsContainer);
}

function displayGameDetails(game) {
    console.log('Game Details:', game);

    // Prima richiesta per ottenere il nome del gioco
    if (game.id) {
        axios.get(`https://api.rawg.io/api/games/${game.id}?key=${apiKey}`)
            .then(response => {
                const gameDetails = response.data;
                game.name = gameDetails.name; // Aggiorna il nome del gioco
                displayGameDetailsWithUpdatedName(game);
            })
            .catch(error => {
                console.error('Errore nella richiesta API per il nome del gioco:', error);
                displayGameDetailsWithUpdatedName(game);
            });
    } else {
        displayGameDetailsWithUpdatedName(game);
    }
}

function displayGameDetailsWithUpdatedName(game) {
    const backgroundImageElement = document.createElement('img');
    backgroundImageElement.src = getGameImageUrl(game);
    backgroundImageElement.className = 'foto-container';
    backgroundImageElement.style.width = '100%';
    backgroundImageElement.style.aspectRatio = '16 / 9';
    gameContainer.appendChild(backgroundImageElement);

    createNameContainer(game.name);

    // Creazione dei div con gli h2 e p richiesti
    createInfoDiv('released', 'Rilascio', game.released);
    createInfoDiv('rating', 'valutazione', game.rating);
    createInfoDiv('developer', 'Sviluppatore', game.developers ? game.developers[0]?.name : 'N/A');
    createInfoDiv('publisher', 'Publicatore', game.publishers ? game.publishers[0]?.name : 'N/A');
    createInfoDiv('genres', 'Genere', game.genres ? game.genres.map(genre => genre.name).join(', ') : 'N/A');

    // Creazione del div con la classe 'description'
    createInfoDiv('description', 'Storia del gioco', game.description_raw || 'N/A');

    // Altre parti della funzione...

    if (game.id) {
        axios.get(`https://api.rawg.io/api/games/${game.id}/screenshots?key=${apiKey}`)
            .then(response => {
                const screenshots = response.data.results;
                if (screenshots && screenshots.length > 0) {
                    displayGameScreenshots(screenshots);
                } else {
                    createParagraph('Screenshots: N/A');
                }
            })
            .catch(error => {
                console.error('Errore nella richiesta API per gli screenshot:', error);
            });
    } else {
        createParagraph('Screenshots: N/A');
    }

    // Altre parti della funzione...
}

function getAndDisplayGameDetails(gameId) {
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
    getAndDisplayGameDetails(gameId);
}
