-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: studioweb
-- ------------------------------------------------------
-- Server version	5.7.20-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contract`
--

DROP TABLE IF EXISTS `contract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contract` (
  `Contract_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Customer_ID` int(11) NOT NULL,
  `Studio_ID` int(11) NOT NULL,
  `Contract_Description` varchar(4000) DEFAULT NULL,
  `Contract_cDate` date NOT NULL,
  `Contract_sDate` date NOT NULL,
  `Contract_eDate` date NOT NULL,
  PRIMARY KEY (`Contract_ID`),
  KEY `Customer_ID` (`Customer_ID`),
  KEY `Studio_ID` (`Studio_ID`),
  CONSTRAINT `contract_ibfk_1` FOREIGN KEY (`Customer_ID`) REFERENCES `customer` (`Customer_ID`),
  CONSTRAINT `contract_ibfk_3` FOREIGN KEY (`Studio_ID`) REFERENCES `studio` (`Studio_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract`
--

LOCK TABLES `contract` WRITE;
/*!40000 ALTER TABLE `contract` DISABLE KEYS */;
/*!40000 ALTER TABLE `contract` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contractdetail`
--

DROP TABLE IF EXISTS `contractdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contractdetail` (
  `Contract_ID` int(11) NOT NULL,
  `Package_ID` int(11) NOT NULL,
  `ConDetail_PackName` varchar(255) DEFAULT NULL,
  `ConDetail_PackDetail` varchar(4000) NOT NULL,
  `ConDetail_Price` int(11) NOT NULL,
  `ConDetail_Note` text,
  KEY `Contract_ID` (`Contract_ID`),
  KEY `Package_ID` (`Package_ID`),
  CONSTRAINT `contractdetail_ibfk_1` FOREIGN KEY (`Contract_ID`) REFERENCES `contract` (`Contract_ID`),
  CONSTRAINT `contractdetail_ibfk_2` FOREIGN KEY (`Package_ID`) REFERENCES `package` (`Package_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contractdetail`
--

LOCK TABLES `contractdetail` WRITE;
/*!40000 ALTER TABLE `contractdetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `contractdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `Customer_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Customer_Name` varchar(255) NOT NULL,
  `Customer_Gender` varchar(10) NOT NULL,
  `Customer_Address` varchar(1000) NOT NULL,
  `Customer_Email` varchar(100) NOT NULL,
  `Customer_Number` varchar(20) NOT NULL,
  `Customer_Note` varchar(4000) NOT NULL,
  PRIMARY KEY (`Customer_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `district`
--

DROP TABLE IF EXISTS `district`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `district` (
  `District_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Province_ID` int(11) NOT NULL,
  `District_Name` varchar(100) NOT NULL,
  PRIMARY KEY (`District_ID`),
  KEY `Province_ID` (`Province_ID`),
  CONSTRAINT `district_ibfk_1` FOREIGN KEY (`Province_ID`) REFERENCES `province` (`Province_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=758 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `district`
--

LOCK TABLES `district` WRITE;
/*!40000 ALTER TABLE `district` DISABLE KEYS */;
INSERT INTO `district` VALUES (1,1,'Admin'),(5,1,'Quận Ba Đình'),(6,1,'Quận Bắc Từ Liêm'),(7,1,'Quận Hoàn Kiếm'),(8,1,'Quận Hai Bà Trưng'),(9,1,'Quận Cầu Giấy'),(10,1,'Quận Đống Đa'),(11,1,'Quận Thanh Xuân'),(12,1,'Quận Tây Hồ'),(13,1,'Quân Hoàng Mai'),(14,1,'Quận Long Biên'),(15,1,'Quận Hà Đông'),(16,1,'Huyện Ba Vì'),(17,1,'Huyện Đan Phượng'),(18,1,'Huyện Trương Mỹ'),(19,1,'Huyện Gia Lâm'),(20,1,'Huyện Hoài Đức'),(21,1,'Huyện Mê Linh'),(22,1,'Huyện Mỹ Đức'),(23,1,'Huyện Phú Xuyên'),(24,1,'Huyện Phú Thọ'),(25,1,'Huyện Quốc Oai'),(26,1,'Huyện Sóc Sơn'),(27,1,'Huyện Thạch Thất'),(28,1,'Huyện Thanh Oai'),(29,1,'Huyện Thanh Trì'),(30,1,'Huyện Thường Tín'),(31,1,'Quân Nam Từ Liêm'),(32,1,'Huyện Ứng Hòa'),(33,1,'Huyện Đông Anh'),(34,1,'Thành Phố Sơn Tây'),(35,2,'Quận 1'),(36,2,'Quận 2'),(37,2,'Quận 3'),(38,2,'Quận 4'),(39,2,'Quận 5'),(40,2,'Quận 6'),(41,2,'Quận 7'),(42,2,'Quận 8'),(43,2,'Quận 9'),(44,2,'Quận 10'),(45,2,'Quận 11'),(46,2,'Quận 12'),(47,2,'Quận Bình Tân'),(48,2,'Quận Bình Thạch'),(49,2,'Quận Gò Vấp'),(50,2,'Quận Phú Nhuận'),(51,2,'Quận Tân Bình'),(52,2,'Quận Tân Phú'),(53,2,'Quận Thủ Đức'),(54,2,'Huyện Bình Chánh'),(55,2,'Huyện Cần Giờ'),(56,2,'Quận Củ Chi'),(57,2,'Huyện Hóc Môn'),(58,2,'Huyện Nhà Bè'),(59,3,'Huyện Hoàng Sa'),(60,3,'Huyện Hòa Vang'),(61,3,'Quận Cẩm Lê'),(62,3,'Quận Hải Châu'),(63,3,'Quận Liên Chiểu'),(64,3,'Quận Ngũ Hành Sơn'),(65,3,'Quận Sơn Trà'),(66,3,'Quận Thanh Khê'),(67,4,'Huyện Cờ Đỏ'),(68,4,'Huyện Phong Điền'),(69,4,'Huyện Thới Lai'),(70,4,'Huyện Vĩnh Thạch'),(71,4,'Quận Bình Thủy'),(72,4,'Quận Cái Răng'),(73,4,'Quận Ninh Kiều'),(74,4,'Quận Ô Môn'),(75,4,'Quận Thốt Nốt'),(76,5,'Huyện Bạch Long Vĩ'),(77,5,'Quận Dương Kinh'),(78,5,'Huyện An Dương'),(79,5,'Huyện An Lão'),(80,5,'Huyện Cát Hải'),(81,5,'Huyện Kiến Thủy'),(82,5,'Huyện Thủy Nguyên'),(83,5,'Huyện Tiên Lãng'),(84,5,'Huyện Vĩnh Bảo'),(85,5,'Quận Hải An'),(86,5,'Quận Hồng Bàng'),(87,5,'Quận Kiến An'),(88,5,'Quận Lê Chân'),(89,5,'Quận Ngô Quyền'),(90,5,'Quận Đồ Sơn'),(91,6,'Huyện An Phú'),(92,6,'Huyện Châu Phú'),(93,6,'Huyện Châu Thành'),(94,6,'Huyện Chơ Mới'),(95,6,'Huyện Phú Tân'),(96,6,'Huyện Tân Châu'),(97,6,'Huyện Thoại Sơn'),(98,6,'Huyện Tịnh Biên'),(99,6,'Huyện Chi Tôn'),(100,6,'Thành Phố Long Xuyên'),(101,6,'Thị Xã Châu Đốc'),(102,7,'Huyện Châu Đức'),(103,7,'Huyện Côn Đảo'),(104,7,'Huyện Long Điền'),(105,7,'Huyện Tân Thành'),(106,7,'Huyện Xuyên Mộc'),(107,7,'Huyện Đất Đỏ'),(108,7,'Thành Phố Bà Rịa'),(109,7,'Thành Phố Vũng Tàu'),(110,8,'Huyện Lang Giang'),(111,8,'Huyện Lục Ngạn'),(112,8,'Huyện Yên Dũng'),(113,8,'Huyện Hiệp Hòa'),(114,8,'Huyện Lục Nam'),(115,8,'Huyện Sơn Đông'),(116,8,'Huyện Tân Yên'),(117,8,'Huyện Việt Yên'),(118,8,'Huyện Yên Thế'),(119,8,'Thành Phố Bắc Giang'),(120,9,'Huyện Bạch Thông'),(121,9,'Huyện Ba Bể'),(122,9,'Huyện Chợ Mới'),(123,9,'Huyện Chợ Đồn'),(124,9,'Huyện Na Rì'),(125,9,'Huyện Ngân Sơn'),(126,9,'Huyện Pác Nặm'),(127,9,'Thị Xã Bắc Cạn'),(128,10,'Huyện Giá Rai'),(129,10,'Huyện Hòa Bình'),(130,10,'Huyện Hồng Dân'),(131,10,'Huyện Phước Long'),(132,10,'Huyện Vĩnh Lợi'),(133,10,'Huyện Đông Hải'),(134,10,'Thành Phố Bạc Liêu'),(135,11,'Huyện Thuận Thành'),(136,11,'Huyện Gia Bình'),(137,11,'Huyện Lương Tài'),(138,11,'Huyện Quế Võ'),(139,11,'Huyện Tiên Du'),(140,11,'Huyện Yên Phong'),(141,11,'Thành Phố Bắc Ninh'),(142,11,'Thị Xã Từ Sơn'),(143,12,'Huyện Mỏ Cày Bắc'),(144,12,'Huyện Mỏ Cày Nam'),(145,12,'Huyện Ba Chi'),(146,12,'Huyện Bình Đại'),(147,12,'Huyện Châu Thành'),(148,12,'Huyện Chợ Lách'),(149,12,'Huyện Giồng Trôm'),(150,12,'Huyện Mỏ Cày'),(151,12,'Huyện Thạnh Phú'),(152,12,'Thành Phố Bến Tre'),(153,13,'Huyện Phù Mĩ'),(154,13,'Huyện Tầy Sơn'),(155,13,'Huyện An Lão'),(156,13,'Huyện Hoài Ân'),(157,13,'Huyện Hoài Nhơn'),(158,13,'Huyện Phù Cát'),(159,13,'Huyện Tuy Phước'),(160,13,'Huyện Vân Canh'),(161,13,'Huyện Vĩnh Thạch'),(162,13,'Thành Phố Quy Nhơn'),(163,13,'Thị Xã An Nhơn'),(164,14,'Huyện Bắc tân Uyên'),(165,14,'Huyện Bàu Bàng'),(166,14,'Huyện Bến Cát'),(167,14,'Huyện Dầu Tiếng'),(168,14,'Huyện Phú Dao'),(169,14,'Thị Xã Tan Uyên'),(170,14,'Thành Phỗ Thủ Dầu Một'),(171,14,'Thị Xã Dĩ An'),(172,14,'Thị Xã Thuận An'),(173,15,'Huyện Phú Riềng'),(174,15,'Thị Xã Bình Long'),(175,15,'Huyện Bù Gia Mập'),(176,15,'Huyện Bù Đăng'),(177,15,'Huyện Bù Đốp'),(178,15,'Huyện Chơn Thành'),(179,15,'Huyện Hớn Quản'),(180,15,'Huyện Lộc Ninh'),(181,15,'Huyện Đồng Phú'),(182,15,'Thị Xã Phước Long'),(183,15,'Thị Xã Đồng Xoài'),(184,16,'Thành Phố Phan Thiết'),(185,16,'Huyện Đảo Phú Quý'),(186,16,'Huyện Bắc Bình'),(187,16,'Huyện Hàm Tân'),(188,16,'Huyện Hàm Thuận Bắc'),(189,16,'Huyện Hàm Thuận Nam'),(190,16,'Huyện Phú Quý'),(191,16,'Huyện Tánh Linh'),(192,16,'Huyện Tuy Phong'),(193,16,'Huyện Đức Linh'),(194,16,'Thị Xã La Gi'),(195,17,'Huyện Cái Nước'),(196,17,'Huyện Năm Căn'),(197,17,'Huyện Ngọc Hiển'),(198,17,'Huyện Phú Tân'),(199,17,'Huyện Thới Bình'),(200,17,'Huyện Trần Văn Thời'),(201,17,'Huyện U Minh'),(202,17,'Huyện Đầm Dơi'),(203,17,'Thành Phố Cà Mau'),(204,18,'Huyện Hòa An'),(205,18,'Huyện Phục Hòa'),(206,18,'Huyện Bảo Lạc'),(207,18,'Huyện Bảo Lâm'),(208,18,'Huyện Hạ Lang'),(209,18,'Huyện Hà Quảng'),(210,18,'Huyện Nguyên Bình'),(211,18,'Huyện Quảng Uyên'),(212,18,'Huyện Thạch An'),(213,18,'Huyện Thông Nông'),(214,18,'Huyện Trà Lĩnh'),(215,18,'Huyện Trung Khánh'),(216,18,'Thành Phố Cao Bằng'),(217,19,'Huyện Đăk Nông'),(218,19,'Thành Phố Buôn Ma Thuật'),(219,19,'Thị Xã Buôn Hồ'),(220,19,'Huyện Cư Jút'),(221,19,'Huyện Đak Rlấp'),(222,19,'Huyện Krông Nô'),(223,19,'Huyện Krông Pắc'),(224,19,'Huyện Cư Kuin'),(225,19,'Huyện Buôn Đôn'),(226,19,'Huyện Cư M\'gar'),(227,19,'Huyện Đak Mil'),(228,19,'Huyện Ea Kar'),(229,19,'Huyện Ea H\'leo'),(230,19,'Huyện Ea Súp'),(231,19,'Huyện Krông Ana'),(232,19,'Huyện Krông Bông'),(233,19,'Huyện Krông Buk'),(234,19,'Huyện Krông Năng'),(235,19,'Huyện Lak'),(236,19,'Huyện M\'đrak'),(237,20,'Huyện Cư Jút'),(238,20,'Huyện Krông Nô'),(239,20,'Huyện Tư Đức'),(240,20,'Huyện Đắk Glong'),(241,20,'Huyện Đắk Mil'),(242,20,'Huyện Đắk R\'lấp'),(243,20,'Huyện Đắk Song'),(244,20,'Thĩ Xã Gia Nghĩa'),(245,21,'Huyên Điện Biên'),(246,21,'Huyên Mường Ảnh'),(247,21,'Huyên Mường Chà'),(248,21,'Huyên Mường Nhé'),(249,21,'Huyên Nậm Pồ'),(250,21,'Huyên Tủa Chùa'),(251,21,'Huyên Tuần Giáo'),(252,21,'Huyên Điện Biên Đông'),(253,21,'Thành Phố Điện Biên'),(254,21,'Thị Xã Mường Lay'),(255,22,'BC Hố Nai'),(256,22,'Huyên Cẩm Mỹ'),(257,22,'Huyên Long thành'),(258,22,'Huyên Nhơn Trạch'),(259,22,'Huyên Tân Phú'),(260,22,'Huyên Thống Nhất'),(261,22,'Huyên Trảng Bom'),(262,22,'Huyên Vĩnh Cửu'),(263,22,'Huyên Xuân Lộc'),(264,22,'Huyên Định Quán'),(265,22,'Thành Phố Biên Hòa'),(266,22,'Thị Xã Long Khánh'),(267,23,'Thị Xã Hồng Ngự'),(268,23,'Huyện Cao Lãnh'),(269,23,'Huyên Châu Thành'),(270,23,'Huyên Lai Vung'),(271,23,'Huyên Lấp Vò'),(272,23,'Huyên Tam Nông'),(273,23,'Huyên Tân Hồng'),(274,23,'Huyên Thanh Bình'),(275,23,'Huyên Tháp Mười'),(276,23,'thành Phố Cao Lãnh'),(277,23,'Thị Xã Sa Đéc'),(278,23,'Huyện Hồng Ngự'),(279,24,'Huyên Chư Păh'),(280,24,'Huyên Chư Prông'),(281,24,'Huyên Chư Pưh'),(282,24,'Huyên Chư Sê'),(283,24,'Huyên la Grai'),(284,24,'Huyên la Pa'),(285,24,'Huyên Kbang'),(286,24,'Huyên Kông Chro'),(287,24,'Huyên Krông Pa'),(288,24,'Huyên Mang Yang'),(289,24,'Huyên Phú Thiện'),(290,24,'Huyên Đak Pơ'),(291,24,'Huyên Đắk Đoa'),(292,24,'Huyên Đức Cơ'),(293,24,'Thành Phố Pleiku'),(294,24,'Thị Xã An Khê'),(295,24,'Thị Xã Ayun Pa'),(296,25,'Huyên Bắc Mê'),(297,25,'Huyên Bắc Quang'),(298,25,'Huyên Hoang Su vì'),(299,25,'Huyên Mèo Vạc'),(300,25,'Huyên Quản Bạ'),(301,25,'Huyên Quang Bình'),(302,25,'Huyên Vị Xuyên'),(303,25,'Huyên Xín Mần'),(304,25,'Huyên Yên Minh'),(305,25,'Huyên Đồng Văn'),(306,25,'Thành Phố Hà Giang'),(307,26,'Huyên Bình Lục'),(308,26,'Huyên Duy Tiên'),(309,26,'Huyên Kim Bảng'),(310,26,'Huyên Lý Nhân'),(311,26,'Huyên Thanh Liêm'),(312,26,'Thành Phố Phủ Lý'),(313,27,'Huyên Cẩm Xuyên'),(314,27,'Huyên Vũ Quang'),(315,27,'Huyên Can Lộc'),(316,27,'Huyên Hương Khê'),(317,27,'Huyên Hương Sơn'),(318,27,'Huyên Kỳ Anh'),(319,27,'Huyên Lộc Hà'),(320,27,'Huyên Nghi Xuân'),(321,27,'Huyên Thạch Hà'),(322,27,'Huyên Đức Thọ'),(323,27,'Thành Phố Hà Tĩnh'),(324,27,'Thị Xã Hồng Lĩnh'),(325,28,'Huyên Bình Quang'),(326,28,'Huyên Gia Lộc'),(327,28,'Huyên Cẩm Giàng'),(328,28,'Huyên Kim Thành'),(329,28,'Huyên Kinh Môn'),(330,28,'Huyên Nam Sách'),(331,28,'Huyên Ninh Giang'),(332,28,'Huyên Thanh Hà'),(333,28,'Huyên Thanh Miện'),(334,28,'Huyên Tứ Kỳ'),(335,28,'Thành Phố Hải Dương'),(336,28,'Thị Xã Chí Linh'),(337,29,'Huyên Châu Thành'),(338,29,'Huyên Châu Thành A'),(339,29,'Huyên Long Mỹ'),(340,29,'Huyên Phụng Hiệp'),(341,29,'Huyên Vị Thủy'),(342,29,'Thành Phố Vị Thành'),(343,29,'Thĩ Xã Ngã Bảy'),(344,30,'Huyên Cao Phong'),(345,30,'Huyên Kim Bôi'),(346,30,'Huyên Kỳ Sơn'),(347,30,'Huyên Lạc Sơn'),(348,30,'Huyên Lạc Thủy'),(349,30,'Huyên Lương Sơn'),(350,30,'Huyên Mai Châu'),(351,30,'Huyên Tân Lạc'),(352,30,'Huyên Yên Thủy'),(353,30,'Huyên Đà Bắc'),(354,30,'Thành Phố Hòa Bình'),(355,31,'Huyên Phù Cứ'),(356,31,'Huyên Ân Thi'),(357,31,'Huyên Khoái Châu'),(358,31,'Huyên Kim Động'),(359,31,'Huyên Mỹ Hào'),(360,31,'Huyên Tiên Lữ'),(361,31,'Huyên Văn Giang'),(362,31,'Huyên Văn Lâm'),(363,31,'Huyên Yên Mỹ'),(364,31,'Thành Phố Hưng Yên'),(365,32,'Huyên Khánh Sơn'),(366,32,'Huyên Trường Sa'),(367,32,'Huyên Cam Lâm'),(368,32,'Huyên Diên Khánh'),(369,32,'Huyên Khánh Vĩnh'),(370,32,'Huyên Ninh Hòa'),(371,32,'Huyên Vạn Ninh'),(372,32,'Thành Phố Cam Gianh'),(373,32,'Thành Phố Nha Trang'),(374,33,'Huyên Giồng Giềng'),(375,33,'Huyên Gò Cao'),(376,33,'Huyên An Biên'),(377,33,'Huyên An Minh'),(378,33,'Huyên Châu Thành'),(379,33,'Huyên Giàn Thành'),(380,33,'Huyên Hòn Đất'),(381,33,'Huyên Kiên Hải'),(382,33,'Huyên Kiên Lương'),(383,33,'Huyên Phú Quốc'),(384,33,'Huyên Tân Hiệp'),(385,33,'Huyên U Minh Thượng'),(386,33,'Huyên Vĩnh Thuận'),(387,33,'Thành Phố Rạch Giá'),(388,33,'Thị Xã Hà Tiền'),(389,34,'Huyên Đak Glêi'),(390,34,'Huyên Đak Hà'),(391,34,'Huyên Đak Tô'),(392,34,'Huyên la HDrai'),(393,34,'Huyên Kon Plong'),(394,34,'Huyên Kon Rẫy'),(395,34,'Huyên Ngọc Hồi'),(396,34,'Huyên Sa Thầy'),(397,34,'Huyên Tu Mơ Rông'),(398,34,'Thành Phố Kon Tum'),(399,35,'Huyên Nậm Nhùn'),(400,35,'Huyên Mường Tè'),(401,35,'Huyên Phong Thổ'),(402,35,'Huyên Sìn Hồ'),(403,35,'Huyên Tam Đường'),(404,35,'Huyên Tam Uyên'),(405,35,'Thị Xã Lai Châu'),(406,36,'Huyên Cát Tiên'),(407,36,'Huyên Bảo Lâm'),(408,36,'Huyên Di Linh'),(409,36,'Huyên Lạc Dương'),(410,36,'Huyên Lâm Hà'),(411,36,'Huyên Đạ Huoai'),(412,36,'Huyên Đa Tẻh'),(413,36,'Huyên Đam Rông'),(414,36,'Huyên Đơn Dương'),(415,36,'Huyên Đức Trọng'),(416,36,'Thành Phố Bảo Lộc'),(417,36,'Thành Phố Đà Lạt'),(418,37,'Huyên Chi Lăng'),(419,37,'Huyên Tràng Định'),(420,37,'Huyên Đình Lập'),(421,37,'Huyên Bắc Sơn'),(422,37,'Huyên Bình Gia'),(423,37,'Huyên Cao Lộc'),(424,37,'Huyên Hữu Lũng'),(425,37,'Huyên Lộc Bình'),(426,37,'Huyên Văn Lãng'),(427,37,'Huyên Văn Quan'),(428,37,'Thành Phố Lạng Sơn'),(429,38,'Huyên Bắc Hà'),(430,38,'Huyên Bảo Thắng'),(431,38,'Huyên Bảo Yên'),(432,38,'Huyên Bát xát'),(433,38,'Huyên Mường Khương'),(434,38,'Huyên Sa Pa'),(435,38,'Huyên Si Ma Cai'),(436,38,'Huyên Văn Bàn'),(437,38,'Thành Phố Lào Cai'),(438,63,'Huyên Kiến Tường'),(439,63,'Huyên Bến Lức'),(440,63,'Huyên Cần Giuộc'),(441,63,'Huyên Cần Đước'),(442,63,'Huyên Châu Thành'),(443,63,'Huyên Mộc Hóa'),(444,63,'Huyên Tân Hưng'),(445,63,'Huyên Tân Thạnh'),(446,63,'Huyên Tân Trụ'),(447,63,'Huyên Thạnh Hóa'),(448,63,'Huyên Thủ Thừa'),(449,63,'Huyên Vĩnh Hưng'),(450,63,'Huyên Đức Hòa'),(451,63,'Huyên Đức Huệ'),(452,63,'Thành Phố Tân An'),(453,39,'Huyên Nam Trực'),(454,39,'Huyên Vụ Bản'),(455,39,'Huyên Giao Thủy'),(456,39,'Huyên Hai Hậu'),(457,39,'Huyên Mỹ Lộc'),(458,39,'Huyên Nghĩa Hưng'),(459,39,'Huyên Trực Ninh'),(460,39,'Huyên Xuân Trường'),(461,39,'Huyên Ý Yên'),(462,39,'Thành Phố Nam Định'),(463,40,'Thị Xã Hoàng Mai'),(464,40,'Huyên Anh Sơn'),(465,40,'Huyên Con Cuông'),(466,40,'Huyên Diễn Châu'),(467,40,'Huyên Hưng Nguyên'),(468,40,'Huyên Kỳ Sơn'),(469,40,'Huyên Nam Đàn'),(470,40,'Huyên Nghi Lộc'),(471,40,'Huyên Nghĩa Đàn'),(472,40,'Huyên Quế Phong'),(473,40,'Huyên Kỳ Châu'),(474,40,'Huyên Quỳ Hợp'),(475,40,'Huyên Quỳnh Lưu'),(476,40,'Huyên Tân Kỳ'),(477,40,'Huyên Thanh Chương'),(478,40,'Huyên Tương Dương'),(479,40,'Huyên Yên Thành'),(480,40,'Huyên Đô Lương'),(481,40,'Thành Phố Vinh'),(482,40,'Thị Xã Cửa Lò'),(483,40,'Thị Xã Thái Hòa'),(484,41,'Huyên Gia Viễn'),(485,41,'Huyên Hoa Lư'),(486,41,'Huyên Kim Sơn'),(487,41,'Huyên Nho Quan'),(488,41,'Huyên Yên Khánh'),(489,41,'Huyên Yên Mô'),(490,41,'Thành Phố Ninh Bình'),(491,41,'Thị Xã Tam Hiệp'),(492,42,'Huyên Bắc Ái'),(493,42,'Huyên Ninh Hải'),(494,42,'Huyên Ninh Phước'),(495,42,'Huyên Ninh Sơn'),(496,42,'Huyên Thuận Bắc'),(497,42,'Huyên Thuận Nam'),(498,42,'Thành Phố Phan Rang'),(499,43,'Huyên Cẩm Khê'),(500,43,'Huyên Hạ Hòa'),(501,43,'Huyên Lâm Thao'),(502,43,'Huyên Phù Ninh'),(503,43,'Huyên Tam Nông'),(504,43,'Huyên Tân Sơn'),(505,43,'Huyên Thanh Ba'),(506,43,'Huyên Thanh Sơn'),(507,43,'Huyên Thanh Thủy'),(508,43,'Huyên Yên Lập'),(509,43,'Huyên Đoan Hùng'),(510,43,'Thành Phố Việt Trì'),(511,43,'Thị Xã Phú Thọ'),(512,44,'Huyên Phú Hòa'),(513,44,'Huyên Sơn Hòa'),(514,44,'Huyên Sông Hinh'),(515,44,'Huyên Tây Hòa'),(516,44,'Huyên Tuy An'),(517,44,'Huyên Đông Hòa'),(518,44,'Huyên Đồng Xuân'),(519,44,'Thành Phố Tuy Hòa'),(520,44,'Thị Xã Sông Cầu'),(521,45,'Thị Xã Ba Đồn'),(522,45,'Huyên Bố Trạch'),(523,45,'Huyên Lệ Thủy'),(524,45,'Huyên Minh Hóa'),(525,45,'Huyên Quảng Ninh'),(526,45,'Huyên Quảng Trạch'),(527,45,'Huyên Tuyên Quang'),(528,45,'Thành Phố Đồng Hới'),(529,46,'Huyên Phú Ninh'),(530,46,'Bưu Cục khu kinh tế mở Chu Lai'),(531,46,'Huyên Núi Thành'),(532,46,'Huyên Bắc trà Mi'),(533,46,'Huyên Duy Xuyên'),(534,46,'Huyên Hiệp Đức'),(535,46,'Huyên Nam Giang'),(536,46,'Huyên Nam Trà My'),(537,46,'Huyên Nông Sơn'),(538,46,'Huyên Phước Sơn'),(539,46,'Huyên Quế Sơn'),(540,46,'Huyên Tây Giang'),(541,46,'Huyên Thăng Bình'),(542,46,'Huyên Tiên Phước'),(543,46,'Huyên Đại Lộc'),(544,46,'Huyên Điện Bàn'),(545,46,'Huyên Đông Giang'),(546,46,'Thành Phố Hội An'),(547,46,'Thành Phố Tam Kỳ'),(548,47,'Huyên Tây Trà'),(549,47,'Huyên Ba Tơ'),(550,47,'Huyên Bình Sơn'),(551,47,'Huyên Lý Sơn'),(552,47,'Huyên Minh Long'),(553,47,'Huyên Mộ Đức'),(554,47,'Huyên Nghĩa Thành'),(555,47,'Huyên Sơn Hà'),(556,47,'Huyên Sơn Tây'),(557,47,'Huyên Sơn Tịnh'),(558,47,'Huyên Trà Bông'),(559,47,'Huyên Tư Nghĩa'),(560,47,'Huyên Đức Phổ'),(561,47,'Thành Phố Quảng Ngãi'),(562,48,'Huyên Ba Trẽ'),(563,48,'Huyên Bình Liêu'),(564,48,'Huyên Cô Tô'),(565,48,'Huyên Hải Hà'),(566,48,'Huyên Hoành Bồ'),(567,48,'Huyên Tiên Yên'),(568,48,'Huyên Vân Đồn'),(569,48,'Huyên Đầm Hà'),(570,48,'Huyên Đâm Triều'),(571,48,'Thành Phố Cẩm Phả'),(572,48,'Thành Phố Hạ Lọng'),(573,48,'Thành Phố Móng Cái'),(574,48,'Thành Phố Uông Bí'),(575,48,'Thị Xã Quảng Yên'),(576,49,'Huyên Cồn Cỏ'),(577,49,'Huyên Cam Lộ'),(578,49,'Huyên Gio Linh'),(579,49,'Huyên Hải Lăng'),(580,49,'Huyên Hướng Hòa'),(581,49,'Huyên Triệu Phong'),(582,49,'Huyên Vĩnh Linh'),(583,49,'Huyên Đakrông'),(584,49,'Thành Phố Đông Hà'),(585,49,'Thị Xã Quảng Tri'),(586,50,'Huyên Mỹ Tú'),(587,50,'Huyên Đại Nghĩa'),(588,50,'Huyên Châu Thành'),(589,50,'Huyên Cù Lao Dung'),(590,50,'Huyên Kế Sách'),(591,50,'Huyên Long Phú'),(592,50,'Huyên Mỹ Xuyên'),(593,50,'Huyên Ngã Năm'),(594,50,'Huyên Thạnh Trị'),(595,50,'Huyên Trần Đề'),(596,50,'Thành Phố Sóc Trăng'),(597,50,'Thị Xã Vĩnh Châu'),(598,51,'Huyên Văn Hồ'),(599,51,'Huyên Bắc Yên'),(600,51,'Huyên Mai Sơn'),(601,51,'Huyên Mộc Châu'),(602,51,'Huyên Mường La'),(603,51,'Huyên Phù Yên'),(604,51,'Huyên Quỳnh Nhai'),(605,51,'Huyên Sông Mã'),(606,51,'Huyên Sốp Cộp'),(607,51,'Huyên Thuận Châu'),(608,51,'Huyên Yên Châu'),(609,51,'Thành Phố Sơn La'),(610,52,'Huyên Bến Cầu'),(611,52,'Huyên Châu Thành'),(612,52,'Huyên Dương Minh Châu'),(613,52,'Huyên Gò Dầu'),(614,52,'Huyên Hòa Thành'),(615,52,'Huyên Tân Biên'),(616,52,'Huyên Tân Châu'),(617,52,'Huyên Tràng Bàng'),(618,52,'Thị Xã Tây Ninh'),(619,53,'Huyên Tiền Hải'),(620,53,'Huyên Hưng Hà'),(621,53,'Huyên Kiến Xương'),(622,53,'Huyên Quỳnh Phụ'),(623,53,'Huyên Thái Thụy'),(624,53,'Huyên Vũ Thư'),(625,53,'Huyên Đông Hưng'),(626,53,'Thành Phố Thái Bình'),(627,54,'Huyên Phú Bình'),(628,54,'Huyên Phổ Yên'),(629,54,'Huyên Phú Lương'),(630,54,'Huyên Võ Nhai'),(631,54,'Huyên Đại Từ'),(632,54,'Huyên Định Hóa'),(633,54,'Huyên Đồng Hỷ'),(634,54,'Thành Phố Thái Nguyên'),(635,54,'Thị Xã Sông Công'),(636,55,'Huyên Đông Sơn'),(637,55,'Huyên Bá Thước'),(638,55,'Huyên Cảm Thủy'),(639,55,'Huyên Hà Trung'),(640,55,'Huyên Hậu Lộc'),(641,55,'Huyên Hoằng Hóa'),(642,55,'Huyên Lang Tránh'),(643,55,'Huyên Mường Lát'),(644,55,'Huyên Nga Sơn'),(645,55,'Huyên Ngọc Lặc'),(646,55,'Huyên Như Thanh'),(647,55,'Huyên Như Xuân'),(648,55,'Huyên Nông Cống'),(649,55,'Huyên Quan Hóa'),(650,55,'Huyên Quan Sơn'),(651,55,'Huyên Quảng Xương'),(652,55,'Huyên Thạch Thành'),(653,55,'Huyên Thiệu Hóa'),(654,55,'Huyên Thọ Xuân'),(655,55,'Huyên Thường Xuân'),(656,55,'Huyên Tĩnh Gia'),(657,55,'Huyên Triệu Sơn'),(658,55,'Huyên Vĩnh Lộc'),(659,55,'Huyên Yên Định'),(660,55,'Thành Phố Thanh Hóa'),(661,55,'Thị Xã Bỉm Sơn'),(662,55,'Thị Xã Sầm Sơn'),(663,56,'Huyên Phong Điền'),(664,56,'Huyên A Lưới'),(665,56,'Huyên Nam Đông'),(666,56,'Huyên Phú Lộc'),(667,56,'Huyên Phú Vang'),(668,56,'Huyên Quảng Điền'),(669,56,'Thị Xã Hương Thủy'),(670,56,'Thị Xã Hương Trà'),(671,56,'Thành Phố Huế'),(672,57,'Huyên Cài Lầy'),(673,57,'Huyên An Hữu'),(674,57,'Huyên Cái Bè'),(675,57,'Huyên Châu Thành'),(676,57,'Huyên Chợ Gạo'),(677,57,'Huyên Gò Công Tây'),(678,57,'Huyên Gò Công Đông'),(679,57,'Huyên Tân Phú Đông'),(680,57,'Huyên Tân Phước'),(681,57,'Thành Phố Mỹ Tho'),(682,57,'Thị Xã Gò Công'),(683,58,'Huyên Càng Long'),(684,58,'Huyên Cầu Kè'),(685,58,'Huyên Cầu Ngang'),(686,58,'Huyên Châu Thành'),(687,58,'Huyên Duyên Hải'),(688,58,'Huyên Tiểu Cần'),(689,58,'Huyên Trà Cú'),(690,58,'Thành Phố Trà Vinh'),(691,59,'Huyên Chiêm Hóa'),(692,59,'Huyên Trà Yên'),(693,59,'Huyên Lâm Bình'),(694,59,'Huyên Na Hang'),(695,59,'Huyên Sơn Dương'),(696,59,'Huyên Yên Sơn'),(697,59,'Thành Phố Tuyên Quang'),(698,60,'Huyên Bình Minh'),(699,60,'Huyên Vũng Liêm'),(700,60,'Huyên Bìn Tân'),(701,60,'Huyên Long Hồ'),(702,60,'Huyên Mang Thít'),(703,60,'Huyên Tam Bình'),(704,60,'Huyên Trà Ôn'),(705,60,'Thành Phố Vĩnh Long'),(706,61,'Huyên Mê Linh'),(707,61,'Huyên Tam Đảo'),(708,61,'Huyên Bình Xuyên'),(709,61,'Huyên Lập Thạch'),(710,61,'Huyên Sông Lô'),(711,61,'Huyên Tam Dương'),(712,61,'Huyên Vĩnh Tường'),(713,61,'Huyên Yên Lạc'),(714,61,'Thành Phố Vĩnh Yên'),(715,61,'Thị Xã Phúc Yên'),(716,62,'Huyên Lục Yên'),(717,62,'Huyên Mù Cang Chải'),(718,62,'Huyên Trạm Tấu'),(719,62,'Huyên Trấn Yên'),(720,62,'Huyên Văn Chấn'),(721,62,'Huyên Văn Yên'),(722,62,'Huyên Yên Bình'),(723,62,'Thàn Phố Yên Bái'),(724,62,'Thị Xã Nghĩa Lộ'),(729,1,'Quận Admin');
/*!40000 ALTER TABLE `district` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package`
--

DROP TABLE IF EXISTS `package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `package` (
  `Package_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Package_Name` varchar(255) NOT NULL,
  `Package_Detail` varchar(4000) NOT NULL,
  `Package_Price` varchar(255) NOT NULL,
  PRIMARY KEY (`Package_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package`
--

LOCK TABLES `package` WRITE;
/*!40000 ALTER TABLE `package` DISABLE KEYS */;
INSERT INTO `package` VALUES (2,'testUpdate','TEST SUCCESSFUL','1234'),(5,'test2','test22222','100000000'),(6,'test2','asdasd','100000000'),(8,'test3','asdasd','100000000'),(15,'test','this package is for testing','100000000'),(16,'testing 123','asdasd','11111');
/*!40000 ALTER TABLE `package` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `picture`
--

DROP TABLE IF EXISTS `picture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `picture` (
  `Picture_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Picture_Detail` varchar(4000) DEFAULT NULL,
  `Picture_Url` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`Picture_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `picture`
--

LOCK TABLES `picture` WRITE;
/*!40000 ALTER TABLE `picture` DISABLE KEYS */;
/*!40000 ALTER TABLE `picture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `printingmaterial`
--

DROP TABLE IF EXISTS `printingmaterial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `printingmaterial` (
  `Material_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Material_Name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Material_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `printingmaterial`
--

LOCK TABLES `printingmaterial` WRITE;
/*!40000 ALTER TABLE `printingmaterial` DISABLE KEYS */;
INSERT INTO `printingmaterial` VALUES (1,'Paper'),(2,'SHIT NO 1'),(3,'Plastic');
/*!40000 ALTER TABLE `printingmaterial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `printmaterialprice`
--

DROP TABLE IF EXISTS `printmaterialprice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `printmaterialprice` (
  `MaterialPrice_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Material_id` int(11) NOT NULL,
  `MaterialPrice_Quantity` int(11) NOT NULL,
  `MaterialPrice_Size` varchar(4000) NOT NULL,
  `MaterialPrice_Price` int(11) NOT NULL,
  PRIMARY KEY (`MaterialPrice_ID`),
  KEY `Material_id` (`Material_id`),
  CONSTRAINT `printmaterialprice_ibfk_2` FOREIGN KEY (`Material_id`) REFERENCES `printingmaterial` (`Material_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `printmaterialprice`
--

LOCK TABLES `printmaterialprice` WRITE;
/*!40000 ALTER TABLE `printmaterialprice` DISABLE KEYS */;
/*!40000 ALTER TABLE `printmaterialprice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `printorder`
--

DROP TABLE IF EXISTS `printorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `printorder` (
  `PrintOrder_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Contract_ID` int(11) NOT NULL,
  `PrintOrder_cDate` date NOT NULL,
  `PrintOrder_sDate` date NOT NULL,
  `PrintOrder_eDate` date NOT NULL,
  `PrintOrder_Price` int(11) NOT NULL,
  PRIMARY KEY (`PrintOrder_ID`),
  KEY `Contract_ID` (`Contract_ID`),
  CONSTRAINT `printorder_ibfk_1` FOREIGN KEY (`Contract_ID`) REFERENCES `contract` (`Contract_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `printorder`
--

LOCK TABLES `printorder` WRITE;
/*!40000 ALTER TABLE `printorder` DISABLE KEYS */;
/*!40000 ALTER TABLE `printorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `printorderdetail`
--

DROP TABLE IF EXISTS `printorderdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `printorderdetail` (
  `PrintOrder_ID` int(11) NOT NULL,
  `Picture_ID` int(11) NOT NULL,
  `MaterialPrice_ID` int(11) NOT NULL,
  `OrderDetail_Quantity` int(11) NOT NULL,
  `OrderDetail_Size` int(11) NOT NULL,
  `OrderDetial_Des` varchar(4000) DEFAULT NULL,
  `OrderDetail_Price` varchar(15) NOT NULL,
  `OrderDetail_Note` varchar(1000) NOT NULL,
  KEY `PrintOrder_ID` (`PrintOrder_ID`),
  KEY `ad_idx` (`MaterialPrice_ID`),
  KEY `picture_ibfk2_idx` (`Picture_ID`),
  CONSTRAINT `picture_ibfk2` FOREIGN KEY (`Picture_ID`) REFERENCES `picture` (`Picture_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `printmaterialprice_ibfk2` FOREIGN KEY (`MaterialPrice_ID`) REFERENCES `printmaterialprice` (`MaterialPrice_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `printorderdetail_ibfk_2` FOREIGN KEY (`PrintOrder_ID`) REFERENCES `printorder` (`PrintOrder_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `printorderdetail`
--

LOCK TABLES `printorderdetail` WRITE;
/*!40000 ALTER TABLE `printorderdetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `printorderdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `province`
--

DROP TABLE IF EXISTS `province`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `province` (
  `Province_ID` int(11) NOT NULL,
  `Province_Name` varchar(100) NOT NULL,
  PRIMARY KEY (`Province_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `province`
--

LOCK TABLES `province` WRITE;
/*!40000 ALTER TABLE `province` DISABLE KEYS */;
INSERT INTO `province` VALUES (1,'Hà Nội'),(2,'Hồ Chí Minh'),(3,'Đà Nẵng'),(4,'Cần Thơ'),(5,'Hải Phòng'),(6,'An Giang'),(7,'Bà Rịa Vũng Tàu'),(8,'Bắc Giang'),(9,'Bắc Kạn'),(10,'Bạc Liêu'),(11,'Bắc Ninh'),(12,'Bến Tre'),(13,'Bình Định'),(14,'Bình Dương'),(15,'Bình Phước'),(16,'Bình Thuận'),(17,'Cà Mau'),(18,'Cao Bằng'),(19,'Đăk Lăk'),(20,'Đăk Nông'),(21,'Điện Biên'),(22,'Đồng Nai'),(23,'Đồng Tháp'),(24,'Gia Lai'),(25,'Hà Giang'),(26,'Hà Nam'),(27,'Hà Tĩnh'),(28,'Hải Dương'),(29,'Hậu Giang'),(30,'Hòa Bình'),(31,'Hưng Yên'),(32,'Khánh Hòa'),(33,'Kiên Giang'),(34,'Kon Tum'),(35,'Lai Châu'),(36,'Lâm Đồng'),(37,'Lạng Sơn'),(38,'Lào Cai'),(39,'Nam Định'),(40,'Nghệ An'),(41,'Ninh Bình'),(42,'Ninh Thuận'),(43,'Phú Thọ'),(44,'Phú Yên'),(45,'Quảng Bình'),(46,'Quảng Nam'),(47,'Quảng Ngãi'),(48,'Quảng Ninh'),(49,'Quảng Trị'),(50,'Sóc Trăng'),(51,'Sơn La'),(52,'Tây Ninh'),(53,'Thái Bình'),(54,'Thái Nguyên'),(55,'Thanh Hóa'),(56,'Thừa Thiên Huế'),(57,'Tiền Giang'),(58,'Trà Vinh'),(59,'Tuyên Quang'),(60,'Vĩnh Long'),(61,'Vĩnh Phúc'),(62,'Yên Bái'),(63,'Long An');
/*!40000 ALTER TABLE `province` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studio`
--

DROP TABLE IF EXISTS `studio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `studio` (
  `Studio_ID` int(11) NOT NULL AUTO_INCREMENT,
  `District_ID` int(11) NOT NULL,
  `Studio_Name` varchar(255) NOT NULL,
  `Studio_Address` varchar(255) NOT NULL,
  `Studio_Email` varchar(100) NOT NULL,
  `Studio_Number` varchar(20) NOT NULL,
  `Studio_Longitude` float NOT NULL,
  `Studio_Latitude` float NOT NULL,
  PRIMARY KEY (`Studio_ID`),
  KEY `District_ID` (`District_ID`),
  CONSTRAINT `studio_ibfk_1` FOREIGN KEY (`District_ID`) REFERENCES `district` (`District_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studio`
--

LOCK TABLES `studio` WRITE;
/*!40000 ALTER TABLE `studio` DISABLE KEYS */;
INSERT INTO `studio` VALUES (1,1,'StudioWeb','30 HANG THUNG','mail@gmail.com','0123456789',0,0),(2,1,'a','a','a','11111',0,0);
/*!40000 ALTER TABLE `studio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `User_ID` varchar(255) NOT NULL,
  `Studio_ID` int(11) NOT NULL,
  `User_Role` varchar(100) NOT NULL,
  `User_Password` varchar(255) NOT NULL,
  PRIMARY KEY (`User_ID`),
  KEY `Studio_ID` (`Studio_ID`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`Studio_ID`) REFERENCES `studio` (`Studio_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('admin',1,'admin','admin1');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'studioweb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-01 11:45:43
