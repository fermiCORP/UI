// Dichiarazione delle variabili
class LoginManager {
    constructor(loginBtn, registerBtn, loginForm, registerForm) {
        this.loginBtn = loginBtn;
        this.registerBtn = registerBtn;
        this.loginForm = loginForm;
        this.registerForm = registerForm;
    }

    // Funzione del pulsante di accesso
    handleLoginButtonClick() {
        this.loginBtn.style.backgroundColor = "#21264D";
        this.registerBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        this.loginForm.style.left = "50%";
        this.registerForm.style.left = "-50%";
        this.loginForm.style.opacity = 1;
        this.registerForm.style.opacity = 0;
        document.querySelector(".col-1").style.borderRadius = "0 30% 20% 0";
    }

    // Funzione del pulsante di registrazione
    handleRegisterButtonClick() {
        this.loginBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        this.registerBtn.style.backgroundColor = "#21264D";
        this.loginForm.style.left = "150%";
        this.registerForm.style.left = "50%";
        this.loginForm.style.opacity = 0;
        this.registerForm.style.opacity = 1;
        document.querySelector(".col-1").style.borderRadius = "0 20% 30% 0";
    }
}

// Creazione dell'istanza di LoginManager
const loginManager = new LoginManager(
    document.querySelector("#login"),
    document.querySelector("#register"),
    document.querySelector(".login-form"),
    document.querySelector(".register-form")
);

// Aggiunta degli event listener ai pulsanti di accesso e registrazione
loginManager.loginBtn.addEventListener('click', () => {
    loginManager.handleLoginButtonClick();
});

loginManager.registerBtn.addEventListener('click', () => {
    loginManager.handleRegisterButtonClick();
});
