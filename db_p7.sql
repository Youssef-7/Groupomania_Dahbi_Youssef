-- MySQL dump 10.13  Distrib 8.0.11, for Win64 (x86_64)
--
-- Host: localhost    Database: db_p7_projet
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `like_message`
--

DROP TABLE IF EXISTS `like_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `like_message` (
  `like_id` int(11) NOT NULL AUTO_INCREMENT,
  `like_u_id` int(11) NOT NULL,
  `like_p_id` int(11) NOT NULL,
  PRIMARY KEY (`like_id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like_message`
--

LOCK TABLES `like_message` WRITE;
/*!40000 ALTER TABLE `like_message` DISABLE KEYS */;
INSERT INTO `like_message` VALUES (85,96,159),(88,96,178);
/*!40000 ALTER TABLE `like_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_messages`
--

DROP TABLE IF EXISTS `post_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `post_messages` (
  `p_id` int(11) NOT NULL AUTO_INCREMENT,
  `p_parent` int(11) NOT NULL DEFAULT '1' COMMENT ' 0 = post originel, >0 = commentaire',
  `p_user_id` int(11) NOT NULL,
  `p_titre` varchar(50) NOT NULL,
  `p_text` text NOT NULL,
  `p_image_url` varchar(100) DEFAULT NULL,
  `p_date_published` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `p_moderation` int(11) NOT NULL DEFAULT '0' COMMENT ' 0 = no moderation, 1 = OK, 2 - warning, 3 - interdit',
  `p_like` int(11) DEFAULT NULL,
  PRIMARY KEY (`p_id`)
) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_messages`
--

LOCK TABLES `post_messages` WRITE;
/*!40000 ALTER TABLE `post_messages` DISABLE KEYS */;
INSERT INTO `post_messages` VALUES (155,0,96,'Lorem Ipsum','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula lorem vel libero tempus tempor. Morbi tellus libero, euismod a elit eu, cursus laoreet purus. Ut sed neque feugiat, vulputate sem eget, ultrices neque. Nunc eu tristique velit. Mauris eu mauris nisl. Aliquam ut vehicula nulla, eget malesuada nunc. ','images\\work-from-home_program_1200x630.jpg1665126494915.jpg','2022-10-07 09:08:14',0,1),(156,0,97,'Lorem Ipsum','Sed et vestibulum sapien, ac facilisis risus. Vivamus tincidunt metus elit, eu placerat erat aliquet sed. Morbi ultrices risus sit amet lectus pulvinar maximus. Nunc eu quam sed odio varius dapibus. Ut pellentesque rhoncus dolor, sed fermentum nulla porta ut. Cras mauris leo, scelerisque suscipit placerat nec, iaculis a tortor. Pellentesque suscipit, arcu id ultrices tincidunt, lacus ex tristique mi, eu accumsan turpis mi at nibh. Vestibulum egestas augue a orci ultricies blandit. Maecenas fringilla efficitur enim, ac luctus lectus blandit id. Nunc vel turpis id leo feugiat scelerisque. Nullam sed tincidunt urna. Proin venenatis tristique lectus et iaculis. Nullam placerat enim massa, pretium congue nisl mattis eget. Mauris ligula erat, imperdiet vitae eros sed, tristique congue nisl. Duis euismod fringilla neque, sit amet efficitur turpis gravida eu. Mauris pharetra porttitor nisi ac sodales. Aenean scelerisque sollicitudin gravida. Fusce arcu arcu, congue ut diam non, molestie fermentum magna. Curabitur tristique faucibus pretium. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut interdum suscipit dui, gravida elementum tellus congue a. Sed bibendum maximus dolor vel tincidunt. Integer sollicitudin nulla sem, in ullamcorper enim feugiat quis.','images\\laptop-home-office.webp1665126646408.undefined','2022-10-07 09:10:03',0,0),(159,0,99,'Nullam','Nullam feugiat ultricie','images\\images.jpg1665126962580.jpg','2022-10-07 09:16:02',0,1),(161,0,67,'','',NULL,'2022-10-07 10:36:20',0,1),(177,0,96,'testj','test',NULL,'2022-10-07 16:40:14',0,NULL),(178,0,96,'zdd','u',NULL,'2022-10-07 16:40:53',0,1),(179,0,96,'testj','test',NULL,'2022-10-07 16:51:16',0,0),(180,0,96,'testj','kkk',NULL,'2022-10-07 17:24:18',0,0);
/*!40000 ALTER TABLE `post_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usagers`
--

DROP TABLE IF EXISTS `usagers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `usagers` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_pseudo` varchar(30) NOT NULL,
  `u_email` varchar(50) NOT NULL,
  `u_pwd` varchar(100) NOT NULL,
  `u_role` int(1) NOT NULL DEFAULT '1' COMMENT ' 0 - moderateur, 1 - usager',
  `u_date_registered` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usagers`
--

LOCK TABLES `usagers` WRITE;
/*!40000 ALTER TABLE `usagers` DISABLE KEYS */;
INSERT INTO `usagers` VALUES (96,'j.Dupont','jeanDupont@hotmail.fr','$2b$10$p3MPUVdf0FFLyJe3Lker8ua9Sp.NKGn3B3egWnwg3Hful/5pDShGW',0,'2022-10-07 09:02:03'),(97,'mBernard','Marc.bernard@gmail.com','$2b$10$D6Fk2wHhmx.AHCknrgTcyeX8eC73luEjnb8UVdgzDOIciTL2qFnw6',0,'2022-10-07 09:09:19'),(98,'d.Dupuis','daniel.dupuis@hotmail.fr','$2b$10$PGDSLI8UQ99oblZHlgLY8egURYppMIVwh642N5n7JMxyvdI3T6mpq',0,'2022-10-07 09:12:08'),(99,'B.Dupond','bernard.dupond@gmail.com','$2b$10$oJjqJGGI80AntvGEe/SjIue3hp1Vs//aS3zZ5.1He9wFHsaGUiOSm',0,'2022-10-07 09:15:14'),(100,'M.Jean','Marcel.jean@gmail.com','$2b$10$qpmbvkD3tsJHqZ8EBkZ/MuzmzPPQTbOzgW0yOW6kbzV9o5yADMdqS',1,'2022-10-07 09:17:22');
/*!40000 ALTER TABLE `usagers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07 19:18:00
