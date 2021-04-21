-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le :  mer. 21 avr. 2021 à 07:17
-- Version du serveur :  5.7.26
-- Version de PHP :  7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `nodemysql`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `comment_date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `comment_date_update` datetime DEFAULT NULL,
  `comment_content` varchar(3000) NOT NULL,
  `comment_state` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`comment_id`, `user_id`, `post_id`, `comment_date_creation`, `comment_date_update`, `comment_content`, `comment_state`) VALUES
(25, 1, 99, '2021-04-21 07:17:00', NULL, 'Super article !', 1);

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `like_date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `like_state` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`like_id`, `post_id`, `user_id`, `like_date_creation`, `like_state`) VALUES
(11, 99, 1, '2021-04-21 07:00:34', 1);

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_date_creation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `post_date_update` datetime DEFAULT NULL,
  `post_title` varchar(150) NOT NULL,
  `post_content` varchar(6000) NOT NULL,
  `post_file` text,
  `post_state` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`post_id`, `user_id`, `post_date_creation`, `post_date_update`, `post_title`, `post_content`, `post_file`, `post_state`) VALUES
(98, 1, '2021-04-21 08:57:22', NULL, 'Ces employés vivent 24 heures sur 24 et 7 jours sur 7 avec leurs patrons', 'Alors qu\'il est de plus en plus difficile de se déconnecter du boulot en cette période où le télétravail est omniprésent, une entreprise américaine est allée encore plus loin: les employés et patrons vivent dans la même maison, 24 heures sur 24, 7 jours sur 7, rapporte un article du Guardian. Au total, cinq des employés de la start-up Fiveable et deux responsables travaillent, mangent, dorment au même endroit, font des soirées et partent même en vacances ensemble.\n\nDans cette collocation de travail, à mi-chemin entre maison familiale et QG d\'une fraternité américaine, un des responsables prépare régulièrement des repas de famille, la directrice générale se balade en survêtement et certains employés invitent leurs rendez-vous amoureux. L\'année dernière, ils ont passé toutes les grandes fêtes et les anniversaires en groupe.\n\nSi la directrice générale affirme qu\'un employé ne risque pas d\'être viré parce qu\'il a trop bu à une soirée par exemple, il y a des limites à ne pas dépasser. «S\'il y avait une bagarre entre des personnes et que des choses vraiment horribles étaient dites... Des choses racistes, sexistes ou homophobes, ce serait vraiment inquiétant», précise Amanda DoAmara. Elle a d\'ailleurs déjà licencié plusieurs employés et les a donc expulsés de la maison.\n\nAvec ce rythme, il est également compliqué de trouver un équilibre entre travail et vie privée, et de déconnecter. Les ordinateurs sont d\'ailleurs toujours allumés dans la maison et les colocataires sont tous des acharnés du travail, indique The Guardian. «Nous essayons de ne pas travailler le samedi. Et le dimanche est une sorte de demi-journée», assure la directrice générale.\n\nCette start-up, spécialisée dans les technologies de l\'éducation, a déménagé à Milwaukee, dans le Wisconsin, au début de la pandémie. L\'entreprise devait réduire ses coûts et la cohabitation semblait être la solution idéale, explique le quotidien britannique. Pour promouvoir ce mode de vie original, Fiveable a mis la barre haut: les employés qui choisissent d\'habiter dans la maison ne paient pas de loyer pendant un an, touchent un salaire complet et bénéficient d\'avantages, comme une salle de sport gratuite. Ils n\'ont pas non plus eu à payer leurs frais de déménagement.\n\nUn équilibre entre travail et vie privée difficile à trouver\nVu sous cet angle, l\'offre est tentante. Mais il faut être prêt à vivre avec ses boss et la cohabitation n\'est pas toujours évidente, voire même inconfortable les premiers temps. Il est difficile de se détendre, de savoir comment se comporter au quotidien face à ses patrons ou s\'ils évaluent en permanence leurs salariés ou non. «Je voulais les impressionner», confie Harry Cap, un colocataire, inquiet que son comportement en dehors des heures de travail éclipse ses capacités professionnelles. «J\'étais donc un peu nerveux. Je ne savais pas vraiment ce que je devais dire ou ce que je devais faire.»', 'http://localhost:3000/uploads/1618988242962maison_employes_boss.jpeg', 1),
(99, 51, '2021-04-21 09:00:12', NULL, 'Les robots ne vont pas vous voler votre travail', 'En février dernier, le McKinsey Global Institute a prévu que 45 millions d\'Américains (soit un quart de la population active) allaient perdre leur emploi d\'ici 2030 en raison de l\'automatisation. Cette hausse par rapport à l\'estimation qu\'avait faite le même institut en 2017 –qui prévoyait alors que le nombre d\'emplois perdus en raison de l\'automatisation serait de 39 millions– s\'explique par les bouleversements économiques engendrés par le Covid-19. Historiquement, c\'est durant les périodes de récession que les entreprises ont tendance à remplacer les employés qu\'elles licencient par des machines.\n\nLa crainte d\'un chômage de masse dû aux robots devient de plus en plus courante. Andrew Yang, qui est actuellement en tête des sondages pour l\'investiture démocrate à la mairie de New York, en avait fait un point majeur de sa campagne peu orthodoxe pour l\'élection présidentielle de 2020. Le manque d\'emplois à venir justifiait, selon lui, que le gouvernement donne à chaque américain un revenu mensuel de 1.000$.\n\nToutefois, si l\'on regarde de plus près les études qui prédisent une perte d\'emploi due à l\'automatisation, les raisons de s\'alarmer semblent moins évidentes (ce qui n\'est pas une raison pour ne pas prendre en considération l\'utilité d\'un revenu universel de base). Dans l\'ensemble, les robots ne vont pas venir vous voler votre travail –du moins, pas tout de suite.\n\nPour commencer, il y a une énorme différence entre «robots» et «automatisation». Autrefois, beaucoup d\'ascenseurs étaient actionnés par des personnes. À Washington D.C., on en trouvait encore dans les années 2010. Ils n\'ont pas été remplacés par des robots humanoïdes qui écoutent les demandes des passagers avant d\'actionner un levier de leurs doigts mécaniques. Au lieu de cela, ils furent remplacés par des rangées de boutons sur lesquels les utilisateurs appuient eux-mêmes. L\'automatisation fonctionne beaucoup comme cela.\n\nC\'est une distinction qui importe, parce que ce type d\'automatisation arrive tout le temps. Au cours de ces 150 dernières années, les États-Unis sont passés d\'un pays de fermiers à un pays d\'ouvriers, pour finalement devenir un pays de cols blancs et d\'employés du tertiaire. Une grande partie de ces changements ont été dus à l\'automatisation du travail. Toutefois, même si les économies locales ont été perturbées et si les récessions ont entraîné des périodes de chômage, il n\'y a jamais eu de pénurie chronique et structurelle d\'emplois à l\'échelle nationale. Les nouvelles inventions créent de nouveaux marchés et, avec eux, de nouveaux emplois.\n\nLe scénario apocalyptique d\'un chômage de masse dû aux robots repose sur l\'hypothèse que la prochaine vague d\'automatisation technologique sera fondamentalement différente. On pense notamment que l\'intelligence artificielle avance si rapidement que les nouveaux emplois ne pourront pas suivre le rythme. Les gens en viennent à se demander si notre propre espèce, si fragile et imparfaite, sera nécessaire encore longtemps.\n\nPourtant, ce n\'est pas ce qu\'annoncent les prévisions. Le grand boom des prédictions de pertes d\'emplois dues aux robots remonte à 2013, époque à laquelle deux chercheurs de l\'université d\'Oxford estimèrent que 47% des emplois américains étaient «à risque» d\'être informatisés. Cette étude fut très largement citée, y compris dans un rapport officiel de la Maison-Blanche.', 'http://localhost:3000/uploads/1618988412227robots.jpeg', 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_date_update` datetime DEFAULT NULL,
  `user_first_name` varchar(50) NOT NULL,
  `user_last_name` varchar(50) NOT NULL,
  `user_job` varchar(100) NOT NULL,
  `user_state` tinyint(1) NOT NULL DEFAULT '0',
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`user_id`, `user_date_creation`, `user_date_update`, `user_first_name`, `user_last_name`, `user_job`, `user_state`, `user_email`, `user_password`) VALUES
(1, '2021-04-20 07:02:59', '2021-04-20 07:12:34', 'Chrystelle', 'Lebranche', 'Chargé de communication', 3, 'chrystelle.lebranche@gmail.com', '$2b$10$.J/WYEOUXaZxTgVpbOCjhOUWvtlgBN/DHRRJA3qCBrOc9oiU0.5de'),
(51, '2021-04-21 06:58:36', NULL, 'Omar ', 'Code', 'Développeur', 1, 'omar.code@gmail.com', '$2b$10$dvRn4GFjFyb/BzW6BSyMuOKhov7S1V7fqHbJ50NYFX837Y85qD.jK');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `FK_UserComment` (`user_id`),
  ADD KEY `FK_PostComment` (`post_id`);

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`like_id`),
  ADD KEY `FK_PostLike` (`post_id`),
  ADD KEY `FK_UserLike` (`user_id`);

--
-- Index pour la table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `posts_ibfk_1` (`user_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`user_email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT pour la table `likes`
--
ALTER TABLE `likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `FK_PostComment` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_UserComment` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `FK_PostLike` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_UserLike` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
