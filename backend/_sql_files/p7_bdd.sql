-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: p7_bdd
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `topic_messages`
--

DROP TABLE IF EXISTS `topic_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic_messages` (
  `tm_id` int NOT NULL AUTO_INCREMENT,
  `tm_parent` int NOT NULL COMMENT '0 = topic, >0 = réponses',
  `tm_title` varchar(50) NOT NULL,
  `tm_content` varchar(500) NOT NULL,
  `tm_posting_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tm_user_id` int NOT NULL,
  `tm_picture_url` varchar(100) DEFAULT NULL,
  `tm_moderation` int NOT NULL DEFAULT '0' COMMENT '0 = non modéré, 1 = accepté, 2 = refusé',
  PRIMARY KEY (`tm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic_messages`
--

LOCK TABLES `topic_messages` WRITE;
/*!40000 ALTER TABLE `topic_messages` DISABLE KEYS */;
INSERT INTO `topic_messages` VALUES (1,0,'Premier Topic','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla justo viverra, porta sapien ac, ultrices nisi. Integer malesuada, nibh tincidunt mattis semper, odio neque venenatis justo, vitae porta odio ex vitae nibh. Sed suscipit volutpat dui, ut finibus eros rhoncus non. Integer erat justo, cursus non enim quis, rhoncus.','2021-10-13 18:34:38',1,'images\\bird-cage.jpg1634142878350.jpg',1),(2,0,'Deuxième Topic','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla justo viverra, porta sapien ac, ultrices nisi. Integer malesuada, nibh tincidunt mattis semper, odio neque venenatis justo, vitae porta odio ex vitae nibh. Sed suscipit volutpat dui, ut finibus eros rhoncus non. Integer erat justo, cursus non enim quis, rhoncus.','2021-10-13 18:36:54',3,'images\\butterfly.jpg1634143013847.jpg',1),(3,1,'Premier Topic','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla justo viverra, porta sapien ac, ultrices nisi. Integer malesuada, nibh tincidunt mattis semper, odio neque venenatis justo, vitae porta odio ex vitae nibh. Sed suscipit volutpat dui, ut finibus eros rhoncus non. Integer erat justo, cursus non enim quis, rhoncus.','2021-10-13 18:37:05',3,'images\\field_tree.jpg1634143025112.jpg',2),(4,0,'Troisième Topic','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla justo viverra, porta sapien ac, ultrices nisi. Integer malesuada, nibh tincidunt mattis semper, odio neque venenatis justo, vitae porta odio ex vitae nibh. Sed suscipit volutpat dui, ut finibus eros rhoncus non. Integer erat justo, cursus non enim quis, rhoncus.','2021-10-13 18:37:48',2,'images\\flying_elephant.jpg1634143068203.jpg',1),(5,1,'Premier Topic','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla justo viverra, porta sapien ac, ultrices nisi. Integer malesuada, nibh tincidunt mattis semper, odio neque venenatis justo, vitae porta odio ex vitae nibh. Sed suscipit volutpat dui, ut finibus eros rhoncus non. Integer erat justo, cursus non enim quis, rhoncus.','2021-10-13 18:37:59',2,NULL,1),(6,2,'Deuxième Topic','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla justo viverra, porta sapien ac, ultrices nisi. Integer malesuada, nibh tincidunt mattis semper, odio neque venenatis justo, vitae porta odio ex vitae nibh. Sed suscipit volutpat dui, ut finibus eros rhoncus non. Integer erat justo, cursus non enim quis, rhoncus.','2021-10-13 18:38:07',2,'images\\montain.jpg1634143087849.jpg',1),(7,1,'Premier Topic','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla justo viverra, porta sapien ac, ultrices nisi. Integer malesuada, nibh tincidunt mattis semper, odio neque venenatis justo, vitae porta odio ex vitae nibh. Sed suscipit volutpat dui, ut finibus eros rhoncus non. Integer erat justo, cursus non enim quis, rhoncus.','2021-10-13 18:38:29',1,NULL,2),(8,2,'Deuxième Topic','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla justo viverra, porta sapien ac, ultrices nisi. Integer malesuada, nibh tincidunt mattis semper, odio neque venenatis justo, vitae porta odio ex vitae nibh. Sed suscipit volutpat dui, ut finibus eros rhoncus non. Integer erat justo, cursus non enim quis, rhoncus.','2021-10-13 18:38:39',1,'images\\NatureLandscape.jpg1634143119705.jpg',0),(9,4,'Troisième Topic','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla justo viverra, porta sapien ac, ultrices nisi. Integer malesuada, nibh tincidunt mattis semper, odio neque venenatis justo, vitae porta odio ex vitae nibh. Sed suscipit volutpat dui, ut finibus eros rhoncus non. Integer erat justo, cursus non enim quis, rhoncus.','2021-10-13 18:38:48',1,'images\\rose.jpg1634143128188.jpg',1),(10,4,'Troisième Topic','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla justo viverra, porta sapien ac, ultrices nisi. Integer malesuada, nibh tincidunt mattis semper, odio neque venenatis justo, vitae porta odio ex vitae nibh. Sed suscipit volutpat dui, ut finibus eros rhoncus non. Integer erat justo, cursus non enim quis, rhoncus.','2021-10-13 18:39:12',2,NULL,2),(11,1,'Premier Topic','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla justo viverra, porta sapien ac, ultrices nisi. Integer malesuada, nibh tincidunt mattis semper, odio neque venenatis justo, vitae porta odio ex vitae nibh. Sed suscipit volutpat dui, ut finibus eros rhoncus non. Integer erat justo, cursus non enim quis, rhoncus.','2021-10-13 18:39:39',2,'images\\sunset.jpg1634143179008.jpg',0);
/*!40000 ALTER TABLE `topic_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `u_id` int NOT NULL AUTO_INCREMENT,
  `u_pseudo` varchar(30) NOT NULL,
  `u_email` varchar(50) NOT NULL,
  `u_password` varchar(100) NOT NULL,
  `u_level` int NOT NULL DEFAULT '1' COMMENT 'niveau 0 = moderateur, niveau 1 = usager',
  `u_registration_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `u_pseudo` (`u_pseudo`),
  UNIQUE KEY `u_email` (`u_email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'userAAA','userAAA@gmail.com','$2b$10$YsDpwTY1hkSUga4rrS7x9OAtj6Y57ji7Bno1kAbH4/iWts14.EV0y',1,'2021-10-13 18:35:30'),(2,'userBBB','userBBB@gmail.com','$2b$10$ljN7eV3IM7jt18uW3kgmB.7lW3zub4aHQ6SAlxLyrrt.1ZEY/hGKC',1,'2021-10-13 18:35:47'),(3,'userCCC','userCCC@gmail.com','$2b$10$YvuXa.IgT6zbtL.LnOBe2ep14xP4EikoeOdwL969VOIjN1Q/kcdZu',1,'2021-10-13 18:36:06'),(4,'userAdmin','userAdmin@gmail.com','$2b$10$VjK2WnXstx3uYe4uZlTWkOoZiu4/s71ew30fbWoz0j7itDoAtiNhG',0,'2021-10-13 18:36:21');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-13 18:47:35
