<?php

// Inizializzazione della sessione
session_start();

// Funzione per la registrazione di un nuovo utente
function signup($data)
{
    $errors = array();

    // Validazione dei dati inseriti dall'utente
    if (!preg_match('/^[a-zA-Z]+$/', $data['username'])) {
        $errors[] = "Inserisci un nome utente valido";
    }

    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Inserisci un indirizzo email valido";
    }

    if (strlen(trim($data['password'])) < 4) {
        $errors[] = "La password deve contenere almeno 4 caratteri";
    }

    // Verifica se l'indirizzo email esiste già nel database
    $check = database_run("SELECT * FROM user WHERE email = :email LIMIT 1", ['email' => $data['email']]);
    if (is_array($check)) {
        $errors[] = "L'indirizzo email esiste già";
    }

    // Registrazione dell'utente nel database se non ci sono errori
    if (count($errors) == 0) {
        $arr['username'] = $data['username'];
        $arr['email'] = $data['email'];
        $arr['password'] = hash('sha256', $data['password']);
        $arr['date'] = date("Y-m-d H:i:s");

        $query = "INSERT INTO user (username, email, password, date) VALUES (:username, :email, :password, :date)";

        database_run($query, $arr);
    }

    return $errors;
}

// Funzione per il login dell'utente
function login($data)
{
    $errors = array();

    // Validazione dei dati inseriti dall'utente
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Inserisci un indirizzo email valido";
    }

    if (strlen(trim($data['password'])) < 4) {
        $errors[] = "La password deve contenere almeno 4 caratteri";
    }

    // Verifica delle credenziali dell'utente nel database
    if (count($errors) == 0) {
        $arr['email'] = $data['email'];
        $password = hash('sha256', $data['password']);

        $query = "SELECT * FROM user WHERE email = :email LIMIT 1";

        $row = database_run($query, $arr);

        if (is_array($row)) {
            $row = $row[0];

            if ($password === $row->password) {
                // Login riuscito: impostazione delle variabili di sessione
                $_SESSION['USER'] = $row;
                $_SESSION['LOGGED_IN'] = true;
            } else {
                $errors[] = "Email o password errati";
            }
        } else {
            $errors[] = "Email o password errati";
        }
    }

    return $errors;
}

// Funzione per l'esecuzione di query sul database utilizzando PDO
function database_run($query, $vars = array())
{
    $string = "mysql:host=sql11.freesqldatabase.com;dbname=sql11681139";
    $con = new PDO($string, 'sql11681139', 'l4lkJnVZ4J');

    if (!$con) {
        return false;
    }

    $stm = $con->prepare($query);
    $check = $stm->execute($vars);

    if ($check) {
        $data = $stm->fetchAll(PDO::FETCH_OBJ);

        if (count($data) > 0) {
            return $data;
        }
    }

    return false;
}

// Funzione per verificare se l'utente è loggato
function check_login($redirect = true)
{
    if (isset($_SESSION['USER']) && isset($_SESSION['LOGGED_IN'])) {
        return true;
    }

    if ($redirect) {
        // Reindirizzamento alla pagina di login se l'utente non è loggato
        header("Location: ../php/login.php");
        die;
    } else {
        return false;
    }
}

// Funzione per verificare se l'email dell'utente è stata verificata
function check_verified()
{
    $id = $_SESSION['USER']->id;
    $query = "SELECT * FROM user WHERE id = '$id' LIMIT 1";
    $row = database_run($query);

    if (is_array($row)) {
        $row = $row[0];

        if ($row->email == $row->email_verified) {
            return true;
        }
    }

    return false;
}


?>
