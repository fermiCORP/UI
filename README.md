# UI

# GameAdvisor

GameAdvisor è un'applicazione web che fornisce informazioni sui giochi più popolari, dettagli sui singoli giochi e consente agli utenti di esplorare il mondo del gaming. Dispone di un design reattivo e elegante con una navigazione fluida.

## Tabella dei Contenuti

- [Funzionalità](#funzionalità)
- [Utilizzo](#utilizzo)
- [Installazione](#installazione)
- [Dipendenze](#dipendenze)
- [Chiave API](#chiave-api)
- [Contributi](#contributi)
- [Licenza](#licenza)

## Funzionalità

- **Giochi in Tendenza:** Esplora una lista curata di giochi in tendenza con uno slider, inclusi dettagli come nome, valutazione e genere.

- **Dettagli del Gioco:** Visualizza informazioni dettagliate su un gioco specifico, tra cui nome, descrizione, data di uscita, valutazione, sviluppatori, editori, generi, piattaforme, negozi e tag.

- **Design Reattivo:** L'applicazione è progettata per offrire un'esperienza senza interruzioni su dispositivi diversi, garantendo un'interfaccia user-friendly.

- **Menu di Navigazione:** Il menu di navigazione consente agli utenti di spostarsi facilmente tra le diverse sezioni dell'applicazione.

- **Sistema di Notifiche:** Ricevi notifiche su aggiornamenti importanti o annunci. La casella delle notifiche può essere attivata cliccando sull'icona della campana.

## Utilizzo

1. Visita il [sito web di GameAdvisor](#) per esplorare i giochi più popolari e accedere a informazioni dettagliate su giochi specifici.

2. Usa il menu di navigazione per spostarti tra le diverse sezioni del sito web, inclusa la home page, i giochi più popolari e le informazioni di contatto.

3. Clicca sull'icona della campana per controllare le notifiche. Le notifiche possono includere informazioni su nuove uscite, aggiornamenti o altri annunci pertinenti.

## Installazione

1. Clona il repository sulla tua macchina locale:

   ```bash
   git clone https://github.com/tuo-nome-utente/GameAdvisor.git
   ```

2. Apri la cartella del progetto:

   ```bash
   cd GameAdvisor
   ```

3. Apri il file `index.html` nel tuo browser web preferito per esplorare il sito web.

## Dipendenze

- [Axios](https://github.com/axios/axios): Cliente HTTP basato su promesse per effettuare richieste API.
- [Slick Carousel](https://github.com/kenwheeler/slick): Carosello/scorrevole responsivo per la visualizzazione delle informazioni sui giochi.
- [Swiper](https://github.com/nolimits4web/swiper): Moderno slider tattile mobile.

Installa queste dipendenze includendo i link CDN forniti nel file HTML.

## Chiave API

GameAdvisor utilizza l'API della RAWG Video Games Database. È necessario ottenere una chiave API da [RAWG](https://rawg.io/apidocs) e sostituire la variabile `apiKey` nei file JavaScript (`dettagli.js` e `index.js`) con la tua chiave.

```javascript
const apiKey = 'tua-chiave-api';
```

## Contributi

Sentiti libero di contribuire al progetto aprendo issue o inviando pull request. I tuoi feedback e suggerimenti sono molto apprezzati.

## Licenza

Questo progetto è distribuito con licenza [MIT](LICENSE).
