-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mer. 26 mars 2025 à 03:26
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `SAE401`
--

-- --------------------------------------------------------

--
-- Structure de la table `Admin`
--

CREATE TABLE `Admin` (
  `id_admin` int(11) NOT NULL,
  `login` varchar(255) DEFAULT NULL,
  `psswrd` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Admin`
--

INSERT INTO `Admin` (`id_admin`, `login`, `psswrd`) VALUES
(1, 'admin', '$2y$10$zw8PxdjjT7rF2q85l3XdhubWmsDwlm7gpUi089rIVygTQlcoArcjm');

-- --------------------------------------------------------

--
-- Structure de la table `Avis`
--

CREATE TABLE `Avis` (
  `id_avis` int(11) NOT NULL,
  `contenu` varchar(255) DEFAULT NULL,
  `date_publication` datetime DEFAULT current_timestamp(),
  `id_eleve` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Avis`
--

INSERT INTO `Avis` (`id_avis`, `contenu`, `date_publication`, `id_eleve`) VALUES
(1, 'Super app ! Moniteur cool et ludique', '2025-03-23 20:40:11', 10);

-- --------------------------------------------------------

--
-- Structure de la table `Ecole`
--

CREATE TABLE `Ecole` (
  `id_ecole` int(11) NOT NULL,
  `etablissement` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Ecole`
--

INSERT INTO `Ecole` (`id_ecole`, `etablissement`) VALUES
(77, 'SOS CONDUITE');

-- --------------------------------------------------------

--
-- Structure de la table `Eleve`
--

CREATE TABLE `Eleve` (
  `id_eleve` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `date_inscription` datetime DEFAULT current_timestamp(),
  `etg` varchar(255) DEFAULT NULL,
  `neph` varchar(255) DEFAULT NULL,
  `psswrd` varchar(255) DEFAULT NULL,
  `id_ecole` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Eleve`
--

INSERT INTO `Eleve` (`id_eleve`, `nom`, `prenom`, `birthdate`, `date_inscription`, `etg`, `neph`, `psswrd`, `id_ecole`) VALUES
(10, 'Goncalves', 'Hugo', '2005-03-11', '2025-03-22 17:34:12', 'Permis A', '210534300210', '$2y$10$geDDJoLTtVaDeV8NYj6luu6q/XJ1.oCkK8iZQqFRjh5FJYf2ojMGK', 77),
(12, 'MADJHOUB', 'Assia', '2004-03-03', '2025-03-23 22:22:05', 'Permis B', '21053430021', '$2y$10$WmCm3E6tbqgd9HsJ2.Trgu5yWm2VhTvguwLwkKcCNOfSDjzNFS.46', 77),
(13, 'Pereira Da Silva ', 'Ruben', '2025-03-12', '2025-03-23 23:34:47', 'Permis A', '21053430021', '$2y$10$h/eZWH9ld76eKTTARsRyY.DJmgFLfX5FL/AgFVRZukPpJRdGxi3cO', 77),
(32, 'Chtioui', 'Ibtissam', '2005-05-07', '2025-03-24 17:11:14', 'Permis B', '21053430021', '$2y$10$Q1ZkpE5Our.9xR0.VvrDPeUbYD8kboxYI76GBbmceuLwgpfq2.1yi', 77),
(40, 'SAE', '401', '2025-03-14', '2025-03-26 00:03:36', 'Permis B', '21053430021', '$2y$10$HTqcZRwB72Dd5J0fO1g1PeGHvSxhbjyC384sBFLqt23FA1i2YPuZ.', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `test`
--

CREATE TABLE `test` (
  `ID` int(11) NOT NULL,
  `thematique` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT current_timestamp(),
  `score` int(11) DEFAULT NULL,
  `id_eleve` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `test`
--

INSERT INTO `test` (`ID`, `thematique`, `date`, `score`, `id_eleve`) VALUES
(1, 'signalisation', '2025-03-23 15:36:58', 36, 10),
(2, 'caca', '2025-03-23 17:38:46', 40, 10);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Admin`
--
ALTER TABLE `Admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Index pour la table `Avis`
--
ALTER TABLE `Avis`
  ADD PRIMARY KEY (`id_avis`),
  ADD KEY `fk_id_eleve` (`id_eleve`);

--
-- Index pour la table `Ecole`
--
ALTER TABLE `Ecole`
  ADD PRIMARY KEY (`id_ecole`);

--
-- Index pour la table `Eleve`
--
ALTER TABLE `Eleve`
  ADD PRIMARY KEY (`id_eleve`),
  ADD KEY `fk_id_ecole` (`id_ecole`);

--
-- Index pour la table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_id_eleve_test` (`id_eleve`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Admin`
--
ALTER TABLE `Admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `Avis`
--
ALTER TABLE `Avis`
  MODIFY `id_avis` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `Ecole`
--
ALTER TABLE `Ecole`
  MODIFY `id_ecole` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT pour la table `Eleve`
--
ALTER TABLE `Eleve`
  MODIFY `id_eleve` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT pour la table `test`
--
ALTER TABLE `test`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Avis`
--
ALTER TABLE `Avis`
  ADD CONSTRAINT `fk_id_eleve` FOREIGN KEY (`id_eleve`) REFERENCES `Eleve` (`id_eleve`) ON DELETE CASCADE;

--
-- Contraintes pour la table `Eleve`
--
ALTER TABLE `Eleve`
  ADD CONSTRAINT `fk_id_ecole` FOREIGN KEY (`id_ecole`) REFERENCES `Ecole` (`id_ecole`) ON DELETE SET NULL;

--
-- Contraintes pour la table `test`
--
ALTER TABLE `test`
  ADD CONSTRAINT `fk_id_eleve_test` FOREIGN KEY (`id_eleve`) REFERENCES `Eleve` (`id_eleve`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
