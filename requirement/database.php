<?php
// Definizione dei parametri di connessione al database
$host = "sql11.freesqldatabase.com"; // Indirizzo del server del database
$dbname = "sql11681139"; // Nome del database
$username = "sql11681139"; // Nome utente per accedere al database
$password = "l4lkJnVZ4J"; // Password per accedere al database

// Creazione di un nuovo oggetto mysqli per la connessione al database
$mysqli = new mysqli(
    hostname: $host,
    username: $username,
    password: $password,
    database: $dbname
);

// Verifica se si è verificato un errore durante la connessione al database
if ($mysqli->connect_errno) {
    // In caso di errore, termina lo script e visualizza un messaggio di errore
    die("Connection error: " . $mysqli->connect_error);
}

// Restituisci l'oggetto mysqli per essere utilizzato altrove nel codice
return $mysqli;
?>
