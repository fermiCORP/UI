/**
 * Classe che gestisce il comportamento della pagina index.
 */
class IndexPage {
    /**
     * Crea una nuova istanza di IndexPage.
     */
    constructor() {
        /**
         * Elemento wrapper dei giochi in tendenza.
         * @type {HTMLElement}
         */
        this.trendingGamesWrapper = document.getElementById('trendingGamesWrapper');

        /**
         * Icona del menu.
         * @type {HTMLElement}
         */
        this.menu = document.querySelector('.menu-icon');

        /**
         * Barra di navigazione.
         * @type {HTMLElement}
         */
        this.navbar = document.querySelector('.menu');

        /**
         * Icona della notifica.
         * @type {HTMLElement}
         */
        this.bell = document.querySelector('.notification');

        // Gestisce il click sull'icona del menu
        this.menu.onclick = () => {
            this.navbar.classList.toggle('active');
            this.menu.classList.toggle('move');
            this.bell.classList.remove('active');
        };

        // Gestisce il click sull'icona della notifica
        document.querySelector('#bell-icon').onclick = () => {
            this.bell.classList.toggle('active');
        };

        // Gestisce lo scrolling della finestra
        window.onscroll = () => {
            this.scrollFunction();
        };
    }

    /**
     * Funzione che gestisce lo scrolling della finestra.
     */
    scrollFunction() {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        document.getElementById('scroll-bar').style.width = scrolled + '%';
    }
}

// Utilizzo della classe per inizializzare la pagina
const indexPage = new IndexPage();
