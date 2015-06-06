-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2015-06-05 10:47:30
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `todolist`
--

-- --------------------------------------------------------

--
-- 表的结构 `assign`
--

CREATE TABLE IF NOT EXISTS `assign` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `isdone` int(11) NOT NULL DEFAULT '0',
  `isimportant` int(11) NOT NULL DEFAULT '0',
  `start_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `end_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- 转存表中的数据 `assign`
--

INSERT INTO `assign` (`id`, `content`, `isdone`, `isimportant`, `start_time`, `end_time`) VALUES
(3, '11', 1, 0, '2015-06-04 14:36:17', '0000-00-00 00:00:00'),
(4, '11', 1, 1, '2015-06-04 14:37:56', '0000-00-00 00:00:00'),
(5, '121', 0, 1, '2015-06-04 14:38:12', '0000-00-00 00:00:00'),
(6, '131', 0, 1, '2015-06-04 14:39:04', '0000-00-00 00:00:00'),
(7, '121', 0, 1, '2015-06-04 14:39:04', '0000-00-00 00:00:00'),
(8, '131', 0, 1, '2015-06-04 14:40:44', '0000-00-00 00:00:00'),
(9, '121', 0, 1, '2015-06-04 14:40:44', '0000-00-00 00:00:00'),
(10, '131', 0, 1, '2015-06-04 15:04:20', '0000-00-00 00:00:00'),
(11, '121', 0, 1, '2015-06-04 15:04:20', '0000-00-00 00:00:00'),
(12, '131', 0, 1, '2015-06-05 05:47:02', '0000-00-00 00:00:00'),
(13, '121', 0, 1, '2015-06-05 05:47:03', '0000-00-00 00:00:00'),
(14, '131', 0, 1, '2015-06-05 05:47:07', '0000-00-00 00:00:00'),
(15, '121', 0, 1, '2015-06-05 05:47:07', '0000-00-00 00:00:00');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
