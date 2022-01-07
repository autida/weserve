-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2021 at 09:42 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pghaidb`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblaccttype`
--

CREATE TABLE `tblaccttype` (
  `Type_Debit` varchar(10) NOT NULL DEFAULT 'Debit',
  `Type_Credit` varchar(10) NOT NULL DEFAULT 'Credit',
  `AcctDetails` varchar(50) NOT NULL DEFAULT 'ASSETS',
  `AcctSubGroup` varchar(50) NOT NULL DEFAULT 'CASH ON HAND'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblaccttype`
--

INSERT INTO `tblaccttype` (`Type_Debit`, `Type_Credit`, `AcctDetails`, `AcctSubGroup`) VALUES
('Debit', 'Credit', 'ASSETS', 'CASH ON HAND');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
