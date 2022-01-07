-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 24, 2021 at 05:17 AM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hojdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbladdress`
--

CREATE TABLE `tbladdress` (
  `address_id` int(11) NOT NULL,
  `stat_idlink` varchar(100) NOT NULL,
  `others` varchar(100) NOT NULL,
  `admission_date_idlink` int(11) NOT NULL,
  `prov_idlink` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tblbirthplace`
--

CREATE TABLE `tblbirthplace` (
  `res_idlink` int(11) NOT NULL,
  `address_idlink` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tblcategory`
--

CREATE TABLE `tblcategory` (
  `cat_id` int(11) NOT NULL,
  `description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbladmission_date`
--

CREATE TABLE `tbladmission_date` (
  `admission_date_id` int(11) NOT NULL,
  `description` varchar(100) NOT NULL,
  `prov_idlink` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tblcontact_person_address`
--

CREATE TABLE `tblcontact_person_address` (
  `cpi_idlink` int(11) NOT NULL,
  `address_idlink` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbldischarge_address`
--

CREATE TABLE `tbldischarge_address` (
  `discharge_idlink` int(11) NOT NULL,
  `address_idlink` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tblnationality`
--

CREATE TABLE `tblnationality` (
  `nationality_id` int(11) NOT NULL,
  `description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tblprevious_school_address`
--

CREATE TABLE `tblprevious_school_address` (
  `res_idlink` int(11) NOT NULL,
  `address_idlink` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tblprovince`
--

CREATE TABLE `tblprovince` (
  `prov_id` int(11) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tblreligion`
--

CREATE TABLE `tblreligion` (
  `religion_id` int(11) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tblresident`
--

CREATE TABLE `tblresident` (
  `res_id` int(11) NOT NULL,
  `fname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `mname` varchar(100) NOT NULL,
  `nickname` varchar(50) NOT NULL,
  `gender` int(1) NOT NULL DEFAULT '0',
  `birthdate` date NOT NULL,
  `nationality_idlink` int(10) NOT NULL DEFAULT '1',
  `religion_idlink` int(10) NOT NULL DEFAULT '1',
  `cat_idlink` int(10) NOT NULL,
  `stat_idlink` int(10) NOT NULL,
  `previous_school` varchar(255) NOT NULL,
  `others` varchar(255) NOT NULL,
  `admission_date` date NOT NULL,
  `isdischarged` int(1) NOT NULL DEFAULT '0',
  `notedby_accnt_idlink` int(10) NOT NULL,
  `preparedby_accnt_idlink` int(10) NOT NULL,
  `ddate_created/updated` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tblresident_address`
--

CREATE TABLE `tblresident_address` (
  `res_idlink` int(11) NOT NULL,
  `address_idlink` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tblstatus`
--

CREATE TABLE `tblstatus` (
  `stat_id` int(11) NOT NULL,
  `description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbladdress`
--
ALTER TABLE `tbladdress`
  ADD PRIMARY KEY (`address_id`);

--
-- Indexes for table `tblcategory`
--
ALTER TABLE `tblcategory`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indexes for table `tbladmission_date`
--
ALTER TABLE `tbladmission_date`
  ADD PRIMARY KEY (`admission_date_id`);

--
-- Indexes for table `tblnationality`
--
ALTER TABLE `tblnationality`
  ADD PRIMARY KEY (`nationality_id`);

--
-- Indexes for table `tblprovince`
--
ALTER TABLE `tblprovince`
  ADD PRIMARY KEY (`prov_id`);

--
-- Indexes for table `tblreligion`
--
ALTER TABLE `tblreligion`
  ADD PRIMARY KEY (`religion_id`);

--
-- Indexes for table `tblresident`
--
ALTER TABLE `tblresident`
  ADD PRIMARY KEY (`res_id`);

--
-- Indexes for table `tblstatus`
--
ALTER TABLE `tblstatus`
  ADD PRIMARY KEY (`stat_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbladdress`
--
ALTER TABLE `tbladdress`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblcategory`
--
ALTER TABLE `tblcategory`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbladmission_date`
--
ALTER TABLE `tbladmission_date`
  MODIFY `admission_date_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblnationality`
--
ALTER TABLE `tblnationality`
  MODIFY `nationality_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblprovince`
--
ALTER TABLE `tblprovince`
  MODIFY `prov_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblreligion`
--
ALTER TABLE `tblreligion`
  MODIFY `religion_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblresident`
--
ALTER TABLE `tblresident`
  MODIFY `res_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblstatus`
--
ALTER TABLE `tblstatus`
  MODIFY `stat_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
