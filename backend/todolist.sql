-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2015-06-07 05:12:34
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
  `category` varchar(26) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=28 ;

--
-- 转存表中的数据 `assign`
--

INSERT INTO `assign` (`id`, `content`, `isdone`, `isimportant`, `start_time`, `end_time`, `category`) VALUES
(16, '131', 0, 1, '2015-06-05 10:32:12', '0000-00-00 00:00:00', 'work'),
(17, '121', 0, 1, '2015-06-05 10:32:12', '0000-00-00 00:00:00', 'person'),
(18, '131', 0, 1, '2015-06-05 15:11:08', '0000-00-00 00:00:00', 'person'),
(19, '121', 0, 1, '2015-06-05 15:11:08', '0000-00-00 00:00:00', 'person'),
(20, '131', 0, 1, '2015-06-05 15:11:31', '0000-00-00 00:00:00', 'person'),
(21, '121', 0, 1, '2015-06-05 15:11:31', '0000-00-00 00:00:00', 'person'),
(23, '121', 0, 1, '2015-06-05 15:14:12', '0000-00-00 00:00:00', 'person'),
(25, '121', 0, 1, '2015-06-05 15:15:04', '0000-00-00 00:00:00', 'person'),
(26, '考试', 0, 1, '2015-06-05 15:16:20', '0000-00-00 00:00:00', 'person'),
(27, '121', 0, 1, '2015-06-05 15:16:20', '0000-00-00 00:00:00', 'person');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
