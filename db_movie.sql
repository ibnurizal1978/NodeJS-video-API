-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 12, 2022 at 11:43 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_movie`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_log`
--

CREATE TABLE `tbl_log` (
  `log_id` int(11) NOT NULL,
  `log_action` varchar(50) NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=Aria DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_log`
--

INSERT INTO `tbl_log` (`log_id`, `log_action`, `notes`, `created_at`) VALUES
(1, 'CREATE', 'create new movie with title: Pancasona', '2022-09-11 02:21:02'),
(2, 'CREATE', 'create new movie with title: Pertarungan Iblis Merah', '2022-09-11 02:25:35'),
(3, 'CREATE', 'create new movie with title: Pendekar Bukit Tengkorak', '2022-09-11 02:28:14'),
(4, 'CREATE', 'create new movie with title: Malaikat Bayangan', '2022-09-11 02:35:26'),
(5, 'CREATE', 'create new movie with title: asd', '2022-09-11 02:55:51'),
(6, 'CREATE', 'create new movie with title: asd', '2022-09-11 02:57:59'),
(7, 'CREATE', 'create new movie with title: asd', '2022-09-11 03:02:46'),
(8, 'CREATE', 'create new movie with title: asd', '2022-09-11 03:03:40'),
(9, 'CREATE', 'create new movie with title: asd', '2022-09-11 03:04:00'),
(10, 'CREATE', 'update movie with movie ID: 6', '2022-09-11 03:04:29'),
(11, 'UPDATE MOVIE', 'update movie with movie ID: 6', '2022-09-11 03:05:05'),
(12, 'UPDATE MOVIE', 'update movie with movie ID: 6', '2022-09-11 03:06:52'),
(13, 'UPDATE MOVIE', 'update movie with movie ID: 4', '2022-09-11 03:07:04'),
(14, 'UPDATE MOVIE', 'update movie with movie ID: 4', '2022-09-11 03:07:15'),
(15, 'UPDATE MOVIE', 'update movie with movie ID: 4', '2022-09-11 03:07:27'),
(16, 'UPDATE MOVIE', 'update movie with movie ID: 4', '2022-09-11 03:07:39'),
(17, 'UPDATE MOVIE', 'update movie with movie ID: 4', '2022-09-11 03:16:31'),
(18, 'UPDATE MOVIE', 'update movie with movie ID: 4', '2022-09-11 03:17:02'),
(19, 'UPDATE MOVIE', 'update movie with movie ID: 8', '2022-09-11 03:17:11'),
(20, 'UPDATE MOVIE', 'update movie with movie ID: 8', '2022-09-11 03:17:12'),
(21, 'UPDATE MOVIE', 'update movie with movie ID: 8', '2022-09-11 03:17:13'),
(22, 'UPDATE MOVIE', 'update movie with movie ID: 8', '2022-09-11 03:19:37'),
(23, 'UPDATE MOVIE', 'update movie with movie ID: 8', '2022-09-11 03:20:20'),
(24, 'UPDATE MOVIE', 'update movie with movie ID: 8', '2022-09-11 03:20:44'),
(25, 'UPDATE MOVIE', 'update movie with movie ID: 8', '2022-09-11 03:23:01'),
(26, 'UPDATE MOVIE', 'update movie with movie ID: 8', '2022-09-11 03:24:35'),
(27, 'UPDATE MOVIE', 'update movie with movie ID: 8', '2022-09-11 03:24:51'),
(28, 'UPDATE MOVIE', 'update movie with movie ID: 8', '2022-09-11 03:44:05'),
(29, 'UPDATE MOVIE', 'update movie with movie ID: 8', '2022-09-11 03:44:29'),
(30, 'UPDATE MOVIE', 'update movie with movie ID: 8', '2022-09-11 03:44:30'),
(31, 'UPDATE MOVIE', 'update movie with movie ID: 8', '2022-09-11 03:44:55'),
(32, 'UPDATE MOVIE', 'update movie with movie ID: 8', '2022-09-11 03:49:44'),
(33, 'UPDATE MOVIE', 'update movie with movie ID: 8', '2022-09-11 03:52:44'),
(34, 'UPDATE MOVIE', 'update movie with movie ID: 8', '2022-09-11 03:53:33'),
(35, 'UPDATE MOVIE', 'update movie with movie ID: 8', '2022-09-11 03:56:39'),
(36, 'UPDATE MOVIE', 'update movie with movie ID: 8', '2022-09-11 04:00:34'),
(37, 'UPDATE MOVIE', 'update movie with movie ID: 8', '2022-09-11 04:00:59'),
(38, 'UPDATE MOVIE', 'update movie with movie ID: 8', '2022-09-11 04:01:17'),
(39, 'UPDATE MOVIE', 'update movie with movie ID: 8', '2022-09-11 04:01:50'),
(40, 'UPDATE MOVIE', 'update movie with movie ID: 4', '2022-09-11 04:02:14'),
(41, 'UPDATE MOVIE', 'update movie with movie ID: 4', '2022-09-11 04:02:15'),
(42, 'UPDATE MOVIE', 'update movie with movie ID: 4', '2022-09-11 04:02:17'),
(43, 'UPDATE MOVIE', 'update movie with movie ID: 4', '2022-09-11 04:02:55'),
(44, 'UPDATE MOVIE', 'update movie with movie ID: 8', '2022-09-11 04:03:07'),
(45, 'UPDATE MOVIE', 'update movie with movie ID: 8', '2022-09-11 04:03:13'),
(46, 'UPDATE MOVIE', 'update movie with movie ID: 8', '2022-09-11 04:04:34'),
(47, 'UPDATE MOVIE', 'update movie with movie ID: 4', '2022-09-11 04:04:46'),
(48, 'UPDATE MOVIE', 'update movie with movie ID: 4', '2022-09-11 04:05:37'),
(49, 'UPDATE MOVIE', 'update movie with movie ID: 4', '2022-09-11 04:05:55'),
(50, 'UPDATE MOVIE', 'update movie with movie ID: 4', '2022-09-11 04:06:15'),
(51, 'UPDATE MOVIE', 'update movie with movie ID: 4', '2022-09-11 04:18:10'),
(52, 'UPDATE MOVIE', 'update movie with movie ID: 88', '2022-09-11 05:17:14'),
(53, 'UPDATE MOVIE', 'update movie with movie ID: 88', '2022-09-11 05:17:34'),
(54, 'UPDATE MOVIE', 'update movie with movie ID: 88', '2022-09-11 05:17:51'),
(55, 'UPDATE MOVIE', 'update movie with movie ID: 88', '2022-09-11 05:18:06'),
(56, 'UPDATE MOVIE', 'update movie with movie ID: 88', '2022-09-11 05:18:30'),
(57, 'UPDATE MOVIE', 'update movie with movie ID: 88', '2022-09-11 05:18:42'),
(58, 'UPDATE MOVIE', 'update movie with movie ID: 88', '2022-09-11 05:18:58'),
(59, 'UPDATE MOVIE', 'update movie with movie ID: 88', '2022-09-11 05:19:23'),
(60, 'UPDATE MOVIE', 'update movie with movie ID: 88', '2022-09-11 05:21:34'),
(61, 'UPDATE MOVIE', 'update movie with movie ID: 88', '2022-09-11 05:21:45'),
(62, 'UPDATE MOVIE', 'update movie with movie ID: 88', '2022-09-11 05:22:36'),
(63, 'UPDATE MOVIE', 'update movie with movie ID: 88', '2022-09-11 05:22:59'),
(64, 'UPDATE MOVIE', 'update movie with movie ID: 88', '2022-09-11 05:23:16'),
(65, 'UPDATE MOVIE', 'update movie with movie ID: 88', '2022-09-11 05:23:17'),
(66, 'UPDATE MOVIE', 'update movie with movie ID: 4', '2022-09-11 05:23:20'),
(67, 'UPDATE MOVIE', 'update movie with movie ID: 8', '2022-09-11 05:23:23'),
(68, 'UPDATE MOVIE', 'update movie with movie ID: 4', '2022-09-11 05:25:29'),
(69, 'UPDATE MOVIE', 'update movie with movie ID: 4', '2022-09-11 05:25:47'),
(70, 'UPDATE MOVIE', 'update movie with movie ID: 5', '2022-09-11 05:25:50'),
(71, 'UPDATE MOVIE', 'update movie with movie ID: 5', '2022-09-11 06:04:51'),
(72, 'UPDATE MOVIE', 'update movie with movie ID: 5', '2022-09-11 06:07:26'),
(73, 'UPDATE MOVIE', 'update movie with movie ID: 5', '2022-09-11 06:08:02'),
(74, 'CREATE MOVIE', 'create new movie with title: Malam Satu Suro', '2022-09-11 06:15:57'),
(75, 'CREATE MOVIE', 'create new movie with title: Sundel Bolong', '2022-09-11 06:16:29'),
(76, 'UPDATE MOVIE', 'update movie with movie ID: 5', '2022-09-11 06:16:37'),
(77, 'USER REGISTER', 'user registration with username: user01', '2022-09-11 10:00:10'),
(78, 'USER REGISTER', 'user registration with username: user02', '2022-09-11 10:00:13'),
(79, 'USER REGISTER', 'user registration with username: user02', '2022-09-11 10:15:04'),
(80, 'USER LOGIN', 'user login with username: user02', '2022-09-11 10:16:05'),
(81, 'USER LOGIN', 'user login with username: user02', '2022-09-11 10:18:20'),
(82, 'USER LOGIN', 'user login with username: user02', '2022-09-11 10:26:03'),
(83, 'USER LOGIN', 'user login with username: user02', '2022-09-11 10:26:46'),
(84, 'USER LOGIN', 'user login with username: user02', '2022-09-11 10:27:17'),
(85, 'USER LOGIN', 'user login with username: user01', '2022-09-11 10:31:08'),
(86, 'USER LOGIN', 'user logout with username: user01', '2022-09-11 10:36:56'),
(87, 'USER LOGIN', 'user logout with username: user01', '2022-09-11 10:38:20'),
(88, 'USER LOGIN', 'user login with user_id: 1', '2022-09-11 10:48:31'),
(89, 'USER LOGIN', 'user login with user_id: 1', '2022-09-11 10:48:33'),
(90, 'USER LOGIN', 'user login with user_id: 1', '2022-09-11 10:48:34'),
(91, 'USER LOGIN', 'user login with user_id: 1', '2022-09-11 10:48:35'),
(92, 'USER LOGIN', 'user login with user_id: 1', '2022-09-11 10:49:07'),
(93, 'USER LOGIN', 'user login with user_id: 1', '2022-09-11 10:49:08'),
(94, 'USER LOGIN', 'user login with user_id: 1', '2022-09-11 10:49:09'),
(95, 'USER LOGIN', 'user login with user_id: 2', '2022-09-11 10:50:00'),
(96, 'USER LOGOUT', 'user logout with user_id: 2', '2022-09-11 10:51:11'),
(97, 'VOTE MOVIE', 'user vote with user_id: 1', '2022-09-11 10:56:09'),
(98, 'VOTE MOVIE', 'user vote with user_id: 1', '2022-09-11 10:56:11'),
(99, 'VOTE MOVIE', 'user vote with user_id: 1', '2022-09-11 10:56:55'),
(100, 'VOTE MOVIE', 'user vote with user_id: 1', '2022-09-11 10:56:56'),
(101, 'VOTE MOVIE', 'user vote with user_id: 1', '2022-09-11 10:57:26'),
(102, 'USER LOGIN', 'user login with user_id: 2', '2022-09-11 10:57:38'),
(103, 'VOTE MOVIE', 'user vote with user_id: 2', '2022-09-11 10:57:41'),
(104, 'UNVOTE MOVIE', 'user unvote with user_id: 2', '2022-09-12 05:13:07'),
(105, 'VOTE MOVIE', 'user vote with user_id: 2', '2022-09-12 05:14:11'),
(106, 'UNVOTE MOVIE', 'user start watch movie with user_id: 2 and movie_id: 3', '2022-09-12 07:27:13'),
(107, 'UNVOTE MOVIE', 'user start watch movie with user_id: 1 and movie_id: 3', '2022-09-12 07:27:30'),
(108, 'START MOVIE', 'user start watch movie with user_id: 1 and movie_id: 3', '2022-09-12 07:31:19'),
(109, 'START MOVIE', 'user start watch movie with user_id: 2 and movie_id: 3', '2022-09-12 07:31:46'),
(110, 'END MOVIE', 'user end watch movie with user_id: 1 and movie_id: 3', '2022-09-12 07:33:09'),
(111, 'END MOVIE', 'user end watch movie with user_id: 1 and movie_id: 3', '2022-09-12 07:36:53'),
(112, 'END MOVIE', 'user end watch movie with user_id: 1 and movie_id: 3', '2022-09-12 07:36:54'),
(113, 'END MOVIE', 'user end watch movie with user_id: 1 and movie_id: 3', '2022-09-12 07:37:20'),
(114, 'END MOVIE', 'user end watch movie with user_id: 2 and movie_id: 3', '2022-09-12 07:38:43'),
(115, 'START MOVIE', 'user start watch movie with user_id: 2 and movie_id: 3', '2022-09-12 07:53:12'),
(116, 'END MOVIE', 'user end watch movie with user_id: 2 and movie_id: 3', '2022-09-12 08:01:49'),
(117, 'START MOVIE', 'user start watch movie with user_id: 2 and movie_id: 3', '2022-09-12 08:02:40'),
(118, 'END MOVIE', 'user end watch movie with user_id: 2 and movie_id: 3', '2022-09-12 08:02:43'),
(119, 'START MOVIE', 'user start watch movie with user_id: 2 and movie_id: 3', '2022-09-12 08:02:58'),
(120, 'END MOVIE', 'user end watch movie with user_id: 2 and movie_id: 3', '2022-09-12 08:04:29'),
(121, 'START MOVIE', 'user start watch movie with user_id: 2 and movie_id: 3', '2022-09-12 08:05:06'),
(122, 'START MOVIE', 'user start watch movie with user_id: 2 and movie_id: 3', '2022-09-12 08:33:39'),
(123, 'END MOVIE', 'user end watch movie with user_id: 2 and movie_id: 3', '2022-09-12 08:36:11'),
(124, 'START MOVIE', 'user start watch movie with user_id: 2 and movie_id: 3', '2022-09-12 08:38:27'),
(125, 'END MOVIE', 'user end watch movie with user_id: 2 and movie_id: 3', '2022-09-12 08:38:41'),
(126, 'START MOVIE', 'user start watch movie with user_id: 2 and movie_id: 3', '2022-09-12 08:39:44'),
(127, 'START MOVIE', 'user start watch movie with user_id: 2 and movie_id: 3', '2022-09-12 08:41:31'),
(128, 'START MOVIE', 'user start watch movie with user_id: 2 and movie_id: 3', '2022-09-12 08:43:28'),
(129, 'START MOVIE', 'user start watch movie with user_id: 1 and movie_id: 2', '2022-09-12 08:56:06'),
(130, 'END MOVIE', 'user end watch movie with user_id: 1 and movie_id: 2', '2022-09-12 08:56:46');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_movie`
--

CREATE TABLE `tbl_movie` (
  `movie_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `artists` varchar(100) DEFAULT NULL,
  `genres` varchar(50) DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=Aria DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_movie`
--

INSERT INTO `tbl_movie` (`movie_id`, `title`, `description`, `duration`, `artists`, `genres`, `created_at`) VALUES
(1, 'Pancasona', 'Jaka Baruna berusaha menguasai ilmu sakti pancasona dari gurunya, Ki Baruna, untuk menghentikan kekacauan akibat ulah Reksa Dipa dan muridnya, Kangsa Legawa.', '5 jam', 'Barry Prima, Rudy Wahab, Sutrisno Wijaya', 'Action', '2022-09-11 02:21:02'),
(2, 'Pertarungan Iblis Merah', 'Markoni sudah insyaf dari dunia kejahatan dan hidup di lembah terpencil bersama istrinya. Namun kedamaiannya terusik ketika Karto, bekas komplotannya dulu, datang dan mengajaknya bergabung kembali.', '5 jam', 'Barry Prima, Advent Bangun', 'Action', '2022-09-11 02:24:56'),
(3, 'Pendekar Bukit Tengkorak', 'Ario Petak melihat Melati Merah, gadis pujaan hatinya, telah jatuh ke pelukan pendekar Macan Wulung. Demi mendapatkannya kembali, ia menantang Macan Wulung berduel hidup dan mati.', '7 jam', 'Barry Prima, Rita Sheba', 'Action', '2022-09-11 02:27:35'),
(4, 'Malaikat Bayangan', 'Malaikat Bayangan adalah film aksi laga dari Indonesia yang dirilis tahun 1988. Film ini disutradarai oleh Imam Tantowi dan dibintangi oleh Johan Mosdijk dan Tanty Aditianti.', '1 jam', 'Barry Prima, Johan Mosdijk, Tanty Aditianti, HIM Damsyik, Sutrisno Wijaya', 'Action', '2022-09-11 02:33:14'),
(5, 'Siluman Srigala Putih', 'Seorang pendekar muda diperalat untuk membunuh seorang perampok berbahaya berjuluk Serigala Putih. Kini, ia dituduh sebagai penipu dan harus berhadapan dengan pemimpin bandit keji, Jari Getih.', '11 jam', 'Barry Prima, Okky Olivia', 'Action', '2022-09-11 02:55:30'),
(6, 'Malam Satu Suro', 'Malam Satu Suro adalah film horor Indonesia tahun 1988 yang disutradarai oleh Sisworo Gautama Putra dan dibintangi oleh Suzzanna, Fendy Pradana, Johny Matakena, dan Nurnaningsih.', '3 jam', 'Suzzanna, Bokir', 'Horor', '2022-09-11 06:07:20'),
(7, 'Sundel Bolong', 'Sundelbolong adalah film horor Indonesia tahun 1981 yang disutradarai oleh Sisworo Gautama Putra dan diperankan oleh Suzzanna, Barry Prima, Rudy Salam, dan Ruth Pelupessy. Film ini adalah film pertama yang diangkat berdasarkan legenda rakyat.', '3 jam', 'Suzzanna, Barry Prima', 'Horor', '2022-09-11 06:07:20');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=Aria DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`user_id`, `username`, `password`, `full_name`, `created_at`) VALUES
(1, 'user01', '792708630185e516089d682849224d4f271eaf9127ae3b917cb677ff47bb754a', 'Mister Godeg', '2022-09-11 10:00:08'),
(2, 'user02', '792708630185e516089d682849224d4f271eaf9127ae3b917cb677ff47bb754a', 'Duo Maut', '2022-09-11 10:00:08');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user_session`
--

CREATE TABLE `tbl_user_session` (
  `user_session_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `session_id` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_user_session`
--

INSERT INTO `tbl_user_session` (`user_session_id`, `user_id`, `session_id`, `created_at`) VALUES
(3, 1, 'aad415a73c4cef1ef94a5c00b2642b571a3e5494536328ad960db61889bd9368', '2022-09-11 10:49:03'),
(7, 2, '76431fac8a187241af8f3f37156deb94732f52fb45eb07ec4f462051bd82f183', '2022-09-11 10:57:14');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_vote`
--

CREATE TABLE `tbl_vote` (
  `vote_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=Aria DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_vote`
--

INSERT INTO `tbl_vote` (`vote_id`, `user_id`, `movie_id`, `created_at`) VALUES
(1, 1, 2, '2022-09-11 10:56:53'),
(3, 1, 3, '2022-09-11 10:57:14'),
(5, 2, 3, '2022-09-12 05:14:07');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_watchtime`
--

CREATE TABLE `tbl_watchtime` (
  `watchtime_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `movie_session_id` varchar(255) NOT NULL,
  `start` time NOT NULL,
  `end` time DEFAULT NULL,
  `diff` varchar(10) DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=Aria DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_watchtime`
--

INSERT INTO `tbl_watchtime` (`watchtime_id`, `user_id`, `movie_id`, `movie_session_id`, `start`, `end`, `diff`, `created_at`) VALUES
(13, 2, 3, 'e29c9c180c6279b0b02abd6a1801c7c04082cf486ec027aa13515e4f3884bb6b', '08:00:00', '08:50:00', NULL, '2022-09-12 08:43:15'),
(14, 1, 3, 'e29c9c180c6279b0b02abd6a1801c7c04082cf486ec027aa13515e4f3884bb6b', '08:00:00', '08:30:00', NULL, '2022-09-12 08:43:15'),
(15, 1, 2, '6f4b6612125fb3a0daecd2799dfd6c9c299424fd920f9b308110a2c1fbd8f443', '08:10:00', '08:56:00', NULL, '2022-09-12 08:55:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_log`
--
ALTER TABLE `tbl_log`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `tbl_movie`
--
ALTER TABLE `tbl_movie`
  ADD PRIMARY KEY (`movie_id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `tbl_user_session`
--
ALTER TABLE `tbl_user_session`
  ADD PRIMARY KEY (`user_session_id`);

--
-- Indexes for table `tbl_vote`
--
ALTER TABLE `tbl_vote`
  ADD PRIMARY KEY (`vote_id`);

--
-- Indexes for table `tbl_watchtime`
--
ALTER TABLE `tbl_watchtime`
  ADD PRIMARY KEY (`watchtime_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_log`
--
ALTER TABLE `tbl_log`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT for table `tbl_movie`
--
ALTER TABLE `tbl_movie`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_user_session`
--
ALTER TABLE `tbl_user_session`
  MODIFY `user_session_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_vote`
--
ALTER TABLE `tbl_vote`
  MODIFY `vote_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_watchtime`
--
ALTER TABLE `tbl_watchtime`
  MODIFY `watchtime_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
