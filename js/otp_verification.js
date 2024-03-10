/**
 * Classe per gestire l'OTP (One Time Password) su una pagina web.
 */
class OTPManager {
    /**
     * Crea una nuova istanza di OTPManager.
     * @param {string} inputsSelector - Selettore per gli input dell'OTP.
     * @param {string} buttonSelector - Selettore per il pulsante associato all'OTP.
     */
    constructor(inputsSelector, buttonSelector) {
        this.inputs = document.querySelectorAll(inputsSelector);
        this.button = document.querySelector(buttonSelector);
        this.lastInputStatus = 0; // Stato dell'ultimo input
    }

    /**
     * Inizializza il gestore dell'OTP.
     */
    init() {
        this.attachInputEventListeners();
    }

    /**
     * Aggiunge gli eventi di input agli elementi dell'OTP.
     */
    attachInputEventListeners() {
        this.inputs.forEach(input => {
            input.addEventListener('keyup', (e) => {
                this.handleInputKeyUp(e);
            });
        });
    }

    /**
     * Gestisce l'evento keyup su un input dell'OTP.
     * @param {Event} e - L'evento keyup.
     */
    handleInputKeyUp(e) {
        const currentElement = e.target;
        const nextElement = currentElement.nextElementSibling;
        const prevElement = currentElement.previousElementSibling;

        if (prevElement && e.keyCode === 8) { // Verifica se il tasto premuto è il backspace
            if (this.lastInputStatus === 1) { // Se l'ultimo input era pieno
                prevElement.value = ''; // Cancella il valore dell'input precedente
                prevElement.focus(); // Sposta il focus all'input precedente
            }
            this.button.setAttribute('disabled', true); // Disabilita il pulsante
            this.lastInputStatus = 1; // Imposta lo stato dell'ultimo input
        } else {
            const reg = /^[0-9]+$/; // Espressione regolare per accettare solo numeri
            if (!reg.test(currentElement.value)) { // Se il valore non è un numero
                currentElement.value = currentElement.value.replace(/\D/g, ''); // Rimuovi tutti i caratteri non numerici
            } else if (currentElement.value) { // Se il valore non è vuoto
                if (nextElement) {
                    nextElement.focus(); // Sposta il focus all'input successivo
                } else {
                    this.button.removeAttribute('disabled'); // Abilita il pulsante
                    this.lastInputStatus = 0; // Reimposta lo stato dell'ultimo input
                }
            }
        }
    }
}

// Creazione di un'istanza di OTPManager e inizializzazione
const otpManager = new OTPManager('.otp-card-inputs input', '.otp-card button');
otpManager.init();
