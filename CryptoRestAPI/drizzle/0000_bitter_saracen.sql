-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE DATABASE `cryptorestapi`;

CREATE TABLE `cryptorestapi`.`cryptocurrency` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`symbol` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL);

CREATE TABLE `cryptorestapi`.`exchangerate` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`market` int,
	`cryptocurrency` int,
	`conversiontoUSD` float NOT NULL,
	`date` datetime NOT NULL);

CREATE TABLE `cryptorestapi`.`market` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(255) NOT NULL);

CREATE UNIQUE INDEX `symbol` ON `cryptocurrency` (`symbol`);
CREATE INDEX `market` ON `exchangerate` (`market`);
CREATE INDEX `cryptocurrency` ON `exchangerate` (`cryptocurrency`);
ALTER TABLE `exchangerate` ADD CONSTRAINT `exchangerate_ibfk_1` FOREIGN KEY (`market`) REFERENCES `market`(`id`) ON DELETE set null ON UPDATE no action;
ALTER TABLE `exchangerate` ADD CONSTRAINT `exchangerate_ibfk_2` FOREIGN KEY (`cryptocurrency`) REFERENCES `cryptocurrency`(`id`) ON DELETE set null ON UPDATE no action;
*/