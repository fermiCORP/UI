-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Feb 01, 2024 alle 00:08
-- Versione del server: 10.4.24-MariaDB
-- Versione PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `verify_db`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `email_verified` varchar(100) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `reset_token_hash` varchar(64) DEFAULT NULL,
  `reset_token_expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `email_verified`, `password`, `date`, `reset_token_hash`, `reset_token_expires_at`) VALUES
(1, 'ddd', 'ddd@dd.com', '', '5bf8aa57fc5a6bc547decf1cc6db63f10deb55a3c6c5df497d631fb3d95e1abf', '2024-01-29 23:42:21', NULL, NULL),
(7, 'Assiro', 'lorenzo.assiro@gmail.com', 'lorenzo.assiro@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '2024-01-30 18:30:43', NULL, NULL),
(13, 'sdsddd', 'gentilemaurizio6@gmail.com', 'gentilemaurizio6@gmail.com', 'e3b10edb44946db69c63a3cdd318849129bae264d686876cd29284f4c71abb7e', '2024-01-30 22:50:42', NULL, NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `verify`
--

CREATE TABLE `verify` (
  `id` int(11) NOT NULL,
  `code` int(5) NOT NULL,
  `expires` int(11) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `verify`
--

INSERT INTO `verify` (`id`, `code`, `expires`, `email`) VALUES
(2, 89065, 1706569532, 'alessiomanca69@gmail.com'),
(4, 49201, 1706569702, 'gentilemaurizio6@gmail.com'),
(5, 30898, 1706635797, 'wddd@dd.com'),
(6, 60880, 1706635895, 'wddd@dd.com'),
(7, 70050, 1706635941, 'wddd@dd.com'),
(8, 51613, 1706636245, 'wddd@dd.com'),
(9, 85494, 1706636466, 'lorenzo.assiro@gmail.com'),
(10, 19825, 1706636519, 'lorenzo.assiro@gmail.com'),
(11, 86947, 1706636852, 'gentilemaurizio6@gmail.com'),
(12, 21874, 1706636999, 'gentilemaurizio6@gmail.com'),
(13, 91215, 1706637109, 'gentilemaurizio6@gmail.com'),
(14, 30812, 1706647461, 'gentilemaurizio6@gmail.com'),
(15, 22554, 1706650022, 'gentilemaurizio6@gmail.com'),
(16, 94664, 1706742510, 'gentilemaurizio6@gmail.com');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reset_token_hash` (`reset_token_hash`),
  ADD KEY `email` (`email`),
  ADD KEY `username` (`username`),
  ADD KEY `date` (`date`);

--
-- Indici per le tabelle `verify`
--
ALTER TABLE `verify`
  ADD PRIMARY KEY (`id`),
  ADD KEY `code` (`code`),
  ADD KEY `email` (`email`),
  ADD KEY `expires` (`expires`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT per la tabella `verify`
--
ALTER TABLE `verify`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
