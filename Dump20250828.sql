-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bd_ferreteria
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
INSERT INTO `auth_group` VALUES (1,'admin');
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
INSERT INTO `auth_group_permissions` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,7),(8,1,8),(9,1,9),(10,1,10),(11,1,11),(12,1,12),(13,1,13),(14,1,14),(15,1,15),(16,1,16),(17,1,17),(18,1,18),(19,1,19),(20,1,20),(21,1,21),(22,1,22),(23,1,23),(24,1,24),(25,1,26),(26,1,27),(27,1,28),(28,1,29),(29,1,30),(30,1,31),(31,1,32),(32,1,33),(33,1,34),(34,1,35),(35,1,36),(36,1,37),(37,1,38),(38,1,39),(39,1,40),(40,1,41),(41,1,42),(42,1,43),(43,1,44),(44,1,45),(45,1,46),(46,1,47),(47,1,48),(48,1,49),(49,1,50),(50,1,51),(51,1,52),(52,1,53),(53,1,54),(54,1,55),(55,1,56),(56,1,57),(57,1,58),(58,1,59),(59,1,60),(60,1,61),(61,1,62),(62,1,63),(63,1,64),(64,1,65),(65,1,66),(66,1,67),(67,1,68),(68,1,69),(69,1,70),(70,1,71),(71,1,72),(72,1,73),(73,1,74),(74,1,75),(75,1,76),(76,1,77),(77,1,78),(78,1,79),(79,1,80),(80,1,81),(81,1,82),(82,1,83),(83,1,84),(84,1,85),(85,1,86),(86,1,87),(87,1,88),(88,1,89),(89,1,90),(90,1,91),(91,1,92),(92,1,93),(93,1,94),(94,1,95),(95,1,96),(96,1,97),(97,1,98),(98,1,99),(99,1,100),(100,1,101),(101,1,102),(102,1,103),(103,1,104),(104,1,105),(105,1,106),(106,1,107),(107,1,108);
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add categoria',6,'add_categoria'),(22,'Can change categoria',6,'change_categoria'),(23,'Can delete categoria',6,'delete_categoria'),(24,'Can view categoria',6,'view_categoria'),(25,'Can add cliente',7,'add_cliente'),(26,'Can change cliente',7,'change_cliente'),(27,'Can delete cliente',7,'delete_cliente'),(28,'Can view cliente',7,'view_cliente'),(29,'Can add empresa',8,'add_empresa'),(30,'Can change empresa',8,'change_empresa'),(31,'Can delete empresa',8,'delete_empresa'),(32,'Can view empresa',8,'view_empresa'),(33,'Can add gasto',9,'add_gasto'),(34,'Can change gasto',9,'change_gasto'),(35,'Can delete gasto',9,'delete_gasto'),(36,'Can view gasto',9,'view_gasto'),(37,'Can add inventario',10,'add_inventario'),(38,'Can change inventario',10,'change_inventario'),(39,'Can delete inventario',10,'delete_inventario'),(40,'Can view inventario',10,'view_inventario'),(41,'Can add presentacion',11,'add_presentacion'),(42,'Can change presentacion',11,'change_presentacion'),(43,'Can delete presentacion',11,'delete_presentacion'),(44,'Can view presentacion',11,'view_presentacion'),(45,'Can add producto',12,'add_producto'),(46,'Can change producto',12,'change_producto'),(47,'Can delete producto',12,'delete_producto'),(48,'Can view producto',12,'view_producto'),(49,'Can add producto_base',13,'add_producto_base'),(50,'Can change producto_base',13,'change_producto_base'),(51,'Can delete producto_base',13,'delete_producto_base'),(52,'Can view producto_base',13,'view_producto_base'),(53,'Can add proveedor',14,'add_proveedor'),(54,'Can change proveedor',14,'change_proveedor'),(55,'Can delete proveedor',14,'delete_proveedor'),(56,'Can view proveedor',14,'view_proveedor'),(57,'Can add tipo_gasto',15,'add_tipo_gasto'),(58,'Can change tipo_gasto',15,'change_tipo_gasto'),(59,'Can delete tipo_gasto',15,'delete_tipo_gasto'),(60,'Can view tipo_gasto',15,'view_tipo_gasto'),(61,'Can add devolucion',16,'add_devolucion'),(62,'Can change devolucion',16,'change_devolucion'),(63,'Can delete devolucion',16,'delete_devolucion'),(64,'Can view devolucion',16,'view_devolucion'),(65,'Can add usuario',17,'add_user'),(66,'Can change usuario',17,'change_user'),(67,'Can delete usuario',17,'delete_user'),(68,'Can view usuario',17,'view_user'),(69,'Can add venta',18,'add_venta'),(70,'Can change venta',18,'change_venta'),(71,'Can delete venta',18,'delete_venta'),(72,'Can view venta',18,'view_venta'),(73,'Can add detalle_venta',19,'add_detalle_venta'),(74,'Can change detalle_venta',19,'change_detalle_venta'),(75,'Can delete detalle_venta',19,'delete_detalle_venta'),(76,'Can view detalle_venta',19,'view_detalle_venta'),(77,'Can add compra',20,'add_compra'),(78,'Can change compra',20,'change_compra'),(79,'Can delete compra',20,'delete_compra'),(80,'Can view compra',20,'view_compra'),(81,'Can add detalle_compra',21,'add_detalle_compra'),(82,'Can change detalle_compra',21,'change_detalle_compra'),(83,'Can delete detalle_compra',21,'delete_detalle_compra'),(84,'Can view detalle_compra',21,'view_detalle_compra'),(85,'Can add sitio',22,'add_sitioweb'),(86,'Can change sitio',22,'change_sitioweb'),(87,'Can delete sitio',22,'delete_sitioweb'),(88,'Can view sitio',22,'view_sitioweb'),(89,'Can add canton',23,'add_canton'),(90,'Can change canton',23,'change_canton'),(91,'Can delete canton',23,'delete_canton'),(92,'Can view canton',23,'view_canton'),(93,'Can add provincia',24,'add_provincia'),(94,'Can change provincia',24,'change_provincia'),(95,'Can delete provincia',24,'delete_provincia'),(96,'Can view provincia',24,'view_provincia'),(97,'Can add parroquia',25,'add_parroquia'),(98,'Can change parroquia',25,'change_parroquia'),(99,'Can delete parroquia',25,'delete_parroquia'),(100,'Can view parroquia',25,'view_parroquia'),(101,'Can add ctas_cobrar',26,'add_cta_x_cobrar'),(102,'Can change ctas_cobrar',26,'change_cta_x_cobrar'),(103,'Can delete ctas_cobrar',26,'delete_cta_x_cobrar'),(104,'Can view ctas_cobrar',26,'view_cta_x_cobrar'),(105,'Can add pago_ctas_cobrar',27,'add_pago_cta_x_cobrar'),(106,'Can change pago_ctas_cobrar',27,'change_pago_cta_x_cobrar'),(107,'Can delete pago_ctas_cobrar',27,'delete_pago_cta_x_cobrar'),(108,'Can view pago_ctas_cobrar',27,'view_pago_cta_x_cobrar'),(109,'Can add databasebackups',28,'add_databasebackups'),(110,'Can change databasebackups',28,'change_databasebackups'),(111,'Can delete databasebackups',28,'delete_databasebackups'),(112,'Can view databasebackups',28,'view_databasebackups');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `canton`
--

DROP TABLE IF EXISTS `canton`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `canton` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `provincia_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `canton_provincia_id_24516658_fk_provincia_id` (`provincia_id`),
  CONSTRAINT `canton_provincia_id_24516658_fk_provincia_id` FOREIGN KEY (`provincia_id`) REFERENCES `provincia` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=222 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `canton`
--

LOCK TABLES `canton` WRITE;
/*!40000 ALTER TABLE `canton` DISABLE KEYS */;
INSERT INTO `canton` VALUES (1,'CUENCA',1),(2,'GIRÓN',1),(3,'GUALACEO',1),(4,'NABÓN',1),(5,'PAUTE',1),(6,'PUCARA',1),(7,'SAN FERNANDO',1),(8,'SANTA ISABEL',1),(9,'SIGSIG',1),(10,'OÑA',1),(11,'CHORDELEG',1),(12,'EL PAN',1),(13,'SEVILLA DE ORO',1),(14,'GUACHAPALA',1),(15,'CAMILO PONCE ENRÍQUEZ',1),(16,'GUARANDA',2),(17,'CHILLANES',2),(18,'CHIMBO',2),(19,'ECHEANDÍA',2),(20,'SAN MIGUEL',2),(21,'CALUMA',2),(22,'LAS NAVES',2),(23,'AZOGUES',3),(24,'BIBLIÁN',3),(25,'CAÑAR',3),(26,'LA TRONCAL',3),(27,'EL TAMBO',3),(28,'DÉLEG',3),(29,'SUSCAL',3),(30,'TULCÁN',4),(31,'BOLÍVAR',4),(32,'ESPEJO',4),(33,'MIRA',4),(34,'MONTÚFAR',4),(35,'SAN PEDRO DE HUACA',4),(36,'LATACUNGA',5),(37,'LA MANÁ',5),(38,'PANGUA',5),(39,'PUJILI',5),(40,'SALCEDO',5),(41,'SAQUISILÍ',5),(42,'SIGCHOS',5),(43,'RIOBAMBA',6),(44,'ALAUSI',6),(45,'COLTA',6),(46,'CHAMBO',6),(47,'CHUNCHI',6),(48,'GUAMOTE',6),(49,'GUANO',6),(50,'PALLATANGA',6),(51,'PENIPE',6),(52,'CUMANDÁ',6),(53,'MACHALA',7),(54,'ARENILLAS',7),(55,'ATAHUALPA',7),(56,'BALSAS',7),(57,'CHILLA',7),(58,'EL GUABO',7),(59,'HUAQUILLAS',7),(60,'MARCABELÍ',7),(61,'PASAJE',7),(62,'PIÑAS',7),(63,'PORTOVELO',7),(64,'SANTA ROSA',7),(65,'ZARUMA',7),(66,'LAS LAJAS',7),(67,'ESMERALDAS',8),(68,'ELOY ALFARO',8),(69,'MUISNE',8),(70,'QUININDÉ',8),(71,'SAN LORENZO',8),(72,'ATACAMES',8),(73,'RIOVERDE',8),(74,'LA CONCORDIA',8),(75,'GUAYAQUIL',9),(76,'ALFREDO BAQUERIZO MORENO (JUJÁN)',9),(77,'BALAO',9),(78,'BALZAR',9),(79,'COLIMES',9),(80,'DAULE',9),(81,'DURÁN',9),(82,'EL EMPALME',9),(83,'EL TRIUNFO',9),(84,'MILAGRO',9),(85,'NARANJAL',9),(86,'NARANJITO',9),(87,'PALESTINA',9),(88,'PEDRO CARBO',9),(89,'SAMBORONDÓN',9),(90,'SANTA LUCÍA',9),(91,'SALITRE (URBINA JADO)',9),(92,'SAN JACINTO DE YAGUACHI',9),(93,'PLAYAS',9),(94,'SIMÓN BOLÍVAR',9),(95,'CORONEL MARCELINO MARIDUEÑA',9),(96,'LOMAS DE SARGENTILLO',9),(97,'NOBOL',9),(98,'GENERAL ANTONIO ELIZALDE',9),(99,'ISIDRO AYORA',9),(100,'IBARRA',10),(101,'ANTONIO ANTE',10),(102,'COTACACHI',10),(103,'OTAVALO',10),(104,'PIMAMPIRO',10),(105,'SAN MIGUEL DE URCUQUÍ',10),(106,'LOJA',11),(107,'CALVAS',11),(108,'CATAMAYO',11),(109,'CELICA',11),(110,'CHAGUARPAMBA',11),(111,'ESPÍNDOLA',11),(112,'GONZANAMÁ',11),(113,'MACARÁ',11),(114,'PALTAS',11),(115,'PUYANGO',11),(116,'SARAGURO',11),(117,'SOZORANGA',11),(118,'ZAPOTILLO',11),(119,'PINDAL',11),(120,'QUILANGA',11),(121,'OLMEDO',11),(122,'BABAHOYO',12),(123,'BABA',12),(124,'MONTALVO',12),(125,'PUEBLOVIEJO',12),(126,'QUEVEDO',12),(127,'URDANETA',12),(128,'VENTANAS',12),(129,'VÍNCES',12),(130,'PALENQUE',12),(131,'BUENA FÉ',12),(132,'VALENCIA',12),(133,'MOCACHE',12),(134,'QUINSALOMA',12),(135,'PORTOVIEJO',13),(136,'BOLÍVAR',13),(137,'CHONE',13),(138,'EL CARMEN',13),(139,'FLAVIO ALFARO',13),(140,'JIPIJAPA',13),(141,'JUNÍN',13),(142,'MANTA',13),(143,'MONTECRISTI',13),(144,'PAJÁN',13),(145,'PICHINCHA',13),(146,'ROCAFUERTE',13),(147,'SANTA ANA',13),(148,'SUCRE',13),(149,'TOSAGUA',13),(150,'24 DE MAYO',13),(151,'PEDERNALES',13),(152,'OLMEDO',13),(153,'PUERTO LÓPEZ',13),(154,'JAMA',13),(155,'JARAMIJÓ',13),(156,'SAN VICENTE',13),(157,'MORONA',14),(158,'GUALAQUIZA',14),(159,'LIMÓN INDANZA',14),(160,'PALORA',14),(161,'SANTIAGO',14),(162,'SUCÚA',14),(163,'HUAMBOYA',14),(164,'SAN JUAN BOSCO',14),(165,'TAISHA',14),(166,'LOGROÑO',14),(167,'PABLO SEXTO',14),(168,'TIWINTZA',14),(169,'TENA',15),(170,'ARCHIDONA',15),(171,'EL CHACO',15),(172,'QUIJOS',15),(173,'CARLOS JULIO AROSEMENA TOLA',15),(174,'PASTAZA',16),(175,'MERA',16),(176,'SANTA CLARA',16),(177,'ARAJUNO',16),(178,'QUITO',17),(179,'CAYAMBE',17),(180,'MEJIA',17),(181,'PEDRO MONCAYO',17),(182,'RUMIÑAHUI',17),(183,'SAN MIGUEL DE LOS BANCOS',17),(184,'PEDRO VICENTE MALDONADO',17),(185,'PUERTO QUITO',17),(186,'AMBATO',18),(187,'BAÑOS DE AGUA SANTA',18),(188,'CEVALLOS',18),(189,'MOCHA',18),(190,'PATATE',18),(191,'QUERO',18),(192,'SAN PEDRO DE PELILEO',18),(193,'SANTIAGO DE PÍLLARO',18),(194,'TISALEO',18),(195,'ZAMORA',19),(196,'CHINCHIPE',19),(197,'NANGARITZA',19),(198,'YACUAMBI',19),(199,'YANTZAZA (YANZATZA)',19),(200,'EL PANGUI',19),(201,'CENTINELA DEL CÓNDOR',19),(202,'PALANDA',19),(203,'PAQUISHA',19),(204,'SAN CRISTÓBAL',20),(205,'ISABELA',20),(206,'SANTA CRUZ',20),(207,'LAGO AGRIO',21),(208,'GONZALO PIZARRO',21),(209,'PUTUMAYO',21),(210,'SHUSHUFINDI',21),(211,'SUCUMBÍOS',21),(212,'CASCALES',21),(213,'CUYABENO',21),(214,'ORELLANA',22),(215,'AGUARICO',22),(216,'LA JOYA DE LOS SACHAS',22),(217,'LORETO',22),(218,'SANTO DOMINGO',23),(219,'SANTA ELENA',24),(220,'LA LIBERTAD',24),(221,'SALINAS',24);
/*!40000 ALTER TABLE `canton` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(25) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Materiales','Materiales para la construcción'),(2,'Herramientas','Herramientas'),(3,'Materias Primas','Materias Primas'),(4,'Plasticos','Plasticos');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(20) DEFAULT NULL,
  `cedula` varchar(10) NOT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `sexo` int NOT NULL,
  `telefono` varchar(9) DEFAULT NULL,
  `celular` varchar(10) DEFAULT NULL,
  `direccion` varchar(50) NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cedula` (`cedula`),
  UNIQUE KEY `correo` (`correo`),
  UNIQUE KEY `telefono` (`telefono`),
  UNIQUE KEY `celular` (`celular`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Christian Roberto','Macias Torre','0604551580','MichelleGomez@gmail.com',1,'032954258','0994695413','Milagro las piñas','2021-02-08'),(2,'Christian Roberto','Macias Torres','0104071758','Cgfsss2dsd3@gmail.com',1,NULL,'0994695415','Milagro','2021-05-06');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compra` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha_compra` date NOT NULL,
  `subtotal` decimal(9,2) NOT NULL,
  `iva` decimal(9,2) NOT NULL,
  `total` decimal(9,2) NOT NULL,
  `estado` int NOT NULL,
  `proveedor_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `compra_proveedor_id_11336635_fk_proveedor_id` (`proveedor_id`),
  CONSTRAINT `compra_proveedor_id_11336635_fk_proveedor_id` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra`
--

LOCK TABLES `compra` WRITE;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
INSERT INTO `compra` VALUES (1,'2021-02-08',600.00,72.00,672.00,1,1),(2,'2021-02-08',90.00,10.80,100.80,1,2),(3,'2021-05-08',360.00,43.20,403.20,1,1),(4,'2021-05-08',60.00,7.20,67.20,1,1),(5,'2021-05-18',100.00,12.00,112.00,1,2);
/*!40000 ALTER TABLE `compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ctas_cobrar`
--

DROP TABLE IF EXISTS `ctas_cobrar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ctas_cobrar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `valor` decimal(9,2) NOT NULL,
  `saldo` decimal(9,2) NOT NULL,
  `estado` int NOT NULL,
  `venta_id` int NOT NULL,
  `nro_cuotas` int NOT NULL,
  `interes` decimal(9,2) NOT NULL,
  `tolal_deuda` decimal(9,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ctas_cobrar_venta_id_f5ce490d_fk_venta_id` (`venta_id`),
  CONSTRAINT `ctas_cobrar_venta_id_f5ce490d_fk_venta_id` FOREIGN KEY (`venta_id`) REFERENCES `venta` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ctas_cobrar`
--

LOCK TABLES `ctas_cobrar` WRITE;
/*!40000 ALTER TABLE `ctas_cobrar` DISABLE KEYS */;
INSERT INTO `ctas_cobrar` VALUES (18,'2021-05-17',115.44,0.00,1,36,12,8.82,115.44),(19,'2021-05-18',7.84,4.00,0,40,2,0.15,7.99);
/*!40000 ALTER TABLE `ctas_cobrar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_compra`
--

DROP TABLE IF EXISTS `detalle_compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_compra` (
  `id` int NOT NULL AUTO_INCREMENT,
  `p_compra_actual` decimal(9,2) DEFAULT NULL,
  `cantidad` int NOT NULL,
  `subtotal` decimal(9,2) NOT NULL,
  `compra_id` int NOT NULL,
  `producto_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `detalle_compra_compra_id_4fc61e57_fk_compra_id` (`compra_id`),
  KEY `detalle_compra_producto_id_87f4062c_fk_producto_id` (`producto_id`),
  CONSTRAINT `detalle_compra_compra_id_4fc61e57_fk_compra_id` FOREIGN KEY (`compra_id`) REFERENCES `compra` (`id`),
  CONSTRAINT `detalle_compra_producto_id_87f4062c_fk_producto_id` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_compra`
--

LOCK TABLES `detalle_compra` WRITE;
/*!40000 ALTER TABLE `detalle_compra` DISABLE KEYS */;
INSERT INTO `detalle_compra` VALUES (1,6.00,100,600.00,1,1),(2,1.00,10,10.00,2,3),(3,8.00,10,80.00,2,2),(4,6.00,60,360.00,3,1),(5,6.00,10,60.00,4,1),(6,5.00,20,100.00,5,11);
/*!40000 ALTER TABLE `detalle_compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_venta`
--

DROP TABLE IF EXISTS `detalle_venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_venta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pvp_actual` decimal(9,2) NOT NULL,
  `cantidad` int NOT NULL,
  `subtotal` decimal(9,2) NOT NULL,
  `venta_id` int NOT NULL,
  `producto_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `detalle_venta_venta_id_ecf1a1a3_fk_venta_id` (`venta_id`),
  KEY `detalle_venta_producto_id_d6b1f3f3_fk_producto_id` (`producto_id`),
  CONSTRAINT `detalle_venta_producto_id_d6b1f3f3_fk_producto_id` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`),
  CONSTRAINT `detalle_venta_venta_id_ecf1a1a3_fk_venta_id` FOREIGN KEY (`venta_id`) REFERENCES `venta` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=222 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_venta`
--

LOCK TABLES `detalle_venta` WRITE;
/*!40000 ALTER TABLE `detalle_venta` DISABLE KEYS */;
INSERT INTO `detalle_venta` VALUES (207,8.40,1,8.40,29,1),(208,1.40,1,1.40,30,3),(209,1.40,1,1.40,31,3),(210,1.40,1,1.40,32,3),(211,11.20,1,11.20,33,2),(212,1.40,1,1.40,34,3),(213,11.20,1,11.20,34,2),(214,1.40,1,1.40,35,3),(215,8.40,1,8.40,35,1),(216,8.40,10,84.00,36,1),(217,11.20,1,11.20,36,2),(218,8.40,1,8.40,37,1),(219,1.40,1,1.40,38,3),(220,7.00,1,7.00,39,11),(221,7.00,1,7.00,40,11);
/*!40000 ALTER TABLE `detalle_venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devolucion`
--

DROP TABLE IF EXISTS `devolucion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devolucion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `venta_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `devolucion_venta_id_ff12d98e_fk_venta_id` (`venta_id`),
  CONSTRAINT `devolucion_venta_id_ff12d98e_fk_venta_id` FOREIGN KEY (`venta_id`) REFERENCES `venta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devolucion`
--

LOCK TABLES `devolucion` WRITE;
/*!40000 ALTER TABLE `devolucion` DISABLE KEYS */;
/*!40000 ALTER TABLE `devolucion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_usuario_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_usuario_id` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2021-02-06 19:37:58.674000','1','Mega Centro Ferretero 0604551580001',1,'[{\"added\": {}}]',8,1),(2,'2021-02-07 17:59:38.644000','1','Mega Centro Ferrete 0604551580001',2,'[]',8,1),(3,'2021-02-08 18:35:47.113000','1','Cemento Chimborazo',2,'[{\"changed\": {\"fields\": [\"Stock\"]}}]',12,1),(4,'2021-02-08 18:42:30.018000','1','Cemento Chimborazo',2,'[{\"changed\": {\"fields\": [\"Stock\"]}}]',12,1),(5,'2021-02-08 18:43:39.675000','1','Cemento Chimborazo',2,'[{\"changed\": {\"fields\": [\"Stock\"]}}]',12,1),(6,'2021-02-08 18:43:49.280000','1','Cemento Chimborazo',2,'[{\"changed\": {\"fields\": [\"Stock\"]}}]',12,1),(7,'2021-02-08 18:45:28.848000','1','Cemento Chimborazo',2,'[{\"changed\": {\"fields\": [\"Stock\"]}}]',12,1),(8,'2021-02-08 18:48:31.595000','1','Cemento Chimborazo',2,'[{\"changed\": {\"fields\": [\"Stock\"]}}]',12,1),(9,'2021-02-11 19:42:41.772000','1','Mega Centro Ferrete 0604551580001',2,'[]',8,1),(10,'2021-03-12 02:48:22.515000','1','Mega Centro Ferretero 0604551580001',2,'[]',8,1),(11,'2021-05-09 01:01:05.247000','1','admin',1,'[{\"added\": {}}]',3,1),(12,'2021-05-09 01:01:27.248000','1','admin',2,'[{\"changed\": {\"fields\": [\"Permissions\"]}}]',3,1),(13,'2021-05-09 01:01:36.556000','1','admin Administrador',2,'[{\"changed\": {\"fields\": [\"Groups\"]}}]',17,1),(14,'2021-05-12 14:21:06.326000','1','Sistema de informacion',1,'[{\"added\": {}}]',22,1),(15,'2021-05-16 15:46:24.967000','4','Serrucho',3,'',12,1),(16,'2021-05-16 15:47:01.762000','5','Serrucho',3,'',12,1),(17,'2021-05-16 15:48:45.580000','6','Serrucho',3,'',12,1),(18,'2021-05-16 16:00:09.180000','8','Serrucho',3,'',12,1),(19,'2021-05-16 16:04:04.735000','9','Serrucho',3,'',12,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(28,'apps','databasebackups'),(3,'auth','group'),(2,'auth','permission'),(6,'categoria','categoria'),(7,'cliente','cliente'),(20,'compra','compra'),(21,'compra','detalle_compra'),(4,'contenttypes','contenttype'),(26,'cta_x_cbr','cta_x_cobrar'),(16,'delvoluciones_venta','devolucion'),(8,'empresa','empresa'),(9,'gasto','gasto'),(10,'inventario','inventario'),(27,'pago_cta_x_cbr','pago_cta_x_cobrar'),(11,'presentacion','presentacion'),(12,'producto','producto'),(13,'producto_base','producto_base'),(14,'proveedor','proveedor'),(5,'sessions','session'),(22,'sitioweb','sitioweb'),(15,'tipogasto','tipo_gasto'),(23,'ubicacion','canton'),(25,'ubicacion','parroquia'),(24,'ubicacion','provincia'),(17,'user','user'),(19,'venta','detalle_venta'),(18,'venta','venta');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2025-08-28 15:57:28.841794'),(2,'contenttypes','0002_remove_content_type_name','2025-08-28 15:57:28.923428'),(3,'auth','0001_initial','2025-08-28 15:57:28.964129'),(4,'auth','0002_alter_permission_name_max_length','2025-08-28 15:57:29.094369'),(5,'auth','0003_alter_user_email_max_length','2025-08-28 15:57:29.097369'),(6,'auth','0004_alter_user_username_opts','2025-08-28 15:57:29.097369'),(7,'auth','0005_alter_user_last_login_null','2025-08-28 15:57:29.097369'),(8,'auth','0006_require_contenttypes_0002','2025-08-28 15:57:29.097369'),(9,'auth','0007_alter_validators_add_error_messages','2025-08-28 15:57:29.097369'),(10,'auth','0008_alter_user_username_max_length','2025-08-28 15:57:29.113325'),(11,'auth','0009_alter_user_last_name_max_length','2025-08-28 15:57:29.113325'),(12,'auth','0010_alter_group_name_max_length','2025-08-28 15:57:29.113325'),(13,'auth','0011_update_proxy_permissions','2025-08-28 15:57:29.129061'),(14,'auth','0012_alter_user_first_name_max_length','2025-08-28 15:57:29.129061'),(15,'user','0001_initial','2025-08-28 15:57:29.183208'),(16,'admin','0001_initial','2025-08-28 15:57:29.315788'),(17,'admin','0002_logentry_remove_auto_add','2025-08-28 15:57:29.367891'),(18,'admin','0003_logentry_add_action_flag_choices','2025-08-28 15:57:29.379228'),(19,'apps','0001_initial','2025-08-28 15:57:29.397178'),(20,'apps','0002_delete_databasebackups','2025-08-28 15:57:29.428060'),(21,'apps','0003_databasebackups','2025-08-28 15:57:29.446251'),(22,'categoria','0001_initial','2025-08-28 15:57:29.483606'),(23,'cliente','0001_initial','2025-08-28 15:57:29.510584'),(24,'proveedor','0001_initial','2025-08-28 15:57:29.521056'),(25,'producto_base','0001_initial','2025-08-28 15:57:29.536714'),(26,'presentacion','0001_initial','2025-08-28 15:57:29.568292'),(27,'producto','0001_initial','2025-08-28 15:57:29.591331'),(28,'compra','0001_initial','2025-08-28 15:57:29.660122'),(29,'compra','0002_compra_user','2025-08-28 15:57:29.774070'),(30,'compra','0003_remove_compra_user','2025-08-28 15:57:29.812346'),(31,'inventario','0001_initial','2025-08-28 15:57:29.816616'),(32,'venta','0001_initial','2025-08-28 15:57:29.893423'),(33,'cta_x_cbr','0001_initial','2025-08-28 15:57:29.987382'),(34,'cta_x_cbr','0002_cta_x_cobrar_nro_cuotas','2025-08-28 15:57:30.058474'),(35,'cta_x_cbr','0003_cta_x_cobrar_interes','2025-08-28 15:57:30.084530'),(36,'cta_x_cbr','0004_cta_x_cobrar_tolal_deuda','2025-08-28 15:57:30.113078'),(37,'delvoluciones_venta','0001_initial','2025-08-28 15:57:30.128478'),(38,'ubicacion','0001_initial','2025-08-28 15:57:30.219719'),(39,'empresa','0001_initial','2025-08-28 15:57:30.255082'),(40,'empresa','0002_empresa_tasa','2025-08-28 15:57:53.472822'),(41,'empresa','0003_auto_20210609_1835','2025-08-28 15:57:53.583988'),(42,'tipogasto','0001_initial','2025-08-28 15:57:53.594992'),(43,'gasto','0001_initial','2025-08-28 15:57:53.596993'),(44,'pago_cta_x_cbr','0001_initial','2025-08-28 15:57:53.676501'),(45,'pago_cta_x_cbr','0002_auto_20210212_0100','2025-08-28 15:57:53.765401'),(46,'pago_cta_x_cbr','0003_auto_20210212_0106','2025-08-28 15:57:53.770082'),(47,'pago_cta_x_cbr','0004_auto_20210212_0112','2025-08-28 15:57:53.785936'),(48,'pago_cta_x_cbr','0005_pago_cta_x_cobrar_valor_pagado','2025-08-28 15:57:53.831615'),(49,'pago_cta_x_cbr','0006_pago_cta_x_cobrar_saldo','2025-08-28 15:57:53.857708'),(50,'producto_base','0002_auto_20210530_1704','2025-08-28 15:57:53.892489'),(51,'sessions','0001_initial','2025-08-28 15:57:53.905077'),(52,'sitioweb','0001_initial','2025-08-28 15:57:53.925186'),(53,'sitioweb','0002_remove_sitioweb_mapa','2025-08-28 15:57:53.940926'),(54,'sitioweb','0003_auto_20210609_1835','2025-08-28 15:57:53.988059'),(55,'venta','0002_venta_tipo_pago','2025-08-28 15:57:54.020839'),(56,'venta','0003_venta_tipo_venta','2025-08-28 15:57:54.066402'),(57,'venta','0004_auto_20210508_1125','2025-08-28 15:57:54.192577'),(58,'venta','0005_auto_20210518_0929','2025-08-28 15:57:54.192577');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('0cizj0aj58bq64ve7tj4gfertop49g83','.eJxVjEEOwiAQAP_C2ZBCt7R49N43NLvsIlUDSWlPxr8bkh70OjOZt1rw2NNyVNmWldVVGXX5ZYThKbkJfmC-Fx1K3reVdEv0aaueC8vrdrZ_g4Q1ta3rHEHPsaMR_NA7YYBhApGRgS0BREtGZArGCjAaF71hJ8EiU0CvPl_dkDiM:1lAHr9:ovVhn6rwxajTas7j3oEQ9rDlFzCyKNh9xJBms35CyUc','2021-02-25 19:42:27.378000'),('4xkfz7e8ed4utzfwymg6mklo1d0lgvrw','.eJxVjEEOwiAQAP_C2ZBCt7R49N43NLvsIlUDSWlPxr8bkh70OjOZt1rw2NNyVNmWldVVGXX5ZYThKbkJfmC-Fx1K3reVdEv0aaueC8vrdrZ_g4Q1ta3rHEHPsaMR_NA7YYBhApGRgS0BREtGZArGCjAaF71hJ8EiU0CvPl_dkDiM:1l9Ya7:IO_HlUBapJDr5U2BVNf3dgKholfy4_TAALMmaxYyyEE','2021-02-23 19:21:51.052000'),('660kmezttvbz9u9zwe5ycnmx654j4vya','.eJxVjEEOwiAQAP_C2ZBCt7R49N43NLvsIlUDSWlPxr8bkh70OjOZt1rw2NNyVNmWldVVGXX5ZYThKbkJfmC-Fx1K3reVdEv0aaueC8vrdrZ_g4Q1ta3rHEHPsaMR_NA7YYBhApGRgS0BREtGZArGCjAaF71hJ8EiU0CvPl_dkDiM:1lefxA:o41YzC5fKEgC_9WyMvgYqMB23YXavsg0AcmteISCnZM','2021-05-20 15:30:16.104000'),('8ni5acs95cy3mfx3o7prf7zzicr3bgrd','.eJxVjEEOwiAQRe_C2hBgQBiX7nsGMgxUqoYmpV0Z765NutDtf-_9l4i0rTVuvSxxyuIitDj9bon4UdoO8p3abZY8t3WZktwVedAuhzmX5_Vw_w4q9fqtEWwiAA0OYUwuEfrskXwoCq1yljL5kUJwZwpsjGbPBZVCA4otJBbvD9DkN3I:1lj0WJ:qxdzrP3AjJnoUBnVtzL0Gl7fCi_Z-Kyt_8HLo6_-9yA','2021-06-01 14:16:27.509000'),('9k43pkxbs6g6oi9jedpt3dd3qage4som','.eJxVjMsOwiAQRf-FtSFAh5dL934DAWaQqoGktCvjv2uTLnR7zzn3xULc1hq2QUuYkZ2ZZKffLcX8oLYDvMd26zz3ti5z4rvCDzr4tSM9L4f7d1DjqN-6FFKkDSa0IJwTYLHgZFRGT1qDA0RwpiglivPGwZSU9LrI6DMka5G9P-3GN8c:1ljLxr:sesu-1p2CZ6m5QHRHvN0dnIsVMk9SMpXP6uFj8Ra79o','2021-06-02 13:10:19.493000'),('ah63ccdvzf164r538o2f5cwz7ux9x5xk','.eJxVjEEOwiAQAP_C2ZBCt7R49N43NLvsIlUDSWlPxr8bkh70OjOZt1rw2NNyVNmWldVVGXX5ZYThKbkJfmC-Fx1K3reVdEv0aaueC8vrdrZ_g4Q1ta3rHEHPsaMR_NA7YYBhApGRgS0BREtGZArGCjAaF71hJ8EiU0CvPl_dkDiM:1lgDds:z0lGTKakaQyqoHKMVN28PJIYfUcpkqoo7TDK1CbYPyI','2021-05-24 21:40:44.937000'),('c5w6st6kpvw5z7gt3i4gbz2osxsgyxm5','.eJxVjEEOwiAQAP_C2ZBCt7R49N43NLvsIlUDSWlPxr8bkh70OjOZt1rw2NNyVNmWldVVGXX5ZYThKbkJfmC-Fx1K3reVdEv0aaueC8vrdrZ_g4Q1ta3rHEHPsaMR_NA7YYBhApGRgS0BREtGZArGCjAaF71hJ8EiU0CvPl_dkDiM:1lKXBl:SBM_uLTtyq45DhF04okXB-XJRbDVMKvH4flVpVfxXkY','2021-03-26 02:06:05.475000'),('djxcgc0839lkqp2x7bigof2qjjnxyfe2','.eJxVjEEOwiAQAP_C2ZBCt7R49N43NLvsIlUDSWlPxr8bkh70OjOZt1rw2NNyVNmWldVVGXX5ZYThKbkJfmC-Fx1K3reVdEv0aaueC8vrdrZ_g4Q1ta3rHEHPsaMR_NA7YYBhApGRgS0BREtGZArGCjAaF71hJ8EiU0CvPl_dkDiM:1l8TIH:GdTWfi2Uqj0YatSXdPgMctyDe758J-O_dwB9BjgMEn0','2021-02-20 19:30:57.040000'),('i30d984u0rb7ye07h2jl5utjo2zkly1u','.eJxVjEEOwiAQAP_C2ZBCt7R49N43NLvsIlUDSWlPxr8bkh70OjOZt1rw2NNyVNmWldVVGXX5ZYThKbkJfmC-Fx1K3reVdEv0aaueC8vrdrZ_g4Q1ta3rHEHPsaMR_NA7YYBhApGRgS0BREtGZArGCjAaF71hJ8EiU0CvPl_dkDiM:1lfPYy:bAD4UQ5ibAPXyhePe0b4KJEvLYR3LzhvSb4U5XpPMb8','2021-05-22 16:12:20.351000'),('j3wmepeywrbkdibhbx5zq5aqc3sbpmmh','.eJxVjEEOwiAQRe_C2hBgQBiX7nsGMgxUqoYmpV0Z765NutDtf-_9l4i0rTVuvSxxyuIitDj9bon4UdoO8p3abZY8t3WZktwVedAuhzmX5_Vw_w4q9fqtEWwiAA0OYUwuEfrskXwoCq1yljL5kUJwZwpsjGbPBZVCA4otJBbvD9DkN3I:1lj2WQ:xM27KllfEujj5MsLvBXm_AFHZxqWLsoMoH1h0WPL-JE','2021-06-01 16:24:42.538000'),('kqc7vk39cdlh1w3rg6dek5o3vdpr7wjn','.eJxVjEEOwiAQAP_C2ZBCt7R49N43NLvsIlUDSWlPxr8bkh70OjOZt1rw2NNyVNmWldVVGXX5ZYThKbkJfmC-Fx1K3reVdEv0aaueC8vrdrZ_g4Q1ta3rHEHPsaMR_NA7YYBhApGRgS0BREtGZArGCjAaF71hJ8EiU0CvPl_dkDiM:1lgpjC:Zse-BqpeCVgPnIxWpbDwXERkrN94KaqsCisAcw-ExQs','2021-05-26 14:20:46.281000'),('lp7dtufigdqwytyt5lzdc4k8bbcnqj50','.eJxVjMsOwiAQRf-FtSE8CmVcuu83kBkYpWogKe3K-O_apAvd3nPOfYmI21ri1nmJcxZnocXpdyNMD647yHestyZTq-syk9wVedAup5b5eTncv4OCvXxrG66K2ZvgkZUHnQY3BJM5OcuZMhpWQTsIHoYxARgYiawzAEQUCJR4fwDbQTeS:1lj7eq:jInMxFJ2EXU1zSPUVmt2FmPICV2uVQH9oRnEO6yLnvI','2021-06-01 21:53:44.114000'),('xcmzop9djo6ksymqowrysm1i9upfxmxl','.eJxNkMtOwzAQRSlqACEeEhL_QDdWHk2b7BAbFogNfIA19jiNaepUcYLYIMECJCTvOvwvTlqkzm7m3js-no_g9210MNQ73bhzDl1b8s6qhmskN4rIXe3NBMilMl6Y4AuYRc1kbdpGC9Zb2E617LFGVd39ey_3FpRgS3K3KovDPJsleZqkOUrMphiJPBTzOBEglErCqBAyFRDCDKGY5XNRxAhxNi2SKYYxuWDR1N2a3PUOBAVb9a9aT2EVuYuh451Za7msFG3IjXsMn7wfkt_0RU_Uf_qI2xZaReWJOx3In4d2Q5PPrQ6I2izoxx2iIHeMqoCuasmdFVpVaLkEWSpv7YQ79Fd7GLmxgZWHCABX2vQX2FLyV9VYXftJkLCIpT7RsT_Xio-p:1urfCr:UGHZ6kmjsj4I8LtTB7eMsYozdc4CQ1tkVEXTNGoUt_s','2025-09-11 16:10:33.158362');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresa`
--

DROP TABLE IF EXISTS `empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `ciudad` varchar(25) NOT NULL,
  `ruc` varchar(13) NOT NULL,
  `direccion` varchar(25) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `iva` int DEFAULT NULL,
  `indice` int DEFAULT NULL,
  `tasa` int DEFAULT NULL,
  `facebook` varchar(25) DEFAULT NULL,
  `instagram` varchar(25) DEFAULT NULL,
  `twitter` varchar(25) DEFAULT NULL,
  `ubicacion_id` int DEFAULT NULL,
  `foto` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ruc` (`ruc`),
  UNIQUE KEY `telefono` (`telefono`),
  UNIQUE KEY `correo` (`correo`),
  KEY `empresa_ubicacion_id_d439f9c2_fk_parroquia_id` (`ubicacion_id`),
  CONSTRAINT `empresa_ubicacion_id_d439f9c2_fk_parroquia_id` FOREIGN KEY (`ubicacion_id`) REFERENCES `parroquia` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresa`
--

LOCK TABLES `empresa` WRITE;
/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
INSERT INTO `empresa` VALUES (1,'Mega Centro Ferretero','Naranjito','0604551580001','Av principal','0994695415','megacentro@gmail.com',12,40,16,NULL,NULL,NULL,572,'');
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gasto`
--

DROP TABLE IF EXISTS `gasto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gasto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha_pago` date NOT NULL,
  `valor` decimal(9,2) NOT NULL,
  `detalle` varchar(50) NOT NULL,
  `empresa_id` int NOT NULL,
  `tipo_gasto_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `gasto_empresa_id_f4c127b0_fk_empresa_id` (`empresa_id`),
  KEY `gasto_tipo_gasto_id_25d252dd_fk_tipo_gasto_id` (`tipo_gasto_id`),
  CONSTRAINT `gasto_empresa_id_f4c127b0_fk_empresa_id` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`),
  CONSTRAINT `gasto_tipo_gasto_id_25d252dd_fk_tipo_gasto_id` FOREIGN KEY (`tipo_gasto_id`) REFERENCES `tipo_gasto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gasto`
--

LOCK TABLES `gasto` WRITE;
/*!40000 ALTER TABLE `gasto` DISABLE KEYS */;
INSERT INTO `gasto` VALUES (1,'2021-05-08',12.00,'Pago nada mas',1,1);
/*!40000 ALTER TABLE `gasto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventario`
--

DROP TABLE IF EXISTS `inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estado` int NOT NULL,
  `compra_id` int NOT NULL,
  `producto_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `inventario_compra_id_49e631bc_fk_compra_id` (`compra_id`),
  KEY `inventario_producto_id_61d8ae74_fk_producto_id` (`producto_id`),
  CONSTRAINT `inventario_compra_id_49e631bc_fk_compra_id` FOREIGN KEY (`compra_id`) REFERENCES `compra` (`id`),
  CONSTRAINT `inventario_producto_id_61d8ae74_fk_producto_id` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventario`
--

LOCK TABLES `inventario` WRITE;
/*!40000 ALTER TABLE `inventario` DISABLE KEYS */;
INSERT INTO `inventario` VALUES (1,0,1,1),(2,0,1,1),(3,0,1,1),(4,0,1,1),(5,0,1,1),(6,0,1,1),(7,0,1,1),(8,0,1,1),(9,0,1,1),(10,0,1,1),(11,0,1,1),(12,0,1,1),(13,0,1,1),(14,0,1,1),(15,0,1,1),(16,0,1,1),(17,0,1,1),(18,0,1,1),(19,0,1,1),(20,0,1,1),(21,0,1,1),(22,0,1,1),(23,0,1,1),(24,0,1,1),(25,0,1,1),(26,0,1,1),(27,0,1,1),(28,0,1,1),(29,0,1,1),(30,0,1,1),(31,0,1,1),(32,0,1,1),(33,0,1,1),(34,0,1,1),(35,0,1,1),(36,0,1,1),(37,0,1,1),(38,0,1,1),(39,0,1,1),(40,0,1,1),(41,0,1,1),(42,0,1,1),(43,0,1,1),(44,0,1,1),(45,0,1,1),(46,0,1,1),(47,0,1,1),(48,0,1,1),(49,0,1,1),(50,0,1,1),(51,0,1,1),(52,0,1,1),(53,0,1,1),(54,0,1,1),(55,0,1,1),(56,0,1,1),(57,0,1,1),(58,0,1,1),(59,0,1,1),(60,0,1,1),(61,0,1,1),(62,0,1,1),(63,0,1,1),(64,0,1,1),(65,0,1,1),(66,0,1,1),(67,0,1,1),(68,0,1,1),(69,0,1,1),(70,0,1,1),(71,0,1,1),(72,0,1,1),(73,0,1,1),(74,0,1,1),(75,0,1,1),(76,0,1,1),(77,0,1,1),(78,0,1,1),(79,0,1,1),(80,0,1,1),(81,0,1,1),(82,0,1,1),(83,0,1,1),(84,0,1,1),(85,0,1,1),(86,0,1,1),(87,0,1,1),(88,0,1,1),(89,0,1,1),(90,0,1,1),(91,0,1,1),(92,0,1,1),(93,0,1,1),(94,0,1,1),(95,0,1,1),(96,0,1,1),(97,0,1,1),(98,1,1,1),(99,1,1,1),(100,1,1,1),(101,0,2,3),(102,0,2,3),(103,1,2,3),(104,1,2,3),(105,1,2,3),(106,1,2,3),(107,1,2,3),(108,1,2,3),(109,1,2,3),(110,1,2,3),(111,0,2,2),(112,0,2,2),(113,0,2,2),(114,0,2,2),(115,1,2,2),(116,1,2,2),(117,1,2,2),(118,1,2,2),(119,1,2,2),(120,1,2,2);
/*!40000 ALTER TABLE `inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pago_ctas_cobrar`
--

DROP TABLE IF EXISTS `pago_ctas_cobrar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pago_ctas_cobrar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `valor` decimal(9,2) NOT NULL,
  `cta_cobrar_id` int NOT NULL,
  `estado` int NOT NULL,
  `fecha_pago` date DEFAULT NULL,
  `valor_pagado` decimal(9,2) NOT NULL,
  `saldo` decimal(9,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pago_ctas_cobrar_cta_cobrar_id_c3aabc19_fk_ctas_cobrar_id` (`cta_cobrar_id`),
  CONSTRAINT `pago_ctas_cobrar_cta_cobrar_id_c3aabc19_fk_ctas_cobrar_id` FOREIGN KEY (`cta_cobrar_id`) REFERENCES `ctas_cobrar` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pago_ctas_cobrar`
--

LOCK TABLES `pago_ctas_cobrar` WRITE;
/*!40000 ALTER TABLE `pago_ctas_cobrar` DISABLE KEYS */;
INSERT INTO `pago_ctas_cobrar` VALUES (67,'2021-06-17',9.62,18,2,'2021-05-17',9.62,0.00),(68,'2021-07-19',9.62,18,2,'2021-05-17',9.62,0.00),(69,'2021-08-17',9.62,18,2,'2021-05-17',9.62,0.00),(70,'2021-09-17',9.62,18,2,'2021-05-17',9.62,0.00),(71,'2021-10-18',9.62,18,2,'2021-05-17',9.62,0.00),(72,'2021-11-17',9.62,18,2,'2021-05-17',9.62,0.00),(73,'2021-12-17',9.62,18,2,'2021-05-17',9.62,0.00),(74,'2022-01-17',9.62,18,2,'2021-05-17',9.62,0.00),(75,'2022-02-17',9.62,18,2,'2021-05-17',9.62,0.00),(76,'2022-03-17',9.62,18,2,'2021-05-17',9.62,0.00),(77,'2022-04-18',9.62,18,2,'2021-05-17',9.62,0.00),(78,'2022-05-17',9.62,18,2,'2021-05-17',9.62,0.00),(79,'2021-06-18',3.99,19,2,'2021-05-18',3.99,0.00),(80,'2021-07-19',4.00,19,1,NULL,0.00,4.00);
/*!40000 ALTER TABLE `pago_ctas_cobrar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parroquia`
--

DROP TABLE IF EXISTS `parroquia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parroquia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `canton_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `parroquia_canton_id_cd1b9ccd_fk_canton_id` (`canton_id`),
  CONSTRAINT `parroquia_canton_id_cd1b9ccd_fk_canton_id` FOREIGN KEY (`canton_id`) REFERENCES `canton` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1397 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parroquia`
--

LOCK TABLES `parroquia` WRITE;
/*!40000 ALTER TABLE `parroquia` DISABLE KEYS */;
INSERT INTO `parroquia` VALUES (1,'BELLAVISTA',1),(2,'CAÑARIBAMBA',1),(3,'EL BATÁN',1),(4,'EL SAGRARIO',1),(5,'EL VECINO',1),(6,'GIL RAMÍREZ DÁVALOS',1),(7,'HUAYNACÁPAC',1),(8,'MACHÁNGARA',1),(9,'MONAY',1),(10,'SAN BLAS',1),(11,'SAN SEBASTIÁN',1),(12,'SUCRE',1),(13,'TOTORACOCHA',1),(14,'YANUNCAY',1),(15,'HERMANO MIGUEL',1),(16,'CUENCA',1),(17,'BAÑOS',1),(18,'CUMBE',1),(19,'CHAUCHA',1),(20,'CHECA (JIDCAY)',1),(21,'CHIQUINTAD',1),(22,'LLACAO',1),(23,'MOLLETURO',1),(24,'NULTI',1),(25,'OCTAVIO CORDERO PALACIOS (SANTA ROSA)',1),(26,'PACCHA',1),(27,'QUINGEO',1),(28,'RICAURTE',1),(29,'SAN JOAQUÍN',1),(30,'SANTA ANA',1),(31,'SAYAUSÍ',1),(32,'SIDCAY',1),(33,'SININCAY',1),(34,'TARQUI',1),(35,'TURI',1),(36,'VALLE',1),(37,'VICTORIA DEL PORTETE (IRQUIS)',1),(38,'GIRÓN',2),(39,'ASUNCIÓN',2),(40,'SAN GERARDO',2),(41,'GUALACEO',3),(42,'CHORDELEG',3),(43,'DANIEL CÓRDOVA TORAL (EL ORIENTE)',3),(44,'JADÁN',3),(45,'MARIANO MORENO',3),(46,'PRINCIPAL',3),(47,'REMIGIO CRESPO TORAL (GÚLAG)',3),(48,'SAN JUAN',3),(49,'ZHIDMAD',3),(50,'LUIS CORDERO VEGA',3),(51,'SIMÓN BOLÍVAR (CAB. EN GAÑANZOL)',3),(52,'NABÓN',4),(53,'COCHAPATA',4),(54,'EL PROGRESO (CAB.EN ZHOTA)',4),(55,'LAS NIEVES (CHAYA)',4),(56,'OÑA',4),(57,'PAUTE',5),(58,'AMALUZA',5),(59,'BULÁN (JOSÉ VÍCTOR IZQUIERDO)',5),(60,'CHICÁN (GUILLERMO ORTEGA)',5),(61,'EL CABO',5),(62,'GUACHAPALA',5),(63,'GUARAINAG',5),(64,'PALMAS',5),(65,'PAN',5),(66,'SAN CRISTÓBAL (CARLOS ORDÓÑEZ LAZO)',5),(67,'SEVILLA DE ORO',5),(68,'TOMEBAMBA',5),(69,'DUG DUG',5),(70,'PUCARÁ',6),(71,'CAMILO PONCE ENRÍQUEZ (CAB. EN RÍO 7 DE MOLLEPONGO)',6),(72,'SAN RAFAEL DE SHARUG',6),(73,'SAN FERNANDO',7),(74,'CHUMBLÍN',7),(75,'SANTA ISABEL (CHAGUARURCO)',8),(76,'ABDÓN CALDERÓN (LA UNIÓN)',8),(77,'EL CARMEN DE PIJILÍ',8),(78,'ZHAGLLI (SHAGLLI)',8),(79,'SAN SALVADOR DE CAÑARIBAMBA',8),(80,'SIGSIG',9),(81,'CUCHIL (CUTCHIL)',9),(82,'GIMA',9),(83,'GUEL',9),(84,'LUDO',9),(85,'SAN BARTOLOMÉ',9),(86,'SAN JOSÉ DE RARANGA',9),(87,'SAN FELIPE DE OÑA CABECERA CANTONAL',10),(88,'SUSUDEL',10),(89,'CHORDELEG',11),(90,'PRINCIPAL',11),(91,'LA UNIÓN',11),(92,'LUIS GALARZA ORELLANA (CAB.EN DELEGSOL)',11),(93,'SAN MARTÍN DE PUZHIO',11),(94,'EL PAN',12),(95,'AMALUZA',12),(96,'PALMAS',12),(97,'SAN VICENTE',12),(98,'SEVILLA DE ORO',13),(99,'AMALUZA',13),(100,'PALMAS',13),(101,'GUACHAPALA',14),(102,'CAMILO PONCE ENRÍQUEZ',15),(103,'EL CARMEN DE PIJILÍ',15),(104,'ÁNGEL POLIBIO CHÁVES',16),(105,'GABRIEL IGNACIO VEINTIMILLA',16),(106,'GUANUJO',16),(107,'GUARANDA',16),(108,'FACUNDO VELA',16),(109,'GUANUJO',16),(110,'JULIO E. MORENO (CATANAHUÁN GRANDE)',16),(111,'LAS NAVES',16),(112,'SALINAS',16),(113,'SAN LORENZO',16),(114,'SAN SIMÓN (YACOTO)',16),(115,'SANTA FÉ (SANTA FÉ)',16),(116,'SIMIÁTUG',16),(117,'SAN LUIS DE PAMBIL',16),(118,'CHILLANES',17),(119,'SAN JOSÉ DEL TAMBO (TAMBOPAMBA)',17),(120,'SAN JOSÉ DE CHIMBO',18),(121,'ASUNCIÓN (ASANCOTO)',18),(122,'CALUMA',18),(123,'MAGDALENA (CHAPACOTO)',18),(124,'SAN SEBASTIÁN',18),(125,'TELIMBELA',18),(126,'ECHEANDÍA',19),(127,'SAN MIGUEL',20),(128,'BALSAPAMBA',20),(129,'BILOVÁN',20),(130,'RÉGULO DE MORA',20),(131,'SAN PABLO (SAN PABLO DE ATENAS)',20),(132,'SANTIAGO',20),(133,'SAN VICENTE',20),(134,'CALUMA',21),(135,'LAS MERCEDES',22),(136,'LAS NAVES',22),(137,'LAS NAVES',22),(138,'AURELIO BAYAS MARTÍNEZ',23),(139,'AZOGUES',23),(140,'BORRERO',23),(141,'SAN FRANCISCO',23),(142,'AZOGUES',23),(143,'COJITAMBO',23),(144,'DÉLEG',23),(145,'GUAPÁN',23),(146,'JAVIER LOYOLA (CHUQUIPATA)',23),(147,'LUIS CORDERO',23),(148,'PINDILIG',23),(149,'RIVERA',23),(150,'SAN MIGUEL',23),(151,'SOLANO',23),(152,'TADAY',23),(153,'BIBLIÁN',24),(154,'NAZÓN (CAB. EN PAMPA DE DOMÍNGUEZ)',24),(155,'SAN FRANCISCO DE SAGEO',24),(156,'TURUPAMBA',24),(157,'JERUSALÉN',24),(158,'CAÑAR',25),(159,'CHONTAMARCA',25),(160,'CHOROCOPTE',25),(161,'GENERAL MORALES (SOCARTE)',25),(162,'GUALLETURO',25),(163,'HONORATO VÁSQUEZ (TAMBO VIEJO)',25),(164,'INGAPIRCA',25),(165,'JUNCAL',25),(166,'SAN ANTONIO',25),(167,'SUSCAL',25),(168,'TAMBO',25),(169,'ZHUD',25),(170,'VENTURA',25),(171,'DUCUR',25),(172,'LA TRONCAL',26),(173,'MANUEL J. CALLE',26),(174,'PANCHO NEGRO',26),(175,'EL TAMBO',27),(176,'DÉLEG',28),(177,'SOLANO',28),(178,'SUSCAL',29),(179,'GONZÁLEZ SUÁREZ',30),(180,'TULCÁN',30),(181,'TULCÁN',30),(182,'EL CARMELO (EL PUN)',30),(183,'HUACA',30),(184,'JULIO ANDRADE (OREJUELA)',30),(185,'MALDONADO',30),(186,'PIOTER',30),(187,'TOBAR DONOSO (LA BOCANA DE CAMUMBÍ)',30),(188,'TUFIÑO',30),(189,'URBINA (TAYA)',30),(190,'EL CHICAL',30),(191,'MARISCAL SUCRE',30),(192,'SANTA MARTHA DE CUBA',30),(193,'BOLÍVAR',31),(194,'GARCÍA MORENO',31),(195,'LOS ANDES',31),(196,'MONTE OLIVO',31),(197,'SAN VICENTE DE PUSIR',31),(198,'SAN RAFAEL',31),(199,'EL ÁNGEL',32),(200,'27 DE SEPTIEMBRE',32),(201,'EL ANGEL',32),(202,'EL GOALTAL',32),(203,'LA LIBERTAD (ALIZO)',32),(204,'SAN ISIDRO',32),(205,'MIRA (CHONTAHUASI)',33),(206,'CONCEPCIÓN',33),(207,'JIJÓN Y CAAMAÑO (CAB. EN RÍO BLANCO)',33),(208,'JUAN MONTALVO (SAN IGNACIO DE QUIL)',33),(209,'GONZÁLEZ SUÁREZ',34),(210,'SAN JOSÉ',34),(211,'SAN GABRIEL',34),(212,'CRISTÓBAL COLÓN',34),(213,'CHITÁN DE NAVARRETE',34),(214,'FERNÁNDEZ SALVADOR',34),(215,'LA PAZ',34),(216,'PIARTAL',34),(217,'HUACA',35),(218,'MARISCAL SUCRE',35),(219,'ELOY ALFARO (SAN FELIPE)',36),(220,'IGNACIO FLORES (PARQUE FLORES)',36),(221,'JUAN MONTALVO (SAN SEBASTIÁN)',36),(222,'LA MATRIZ',36),(223,'SAN BUENAVENTURA',36),(224,'LATACUNGA',36),(225,'ALAQUES (ALÁQUEZ)',36),(226,'BELISARIO QUEVEDO (GUANAILÍN)',36),(227,'GUAITACAMA (GUAYTACAMA)',36),(228,'JOSEGUANGO BAJO',36),(229,'LAS PAMPAS',36),(230,'MULALÓ',36),(231,'11 DE NOVIEMBRE (ILINCHISI)',36),(232,'POALÓ',36),(233,'SAN JUAN DE PASTOCALLE',36),(234,'SIGCHOS',36),(235,'TANICUCHÍ',36),(236,'TOACASO',36),(237,'PALO QUEMADO',36),(238,'EL CARMEN',37),(239,'LA MANÁ',37),(240,'EL TRIUNFO',37),(241,'LA MANÁ',37),(242,'GUASAGANDA (CAB.EN GUASAGANDA',37),(243,'PUCAYACU',37),(244,'EL CORAZÓN',38),(245,'MORASPUNGO',38),(246,'PINLLOPATA',38),(247,'RAMÓN CAMPAÑA',38),(248,'PUJILÍ',39),(249,'ANGAMARCA',39),(250,'CHUCCHILÁN (CHUGCHILÁN)',39),(251,'GUANGAJE',39),(252,'ISINLIBÍ (ISINLIVÍ)',39),(253,'LA VICTORIA',39),(254,'PILALÓ',39),(255,'TINGO',39),(256,'ZUMBAHUA',39),(257,'SAN MIGUEL',40),(258,'ANTONIO JOSÉ HOLGUÍN (SANTA LUCÍA)',40),(259,'CUSUBAMBA',40),(260,'MULALILLO',40),(261,'MULLIQUINDIL (SANTA ANA)',40),(262,'PANSALEO',40),(263,'SAQUISILÍ',41),(264,'CANCHAGUA',41),(265,'CHANTILÍN',41),(266,'COCHAPAMBA',41),(267,'SIGCHOS',42),(268,'CHUGCHILLÁN',42),(269,'ISINLIVÍ',42),(270,'LAS PAMPAS',42),(271,'PALO QUEMADO',42),(272,'LIZARZABURU',43),(273,'MALDONADO',43),(274,'VELASCO',43),(275,'VELOZ',43),(276,'YARUQUÍES',43),(277,'RIOBAMBA',43),(278,'CACHA (CAB. EN MACHÁNGARA)',43),(279,'CALPI',43),(280,'CUBIJÍES',43),(281,'FLORES',43),(282,'LICÁN',43),(283,'LICTO',43),(284,'PUNGALÁ',43),(285,'PUNÍN',43),(286,'QUIMIAG',43),(287,'SAN JUAN',43),(288,'SAN LUIS',43),(289,'ALAUSÍ',44),(290,'ACHUPALLAS',44),(291,'CUMANDÁ',44),(292,'GUASUNTOS',44),(293,'HUIGRA',44),(294,'MULTITUD',44),(295,'PISTISHÍ (NARIZ DEL DIABLO)',44),(296,'PUMALLACTA',44),(297,'SEVILLA',44),(298,'SIBAMBE',44),(299,'TIXÁN',44),(300,'CAJABAMBA',45),(301,'SICALPA',45),(302,'VILLA LA UNIÓN (CAJABAMBA)',45),(303,'CAÑI',45),(304,'COLUMBE',45),(305,'JUAN DE VELASCO (PANGOR)',45),(306,'SANTIAGO DE QUITO (CAB. EN SAN ANTONIO DE QUITO)',45),(307,'CHAMBO',46),(308,'CHUNCHI',47),(309,'CAPZOL',47),(310,'COMPUD',47),(311,'GONZOL',47),(312,'LLAGOS',47),(313,'GUAMOTE',48),(314,'CEBADAS',48),(315,'PALMIRA',48),(316,'EL ROSARIO',49),(317,'LA MATRIZ',49),(318,'GUANO',49),(319,'GUANANDO',49),(320,'ILAPO',49),(321,'LA PROVIDENCIA',49),(322,'SAN ANDRÉS',49),(323,'SAN GERARDO DE PACAICAGUÁN',49),(324,'SAN ISIDRO DE PATULÚ',49),(325,'SAN JOSÉ DEL CHAZO',49),(326,'SANTA FÉ DE GALÁN',49),(327,'VALPARAÍSO',49),(328,'PALLATANGA',50),(329,'PENIPE',51),(330,'EL ALTAR',51),(331,'MATUS',51),(332,'PUELA',51),(333,'SAN ANTONIO DE BAYUSHIG',51),(334,'LA CANDELARIA',51),(335,'BILBAO (CAB.EN QUILLUYACU)',51),(336,'CUMANDÁ',52),(337,'LA PROVIDENCIA',53),(338,'MACHALA',53),(339,'PUERTO BOLÍVAR',53),(340,'NUEVE DE MAYO',53),(341,'EL CAMBIO',53),(342,'MACHALA',53),(343,'EL CAMBIO',53),(344,'EL RETIRO',53),(345,'ARENILLAS',54),(346,'CHACRAS',54),(347,'LA LIBERTAD',54),(348,'LAS LAJAS (CAB. EN LA VICTORIA)',54),(349,'PALMALES',54),(350,'CARCABÓN',54),(351,'PACCHA',55),(352,'AYAPAMBA',55),(353,'CORDONCILLO',55),(354,'MILAGRO',55),(355,'SAN JOSÉ',55),(356,'SAN JUAN DE CERRO AZUL',55),(357,'BALSAS',56),(358,'BELLAMARÍA',56),(359,'CHILLA',57),(360,'EL GUABO',58),(361,'BARBONES (SUCRE)',58),(362,'LA IBERIA',58),(363,'TENDALES (CAB.EN PUERTO TENDALES)',58),(364,'RÍO BONITO',58),(365,'ECUADOR',59),(366,'EL PARAÍSO',59),(367,'HUALTACO',59),(368,'MILTON REYES',59),(369,'UNIÓN LOJANA',59),(370,'HUAQUILLAS',59),(371,'MARCABELÍ',60),(372,'EL INGENIO',60),(373,'BOLÍVAR',61),(374,'LOMA DE FRANCO',61),(375,'OCHOA LEÓN (MATRIZ)',61),(376,'TRES CERRITOS',61),(377,'PASAJE',61),(378,'BUENAVISTA',61),(379,'CASACAY',61),(380,'LA PEAÑA',61),(381,'PROGRESO',61),(382,'UZHCURRUMI',61),(383,'CAÑAQUEMADA',61),(384,'LA MATRIZ',62),(385,'LA SUSAYA',62),(386,'PIÑAS GRANDE',62),(387,'PIÑAS',62),(388,'CAPIRO (CAB. EN LA CAPILLA DE CAPIRO)',62),(389,'LA BOCANA',62),(390,'MOROMORO (CAB. EN EL VADO)',62),(391,'PIEDRAS',62),(392,'SAN ROQUE (AMBROSIO MALDONADO)',62),(393,'SARACAY',62),(394,'PORTOVELO',63),(395,'CURTINCAPA',63),(396,'MORALES',63),(397,'SALATÍ',63),(398,'SANTA ROSA',64),(399,'PUERTO JELÍ',64),(400,'BALNEARIO JAMBELÍ (SATÉLITE)',64),(401,'JUMÓN (SATÉLITE)',64),(402,'NUEVO SANTA ROSA',64),(403,'SANTA ROSA',64),(404,'BELLAVISTA',64),(405,'JAMBELÍ',64),(406,'LA AVANZADA',64),(407,'SAN ANTONIO',64),(408,'TORATA',64),(409,'VICTORIA',64),(410,'BELLAMARÍA',64),(411,'ZARUMA',65),(412,'ABAÑÍN',65),(413,'ARCAPAMBA',65),(414,'GUANAZÁN',65),(415,'GUIZHAGUIÑA',65),(416,'HUERTAS',65),(417,'MALVAS',65),(418,'MULUNCAY GRANDE',65),(419,'SINSAO',65),(420,'SALVIAS',65),(421,'LA VICTORIA',66),(422,'PLATANILLOS',66),(423,'VALLE HERMOSO',66),(424,'LA VICTORIA',66),(425,'LA LIBERTAD',66),(426,'EL PARAÍSO',66),(427,'SAN ISIDRO',66),(428,'BARTOLOMÉ RUIZ (CÉSAR FRANCO CARRIÓN)',67),(429,'5 DE AGOSTO',67),(430,'ESMERALDAS',67),(431,'LUIS TELLO (LAS PALMAS)',67),(432,'SIMÓN PLATA TORRES',67),(433,'ESMERALDAS',67),(434,'ATACAMES',67),(435,'CAMARONES (CAB. EN SAN VICENTE)',67),(436,'CRNEL. CARLOS CONCHA TORRES (CAB.EN HUELE)',67),(437,'CHINCA',67),(438,'CHONTADURO',67),(439,'CHUMUNDÉ',67),(440,'LAGARTO',67),(441,'LA UNIÓN',67),(442,'MAJUA',67),(443,'MONTALVO (CAB. EN HORQUETA)',67),(444,'RÍO VERDE',67),(445,'ROCAFUERTE',67),(446,'SAN MATEO',67),(447,'SÚA (CAB. EN LA BOCANA)',67),(448,'TABIAZO',67),(449,'TACHINA',67),(450,'TONCHIGÜE',67),(451,'VUELTA LARGA',67),(452,'VALDEZ (LIMONES)',68),(453,'ANCHAYACU',68),(454,'ATAHUALPA (CAB. EN CAMARONES)',68),(455,'BORBÓN',68),(456,'LA TOLA',68),(457,'LUIS VARGAS TORRES (CAB. EN PLAYA DE ORO)',68),(458,'MALDONADO',68),(459,'PAMPANAL DE BOLÍVAR',68),(460,'SAN FRANCISCO DE ONZOLE',68),(461,'SANTO DOMINGO DE ONZOLE',68),(462,'SELVA ALEGRE',68),(463,'TELEMBÍ',68),(464,'COLÓN ELOY DEL MARÍA',68),(465,'SAN JOSÉ DE CAYAPAS',68),(466,'TIMBIRÉ',68),(467,'MUISNE',69),(468,'BOLÍVAR',69),(469,'DAULE',69),(470,'GALERA',69),(471,'QUINGUE (OLMEDO PERDOMO FRANCO)',69),(472,'SALIMA',69),(473,'SAN FRANCISCO',69),(474,'SAN GREGORIO',69),(475,'SAN JOSÉ DE CHAMANGA (CAB.EN CHAMANGA)',69),(476,'ROSA ZÁRATE (QUININDÉ)',70),(477,'CUBE',70),(478,'CHURA (CHANCAMA) (CAB. EN EL YERBERO)',70),(479,'MALIMPIA',70),(480,'VICHE',70),(481,'LA UNIÓN',70),(482,'SAN LORENZO',71),(483,'ALTO TAMBO (CAB. EN GUADUAL)',71),(484,'ANCÓN (PICHANGAL) (CAB. EN PALMA REAL)',71),(485,'CALDERÓN',71),(486,'CARONDELET',71),(487,'5 DE JUNIO (CAB. EN UIMBI)',71),(488,'CONCEPCIÓN',71),(489,'MATAJE (CAB. EN SANTANDER)',71),(490,'SAN JAVIER DE CACHAVÍ (CAB. EN SAN JAVIER)',71),(491,'SANTA RITA',71),(492,'TAMBILLO',71),(493,'TULULBÍ (CAB. EN RICAURTE)',71),(494,'URBINA',71),(495,'ATACAMES',72),(496,'LA UNIÓN',72),(497,'SÚA (CAB. EN LA BOCANA)',72),(498,'TONCHIGÜE',72),(499,'TONSUPA',72),(500,'RIOVERDE',73),(501,'CHONTADURO',73),(502,'CHUMUNDÉ',73),(503,'LAGARTO',73),(504,'MONTALVO (CAB. EN HORQUETA)',73),(505,'ROCAFUERTE',73),(506,'LA CONCORDIA',74),(507,'MONTERREY',74),(508,'LA VILLEGAS',74),(509,'PLAN PILOTO',74),(510,'AYACUCHO',75),(511,'BOLÍVAR (SAGRARIO)',75),(512,'CARBO (CONCEPCIÓN)',75),(513,'FEBRES CORDERO',75),(514,'GARCÍA MORENO',75),(515,'LETAMENDI',75),(516,'NUEVE DE OCTUBRE',75),(517,'OLMEDO (SAN ALEJO)',75),(518,'ROCA',75),(519,'ROCAFUERTE',75),(520,'SUCRE',75),(521,'TARQUI',75),(522,'URDANETA',75),(523,'XIMENA',75),(524,'PASCUALES',75),(525,'GUAYAQUIL',75),(526,'CHONGÓN',75),(527,'JUAN GÓMEZ RENDÓN (PROGRESO)',75),(528,'MORRO',75),(529,'PASCUALES',75),(530,'PLAYAS (GRAL. VILLAMIL)',75),(531,'POSORJA',75),(532,'PUNÁ',75),(533,'TENGUEL',75),(534,'ALFREDO BAQUERIZO MORENO (JUJÁN)',76),(535,'BALAO',77),(536,'BALZAR',78),(537,'COLIMES',79),(538,'SAN JACINTO',79),(539,'DAULE',80),(540,'LA AURORA (SATÉLITE)',80),(541,'BANIFE',80),(542,'EMILIANO CAICEDO MARCOS',80),(543,'MAGRO',80),(544,'PADRE JUAN BAUTISTA AGUIRRE',80),(545,'SANTA CLARA',80),(546,'VICENTE PIEDRAHITA',80),(547,'DAULE',80),(548,'ISIDRO AYORA (SOLEDAD)',80),(549,'JUAN BAUTISTA AGUIRRE (LOS TINTOS)',80),(550,'LAUREL',80),(551,'LIMONAL',80),(552,'LOMAS DE SARGENTILLO',80),(553,'LOS LOJAS (ENRIQUE BAQUERIZO MORENO)',80),(554,'PIEDRAHITA (NOBOL)',80),(555,'ELOY ALFARO (DURÁN)',81),(556,'EL RECREO',81),(557,'ELOY ALFARO (DURÁN)',81),(558,'VELASCO IBARRA (EL EMPALME)',82),(559,'GUAYAS (PUEBLO NUEVO)',82),(560,'EL ROSARIO',82),(561,'EL TRIUNFO',83),(562,'MILAGRO',84),(563,'CHOBO',84),(564,'GENERAL ELIZALDE (BUCAY)',84),(565,'MARISCAL SUCRE (HUAQUES)',84),(566,'ROBERTO ASTUDILLO (CAB. EN CRUCE DE VENECIA)',84),(567,'NARANJAL',85),(568,'JESÚS MARÍA',85),(569,'SAN CARLOS',85),(570,'SANTA ROSA DE FLANDES',85),(571,'TAURA',85),(572,'NARANJITO',86),(573,'PALESTINA',87),(574,'PEDRO CARBO',88),(575,'VALLE DE LA VIRGEN',88),(576,'SABANILLA',88),(577,'SAMBORONDÓN',89),(578,'LA PUNTILLA (SATÉLITE)',89),(579,'SAMBORONDÓN',89),(580,'TARIFA',89),(581,'SANTA LUCÍA',90),(582,'BOCANA',91),(583,'CANDILEJOS',91),(584,'CENTRAL',91),(585,'PARAÍSO',91),(586,'SAN MATEO',91),(587,'EL SALITRE (LAS RAMAS)',91),(588,'GRAL. VERNAZA (DOS ESTEROS)',91),(589,'LA VICTORIA (ÑAUZA)',91),(590,'JUNQUILLAL',91),(591,'SAN JACINTO DE YAGUACHI',92),(592,'CRNEL. LORENZO DE GARAICOA (PEDREGAL)',92),(593,'CRNEL. MARCELINO MARIDUEÑA (SAN CARLOS)',92),(594,'GRAL. PEDRO J. MONTERO (BOLICHE)',92),(595,'SIMÓN BOLÍVAR',92),(596,'YAGUACHI VIEJO (CONE)',92),(597,'VIRGEN DE FÁTIMA',92),(598,'GENERAL VILLAMIL (PLAYAS)',93),(599,'SIMÓN BOLÍVAR',94),(600,'CRNEL.LORENZO DE GARAICOA (PEDREGAL)',94),(601,'CORONEL MARCELINO MARIDUEÑA (SAN CARLOS)',95),(602,'LOMAS DE SARGENTILLO',96),(603,'ISIDRO AYORA (SOLEDAD)',96),(604,'NARCISA DE JESÚS',97),(605,'GENERAL ANTONIO ELIZALDE (BUCAY)',98),(606,'ISIDRO AYORA',99),(607,'CARANQUI',100),(608,'GUAYAQUIL DE ALPACHACA',100),(609,'SAGRARIO',100),(610,'SAN FRANCISCO',100),(611,'LA DOLOROSA DEL PRIORATO',100),(612,'SAN MIGUEL DE IBARRA',100),(613,'AMBUQUÍ',100),(614,'ANGOCHAGUA',100),(615,'CAROLINA',100),(616,'LA ESPERANZA',100),(617,'LITA',100),(618,'SALINAS',100),(619,'SAN ANTONIO',100),(620,'ANDRADE MARÍN (LOURDES)',101),(621,'ATUNTAQUI',101),(622,'ATUNTAQUI',101),(623,'IMBAYA (SAN LUIS DE COBUENDO)',101),(624,'SAN FRANCISCO DE NATABUELA',101),(625,'SAN JOSÉ DE CHALTURA',101),(626,'SAN ROQUE',101),(627,'SAGRARIO',102),(628,'SAN FRANCISCO',102),(629,'COTACACHI',102),(630,'APUELA',102),(631,'GARCÍA MORENO (LLURIMAGUA)',102),(632,'IMANTAG',102),(633,'PEÑAHERRERA',102),(634,'PLAZA GUTIÉRREZ (CALVARIO)',102),(635,'QUIROGA',102),(636,'6 DE JULIO DE CUELLAJE (CAB. EN CUELLAJE)',102),(637,'VACAS GALINDO (EL CHURO) (CAB.EN SAN MIGUEL ALTO',102),(638,'JORDÁN',103),(639,'SAN LUIS',103),(640,'OTAVALO',103),(641,'DR. MIGUEL EGAS CABEZAS (PEGUCHE)',103),(642,'EUGENIO ESPEJO (CALPAQUÍ)',103),(643,'GONZÁLEZ SUÁREZ',103),(644,'PATAQUÍ',103),(645,'SAN JOSÉ DE QUICHINCHE',103),(646,'SAN JUAN DE ILUMÁN',103),(647,'SAN PABLO',103),(648,'SAN RAFAEL',103),(649,'SELVA ALEGRE (CAB.EN SAN MIGUEL DE PAMPLONA)',103),(650,'PIMAMPIRO',104),(651,'CHUGÁ',104),(652,'MARIANO ACOSTA',104),(653,'SAN FRANCISCO DE SIGSIPAMBA',104),(654,'URCUQUÍ CABECERA CANTONAL',105),(655,'CAHUASQUÍ',105),(656,'LA MERCED DE BUENOS AIRES',105),(657,'PABLO ARENAS',105),(658,'SAN BLAS',105),(659,'TUMBABIRO',105),(660,'EL SAGRARIO',106),(661,'SAN SEBASTIÁN',106),(662,'SUCRE',106),(663,'VALLE',106),(664,'LOJA',106),(665,'CHANTACO',106),(666,'CHUQUIRIBAMBA',106),(667,'EL CISNE',106),(668,'GUALEL',106),(669,'JIMBILLA',106),(670,'MALACATOS (VALLADOLID)',106),(671,'SAN LUCAS',106),(672,'SAN PEDRO DE VILCABAMBA',106),(673,'SANTIAGO',106),(674,'TAQUIL (MIGUEL RIOFRÍO)',106),(675,'VILCABAMBA (VICTORIA)',106),(676,'YANGANA (ARSENIO CASTILLO)',106),(677,'QUINARA',106),(678,'CARIAMANGA',107),(679,'CHILE',107),(680,'SAN VICENTE',107),(681,'CARIAMANGA',107),(682,'COLAISACA',107),(683,'EL LUCERO',107),(684,'UTUANA',107),(685,'SANGUILLÍN',107),(686,'CATAMAYO',108),(687,'SAN JOSÉ',108),(688,'CATAMAYO (LA TOMA)',108),(689,'EL TAMBO',108),(690,'GUAYQUICHUMA',108),(691,'SAN PEDRO DE LA BENDITA',108),(692,'ZAMBI',108),(693,'CELICA',109),(694,'CRUZPAMBA (CAB. EN CARLOS BUSTAMANTE)',109),(695,'CHAQUINAL',109),(696,'12 DE DICIEMBRE (CAB. EN ACHIOTES)',109),(697,'PINDAL (FEDERICO PÁEZ)',109),(698,'POZUL (SAN JUAN DE POZUL)',109),(699,'SABANILLA',109),(700,'TNTE. MAXIMILIANO RODRÍGUEZ LOAIZA',109),(701,'CHAGUARPAMBA',110),(702,'BUENAVISTA',110),(703,'EL ROSARIO',110),(704,'SANTA RUFINA',110),(705,'AMARILLOS',110),(706,'AMALUZA',111),(707,'BELLAVISTA',111),(708,'JIMBURA',111),(709,'SANTA TERESITA',111),(710,'27 DE ABRIL (CAB. EN LA NARANJA)',111),(711,'EL INGENIO',111),(712,'EL AIRO',111),(713,'GONZANAMÁ',112),(714,'CHANGAIMINA (LA LIBERTAD)',112),(715,'FUNDOCHAMBA',112),(716,'NAMBACOLA',112),(717,'PURUNUMA (EGUIGUREN)',112),(718,'QUILANGA (LA PAZ)',112),(719,'SACAPALCA',112),(720,'SAN ANTONIO DE LAS ARADAS (CAB. EN LAS ARADAS)',112),(721,'GENERAL ELOY ALFARO (SAN SEBASTIÁN)',113),(722,'MACARÁ (MANUEL ENRIQUE RENGEL SUQUILANDA)',113),(723,'MACARÁ',113),(724,'LARAMA',113),(725,'LA VICTORIA',113),(726,'SABIANGO (LA CAPILLA)',113),(727,'CATACOCHA',114),(728,'LOURDES',114),(729,'CATACOCHA',114),(730,'CANGONAMÁ',114),(731,'GUACHANAMÁ',114),(732,'LA TINGUE',114),(733,'LAURO GUERRERO',114),(734,'OLMEDO (SANTA BÁRBARA)',114),(735,'ORIANGA',114),(736,'SAN ANTONIO',114),(737,'CASANGA',114),(738,'YAMANA',114),(739,'ALAMOR',115),(740,'CIANO',115),(741,'EL ARENAL',115),(742,'EL LIMO (MARIANA DE JESÚS)',115),(743,'MERCADILLO',115),(744,'VICENTINO',115),(745,'SARAGURO',116),(746,'EL PARAÍSO DE CELÉN',116),(747,'EL TABLÓN',116),(748,'LLUZHAPA',116),(749,'MANÚ',116),(750,'SAN ANTONIO DE QUMBE (CUMBE)',116),(751,'SAN PABLO DE TENTA',116),(752,'SAN SEBASTIÁN DE YÚLUC',116),(753,'SELVA ALEGRE',116),(754,'URDANETA (PAQUISHAPA)',116),(755,'SUMAYPAMBA',116),(756,'SOZORANGA',117),(757,'NUEVA FÁTIMA',117),(758,'TACAMOROS',117),(759,'ZAPOTILLO',118),(760,'MANGAHURCO (CAZADEROS)',118),(761,'GARZAREAL',118),(762,'LIMONES',118),(763,'PALETILLAS',118),(764,'BOLASPAMBA',118),(765,'PINDAL',119),(766,'CHAQUINAL',119),(767,'12 DE DICIEMBRE (CAB.EN ACHIOTES)',119),(768,'MILAGROS',119),(769,'QUILANGA',120),(770,'FUNDOCHAMBA',120),(771,'SAN ANTONIO DE LAS ARADAS (CAB. EN LAS ARADAS)',120),(772,'OLMEDO',121),(773,'LA TINGUE',121),(774,'CLEMENTE BAQUERIZO',122),(775,'DR. CAMILO PONCE',122),(776,'BARREIRO',122),(777,'EL SALTO',122),(778,'BABAHOYO',122),(779,'BARREIRO (SANTA RITA)',122),(780,'CARACOL',122),(781,'FEBRES CORDERO (LAS JUNTAS)',122),(782,'PIMOCHA',122),(783,'LA UNIÓN',122),(784,'BABA',123),(785,'GUARE',123),(786,'ISLA DE BEJUCAL',123),(787,'MONTALVO',124),(788,'PUEBLOVIEJO',125),(789,'PUERTO PECHICHE',125),(790,'SAN JUAN',125),(791,'QUEVEDO',126),(792,'SAN CAMILO',126),(793,'SAN JOSÉ',126),(794,'GUAYACÁN',126),(795,'NICOLÁS INFANTE DÍAZ',126),(796,'SAN CRISTÓBAL',126),(797,'SIETE DE OCTUBRE',126),(798,'24 DE MAYO',126),(799,'VENUS DEL RÍO QUEVEDO',126),(800,'VIVA ALFARO',126),(801,'QUEVEDO',126),(802,'BUENA FÉ',126),(803,'MOCACHE',126),(804,'SAN CARLOS',126),(805,'VALENCIA',126),(806,'LA ESPERANZA',126),(807,'CATARAMA',127),(808,'RICAURTE',127),(809,'10 DE NOVIEMBRE',128),(810,'VENTANAS',128),(811,'QUINSALOMA',128),(812,'ZAPOTAL',128),(813,'CHACARITA',128),(814,'LOS ÁNGELES',128),(815,'VINCES',129),(816,'ANTONIO SOTOMAYOR (CAB. EN PLAYAS DE VINCES)',129),(817,'PALENQUE',129),(818,'PALENQUE',130),(819,'SAN JACINTO DE BUENA FÉ',131),(820,'7 DE AGOSTO',131),(821,'11 DE OCTUBRE',131),(822,'SAN JACINTO DE BUENA FÉ',131),(823,'PATRICIA PILAR',131),(824,'VALENCIA',132),(825,'MOCACHE',133),(826,'QUINSALOMA',134),(827,'PORTOVIEJO',135),(828,'12 DE MARZO',135),(829,'COLÓN',135),(830,'PICOAZÁ',135),(831,'SAN PABLO',135),(832,'ANDRÉS DE VERA',135),(833,'FRANCISCO PACHECO',135),(834,'18 DE OCTUBRE',135),(835,'SIMÓN BOLÍVAR',135),(836,'PORTOVIEJO',135),(837,'ABDÓN CALDERÓN (SAN FRANCISCO)',135),(838,'ALHAJUELA (BAJO GRANDE)',135),(839,'CRUCITA',135),(840,'PUEBLO NUEVO',135),(841,'RIOCHICO (RÍO CHICO)',135),(842,'SAN PLÁCIDO',135),(843,'CHIRIJOS',135),(844,'CALCETA',136),(845,'MEMBRILLO',136),(846,'QUIROGA',136),(847,'CHONE',137),(848,'SANTA RITA',137),(849,'CHONE',137),(850,'BOYACÁ',137),(851,'CANUTO',137),(852,'CONVENTO',137),(853,'CHIBUNGA',137),(854,'ELOY ALFARO',137),(855,'RICAURTE',137),(856,'SAN ANTONIO',137),(857,'EL CARMEN',138),(858,'4 DE DICIEMBRE',138),(859,'EL CARMEN',138),(860,'WILFRIDO LOOR MOREIRA (MAICITO)',138),(861,'SAN PEDRO DE SUMA',138),(862,'FLAVIO ALFARO',139),(863,'SAN FRANCISCO DE NOVILLO (CAB. EN',139),(864,'ZAPALLO',139),(865,'DR. MIGUEL MORÁN LUCIO',140),(866,'MANUEL INOCENCIO PARRALES Y GUALE',140),(867,'SAN LORENZO DE JIPIJAPA',140),(868,'JIPIJAPA',140),(869,'AMÉRICA',140),(870,'EL ANEGADO (CAB. EN ELOY ALFARO)',140),(871,'JULCUY',140),(872,'LA UNIÓN',140),(873,'MACHALILLA',140),(874,'MEMBRILLAL',140),(875,'PEDRO PABLO GÓMEZ',140),(876,'PUERTO DE CAYO',140),(877,'PUERTO LÓPEZ',140),(878,'JUNÍN',141),(879,'LOS ESTEROS',142),(880,'MANTA',142),(881,'SAN MATEO',142),(882,'TARQUI',142),(883,'ELOY ALFARO',142),(884,'MANTA',142),(885,'SAN LORENZO',142),(886,'SANTA MARIANITA (BOCA DE PACOCHE)',142),(887,'ANIBAL SAN ANDRÉS',143),(888,'MONTECRISTI',143),(889,'EL COLORADO',143),(890,'GENERAL ELOY ALFARO',143),(891,'LEONIDAS PROAÑO',143),(892,'MONTECRISTI',143),(893,'JARAMIJÓ',143),(894,'LA PILA',143),(895,'PAJÁN',144),(896,'CAMPOZANO (LA PALMA DE PAJÁN)',144),(897,'CASCOL',144),(898,'GUALE',144),(899,'LASCANO',144),(900,'PICHINCHA',145),(901,'BARRAGANETE',145),(902,'SAN SEBASTIÁN',145),(903,'ROCAFUERTE',146),(904,'SANTA ANA',147),(905,'LODANA',147),(906,'SANTA ANA DE VUELTA LARGA',147),(907,'AYACUCHO',147),(908,'HONORATO VÁSQUEZ (CAB. EN VÁSQUEZ)',147),(909,'LA UNIÓN',147),(910,'OLMEDO',147),(911,'SAN PABLO (CAB. EN PUEBLO NUEVO)',147),(912,'BAHÍA DE CARÁQUEZ',148),(913,'LEONIDAS PLAZA GUTIÉRREZ',148),(914,'BAHÍA DE CARÁQUEZ',148),(915,'CANOA',148),(916,'COJIMÍES',148),(917,'CHARAPOTÓ',148),(918,'10 DE AGOSTO',148),(919,'JAMA',148),(920,'PEDERNALES',148),(921,'SAN ISIDRO',148),(922,'SAN VICENTE',148),(923,'TOSAGUA',149),(924,'BACHILLERO',149),(925,'ANGEL PEDRO GILER (LA ESTANCILLA)',149),(926,'SUCRE',150),(927,'BELLAVISTA',150),(928,'NOBOA',150),(929,'ARQ. SIXTO DURÁN BALLÉN',150),(930,'PEDERNALES',151),(931,'COJIMÍES',151),(932,'10 DE AGOSTO',151),(933,'ATAHUALPA',151),(934,'OLMEDO',152),(935,'PUERTO LÓPEZ',153),(936,'MACHALILLA',153),(937,'SALANGO',153),(938,'JAMA',154),(939,'JARAMIJÓ',155),(940,'SAN VICENTE',156),(941,'CANOA',156),(942,'MACAS',157),(943,'ALSHI (CAB. EN 9 DE OCTUBRE)',157),(944,'CHIGUAZA',157),(945,'GENERAL PROAÑO',157),(946,'HUASAGA (CAB.EN WAMPUIK)',157),(947,'MACUMA',157),(948,'SAN ISIDRO',157),(949,'SEVILLA DON BOSCO',157),(950,'SINAÍ',157),(951,'TAISHA',157),(952,'ZUÑA (ZÚÑAC)',157),(953,'TUUTINENTZA',157),(954,'CUCHAENTZA',157),(955,'SAN JOSÉ DE MORONA',157),(956,'RÍO BLANCO',157),(957,'GUALAQUIZA',158),(958,'MERCEDES MOLINA',158),(959,'GUALAQUIZA',158),(960,'AMAZONAS (ROSARIO DE CUYES)',158),(961,'BERMEJOS',158),(962,'BOMBOIZA',158),(963,'CHIGÜINDA',158),(964,'EL ROSARIO',158),(965,'NUEVA TARQUI',158),(966,'SAN MIGUEL DE CUYES',158),(967,'EL IDEAL',158),(968,'GENERAL LEONIDAS PLAZA GUTIÉRREZ (LIMÓN)',159),(969,'INDANZA',159),(970,'PAN DE AZÚCAR',159),(971,'SAN ANTONIO (CAB. EN SAN ANTONIO CENTRO',159),(972,'SAN CARLOS DE LIMÓN (SAN CARLOS DEL',159),(973,'SAN JUAN BOSCO',159),(974,'SAN MIGUEL DE CONCHAY',159),(975,'SANTA SUSANA DE CHIVIAZA (CAB. EN CHIVIAZA)',159),(976,'YUNGANZA (CAB. EN EL ROSARIO)',159),(977,'PALORA (METZERA)',160),(978,'ARAPICOS',160),(979,'CUMANDÁ (CAB. EN COLONIA AGRÍCOLA SEVILLA DEL ORO)',160),(980,'HUAMBOYA',160),(981,'SANGAY (CAB. EN NAYAMANACA)',160),(982,'SANTIAGO DE MÉNDEZ',161),(983,'COPAL',161),(984,'CHUPIANZA',161),(985,'PATUCA',161),(986,'SAN LUIS DE EL ACHO (CAB. EN EL ACHO)',161),(987,'SANTIAGO',161),(988,'TAYUZA',161),(989,'SAN FRANCISCO DE CHINIMBIMI',161),(990,'SUCÚA',162),(991,'ASUNCIÓN',162),(992,'HUAMBI',162),(993,'LOGROÑO',162),(994,'YAUPI',162),(995,'SANTA MARIANITA DE JESÚS',162),(996,'HUAMBOYA',163),(997,'CHIGUAZA',163),(998,'PABLO SEXTO',163),(999,'SAN JUAN BOSCO',164),(1000,'PAN DE AZÚCAR',164),(1001,'SAN CARLOS DE LIMÓN',164),(1002,'SAN JACINTO DE WAKAMBEIS',164),(1003,'SANTIAGO DE PANANZA',164),(1004,'TAISHA',165),(1005,'HUASAGA (CAB. EN WAMPUIK)',165),(1006,'MACUMA',165),(1007,'TUUTINENTZA',165),(1008,'PUMPUENTSA',165),(1009,'LOGROÑO',166),(1010,'YAUPI',166),(1011,'SHIMPIS',166),(1012,'PABLO SEXTO',167),(1013,'SANTIAGO',168),(1014,'SAN JOSÉ DE MORONA',168),(1015,'TENA',169),(1016,'AHUANO',169),(1017,'CARLOS JULIO AROSEMENA TOLA (ZATZA-YACU)',169),(1018,'CHONTAPUNTA',169),(1019,'PANO',169),(1020,'PUERTO MISAHUALLI',169),(1021,'PUERTO NAPO',169),(1022,'TÁLAG',169),(1023,'SAN JUAN DE MUYUNA',169),(1024,'ARCHIDONA',170),(1025,'AVILA',170),(1026,'COTUNDO',170),(1027,'LORETO',170),(1028,'SAN PABLO DE USHPAYACU',170),(1029,'PUERTO MURIALDO',170),(1030,'EL CHACO',171),(1031,'GONZALO DíAZ DE PINEDA (EL BOMBÓN)',171),(1032,'LINARES',171),(1033,'OYACACHI',171),(1034,'SANTA ROSA',171),(1035,'SARDINAS',171),(1036,'BAEZA',172),(1037,'COSANGA',172),(1038,'CUYUJA',172),(1039,'PAPALLACTA',172),(1040,'SAN FRANCISCO DE BORJA (VIRGILIO DÁVILA)',172),(1041,'SAN JOSÉ DEL PAYAMINO',172),(1042,'SUMACO',172),(1043,'CARLOS JULIO AROSEMENA TOLA',173),(1044,'PUYO',174),(1045,'ARAJUNO',174),(1046,'CANELOS',174),(1047,'CURARAY',174),(1048,'DIEZ DE AGOSTO',174),(1049,'FÁTIMA',174),(1050,'MONTALVO (ANDOAS)',174),(1051,'POMONA',174),(1052,'RÍO CORRIENTES',174),(1053,'RÍO TIGRE',174),(1054,'SANTA CLARA',174),(1055,'SARAYACU',174),(1056,'SIMÓN BOLÍVAR (CAB. EN MUSHULLACTA)',174),(1057,'TARQUI',174),(1058,'TENIENTE HUGO ORTIZ',174),(1059,'VERACRUZ (INDILLAMA) (CAB. EN INDILLAMA)',174),(1060,'EL TRIUNFO',174),(1061,'MERA',175),(1062,'MADRE TIERRA',175),(1063,'SHELL',175),(1064,'SANTA CLARA',176),(1065,'SAN JOSÉ',176),(1066,'ARAJUNO',177),(1067,'CURARAY',177),(1068,'BELISARIO QUEVEDO',178),(1069,'CARCELÉN',178),(1070,'CENTRO HISTÓRICO',178),(1071,'COCHAPAMBA',178),(1072,'COMITÉ DEL PUEBLO',178),(1073,'COTOCOLLAO',178),(1074,'CHILIBULO',178),(1075,'CHILLOGALLO',178),(1076,'CHIMBACALLE',178),(1077,'EL CONDADO',178),(1078,'GUAMANÍ',178),(1079,'IÑAQUITO',178),(1080,'ITCHIMBÍA',178),(1081,'JIPIJAPA',178),(1082,'KENNEDY',178),(1083,'LA ARGELIA',178),(1084,'LA CONCEPCIÓN',178),(1085,'LA ECUATORIANA',178),(1086,'LA FERROVIARIA',178),(1087,'LA LIBERTAD',178),(1088,'LA MAGDALENA',178),(1089,'LA MENA',178),(1090,'MARISCAL SUCRE',178),(1091,'PONCEANO',178),(1092,'PUENGASÍ',178),(1093,'QUITUMBE',178),(1094,'RUMIPAMBA',178),(1095,'SAN BARTOLO',178),(1096,'SAN ISIDRO DEL INCA',178),(1097,'SAN JUAN',178),(1098,'SOLANDA',178),(1099,'TURUBAMBA',178),(1100,'QUITO DISTRITO METROPOLITANO',178),(1101,'ALANGASÍ',178),(1102,'AMAGUAÑA',178),(1103,'ATAHUALPA',178),(1104,'CALACALÍ',178),(1105,'CALDERÓN',178),(1106,'CONOCOTO',178),(1107,'CUMBAYÁ',178),(1108,'CHAVEZPAMBA',178),(1109,'CHECA',178),(1110,'EL QUINCHE',178),(1111,'GUALEA',178),(1112,'GUANGOPOLO',178),(1113,'GUAYLLABAMBA',178),(1114,'LA MERCED',178),(1115,'LLANO CHICO',178),(1116,'LLOA',178),(1117,'MINDO',178),(1118,'NANEGAL',178),(1119,'NANEGALITO',178),(1120,'NAYÓN',178),(1121,'NONO',178),(1122,'PACTO',178),(1123,'PEDRO VICENTE MALDONADO',178),(1124,'PERUCHO',178),(1125,'PIFO',178),(1126,'PÍNTAG',178),(1127,'POMASQUI',178),(1128,'PUÉLLARO',178),(1129,'PUEMBO',178),(1130,'SAN ANTONIO',178),(1131,'SAN JOSÉ DE MINAS',178),(1132,'SAN MIGUEL DE LOS BANCOS',178),(1133,'TABABELA',178),(1134,'TUMBACO',178),(1135,'YARUQUÍ',178),(1136,'ZAMBIZA',178),(1137,'PUERTO QUITO',178),(1138,'AYORA',179),(1139,'CAYAMBE',179),(1140,'JUAN MONTALVO',179),(1141,'CAYAMBE',179),(1142,'ASCÁZUBI',179),(1143,'CANGAHUA',179),(1144,'OLMEDO (PESILLO)',179),(1145,'OTÓN',179),(1146,'SANTA ROSA DE CUZUBAMBA',179),(1147,'MACHACHI',180),(1148,'ALÓAG',180),(1149,'ALOASÍ',180),(1150,'CUTUGLAHUA',180),(1151,'EL CHAUPI',180),(1152,'MANUEL CORNEJO ASTORGA (TANDAPI)',180),(1153,'TAMBILLO',180),(1154,'UYUMBICHO',180),(1155,'TABACUNDO',181),(1156,'LA ESPERANZA',181),(1157,'MALCHINGUÍ',181),(1158,'TOCACHI',181),(1159,'TUPIGACHI',181),(1160,'SANGOLQUÍ',182),(1161,'SAN PEDRO DE TABOADA',182),(1162,'SAN RAFAEL',182),(1163,'SANGOLQUI',182),(1164,'COTOGCHOA',182),(1165,'RUMIPAMBA',182),(1166,'SAN MIGUEL DE LOS BANCOS',183),(1167,'MINDO',183),(1168,'PEDRO VICENTE MALDONADO',183),(1169,'PUERTO QUITO',183),(1170,'PEDRO VICENTE MALDONADO',184),(1171,'PUERTO QUITO',185),(1172,'ATOCHA – FICOA',186),(1173,'CELIANO MONGE',186),(1174,'HUACHI CHICO',186),(1175,'HUACHI LORETO',186),(1176,'LA MERCED',186),(1177,'LA PENÍNSULA',186),(1178,'MATRIZ',186),(1179,'PISHILATA',186),(1180,'SAN FRANCISCO',186),(1181,'AMBATO',186),(1182,'AMBATILLO',186),(1183,'ATAHUALPA (CHISALATA)',186),(1184,'AUGUSTO N. MARTÍNEZ (MUNDUGLEO)',186),(1185,'CONSTANTINO FERNÁNDEZ (CAB. EN CULLITAHUA)',186),(1186,'HUACHI GRANDE',186),(1187,'IZAMBA',186),(1188,'JUAN BENIGNO VELA',186),(1189,'MONTALVO',186),(1190,'PASA',186),(1191,'PICAIGUA',186),(1192,'PILAGÜÍN (PILAHÜÍN)',186),(1193,'QUISAPINCHA (QUIZAPINCHA)',186),(1194,'SAN BARTOLOMÉ DE PINLLOG',186),(1195,'SAN FERNANDO (PASA SAN FERNANDO)',186),(1196,'SANTA ROSA',186),(1197,'TOTORAS',186),(1198,'CUNCHIBAMBA',186),(1199,'UNAMUNCHO',186),(1200,'BAÑOS DE AGUA SANTA',187),(1201,'LLIGUA',187),(1202,'RÍO NEGRO',187),(1203,'RÍO VERDE',187),(1204,'ULBA',187),(1205,'CEVALLOS',188),(1206,'MOCHA',189),(1207,'PINGUILÍ',189),(1208,'PATATE',190),(1209,'EL TRIUNFO',190),(1210,'LOS ANDES (CAB. EN POATUG)',190),(1211,'SUCRE (CAB. EN SUCRE-PATATE URCU)',190),(1212,'QUERO',191),(1213,'RUMIPAMBA',191),(1214,'YANAYACU - MOCHAPATA (CAB. EN YANAYACU)',191),(1215,'PELILEO',192),(1216,'PELILEO GRANDE',192),(1217,'PELILEO',192),(1218,'BENÍTEZ (PACHANLICA)',192),(1219,'BOLÍVAR',192),(1220,'COTALÓ',192),(1221,'CHIQUICHA (CAB. EN CHIQUICHA GRANDE)',192),(1222,'EL ROSARIO (RUMICHACA)',192),(1223,'GARCÍA MORENO (CHUMAQUI)',192),(1224,'GUAMBALÓ (HUAMBALÓ)',192),(1225,'SALASACA',192),(1226,'CIUDAD NUEVA',193),(1227,'PÍLLARO',193),(1228,'PÍLLARO',193),(1229,'BAQUERIZO MORENO',193),(1230,'EMILIO MARÍA TERÁN (RUMIPAMBA)',193),(1231,'MARCOS ESPINEL (CHACATA)',193),(1232,'PRESIDENTE URBINA (CHAGRAPAMBA -PATZUCUL)',193),(1233,'SAN ANDRÉS',193),(1234,'SAN JOSÉ DE POALÓ',193),(1235,'SAN MIGUELITO',193),(1236,'TISALEO',194),(1237,'QUINCHICOTO',194),(1238,'EL LIMÓN',195),(1239,'ZAMORA',195),(1240,'ZAMORA',195),(1241,'CUMBARATZA',195),(1242,'GUADALUPE',195),(1243,'IMBANA (LA VICTORIA DE IMBANA)',195),(1244,'PAQUISHA',195),(1245,'SABANILLA',195),(1246,'TIMBARA',195),(1247,'ZUMBI',195),(1248,'SAN CARLOS DE LAS MINAS',195),(1249,'ZUMBA',196),(1250,'CHITO',196),(1251,'EL CHORRO',196),(1252,'EL PORVENIR DEL CARMEN',196),(1253,'LA CHONTA',196),(1254,'PALANDA',196),(1255,'PUCAPAMBA',196),(1256,'SAN FRANCISCO DEL VERGEL',196),(1257,'VALLADOLID',196),(1258,'SAN ANDRÉS',196),(1259,'GUAYZIMI',197),(1260,'ZURMI',197),(1261,'NUEVO PARAÍSO',197),(1262,'28 DE MAYO (SAN JOSÉ DE YACUAMBI)',198),(1263,'LA PAZ',198),(1264,'TUTUPALI',198),(1265,'YANTZAZA (YANZATZA)',199),(1266,'CHICAÑA',199),(1267,'EL PANGUI',199),(1268,'LOS ENCUENTROS',199),(1269,'EL PANGUI',200),(1270,'EL GUISME',200),(1271,'PACHICUTZA',200),(1272,'TUNDAYME',200),(1273,'ZUMBI',201),(1274,'PAQUISHA',201),(1275,'TRIUNFO-DORADO',201),(1276,'PANGUINTZA',201),(1277,'PALANDA',202),(1278,'EL PORVENIR DEL CARMEN',202),(1279,'SAN FRANCISCO DEL VERGEL',202),(1280,'VALLADOLID',202),(1281,'LA CANELA',202),(1282,'PAQUISHA',203),(1283,'BELLAVISTA',203),(1284,'NUEVO QUITO',203),(1285,'PUERTO BAQUERIZO MORENO',204),(1286,'EL PROGRESO',204),(1287,'ISLA SANTA MARÍA (FLOREANA) (CAB. EN PTO. VELASCO IBARRA)',204),(1288,'PUERTO VILLAMIL',205),(1289,'TOMÁS DE BERLANGA (SANTO TOMÁS)',205),(1290,'PUERTO AYORA',206),(1291,'BELLAVISTA',206),(1292,'SANTA ROSA (INCLUYE LA ISLA BALTRA)',206),(1293,'NUEVA LOJA',207),(1294,'CUYABENO',207),(1295,'DURENO',207),(1296,'GENERAL FARFÁN',207),(1297,'TARAPOA',207),(1298,'EL ENO',207),(1299,'PACAYACU',207),(1300,'JAMBELÍ',207),(1301,'SANTA CECILIA',207),(1302,'AGUAS NEGRAS',207),(1303,'EL DORADO DE CASCALES',208),(1304,'EL REVENTADOR',208),(1305,'GONZALO PIZARRO',208),(1306,'LUMBAQUÍ',208),(1307,'PUERTO LIBRE',208),(1308,'SANTA ROSA DE SUCUMBÍOS',208),(1309,'PUERTO EL CARMEN DEL PUTUMAYO',209),(1310,'PALMA ROJA',209),(1311,'PUERTO BOLÍVAR (PUERTO MONTÚFAR)',209),(1312,'PUERTO RODRÍGUEZ',209),(1313,'SANTA ELENA',209),(1314,'SHUSHUFINDI',210),(1315,'LIMONCOCHA',210),(1316,'PAÑACOCHA',210),(1317,'SAN ROQUE (CAB. EN SAN VICENTE)',210),(1318,'SAN PEDRO DE LOS COFANES',210),(1319,'SIETE DE JULIO',210),(1320,'LA BONITA',211),(1321,'EL PLAYÓN DE SAN FRANCISCO',211),(1322,'LA SOFÍA',211),(1323,'ROSA FLORIDA',211),(1324,'SANTA BÁRBARA',211),(1325,'EL DORADO DE CASCALES',212),(1326,'SANTA ROSA DE SUCUMBÍOS',212),(1327,'SEVILLA',212),(1328,'TARAPOA',213),(1329,'CUYABENO',213),(1330,'AGUAS NEGRAS',213),(1331,'PUERTO FRANCISCO DE ORELLANA (EL COCA)',214),(1332,'DAYUMA',214),(1333,'TARACOA (NUEVA ESPERANZA: YUCA)',214),(1334,'ALEJANDRO LABAKA',214),(1335,'EL DORADO',214),(1336,'EL EDÉN',214),(1337,'GARCÍA MORENO',214),(1338,'INÉS ARANGO (CAB. EN WESTERN)',214),(1339,'LA BELLEZA',214),(1340,'NUEVO PARAÍSO (CAB. EN UNIÓN',214),(1341,'SAN JOSÉ DE GUAYUSA',214),(1342,'SAN LUIS DE ARMENIA',214),(1343,'TIPITINI',215),(1344,'NUEVO ROCAFUERTE',215),(1345,'CAPITÁN AUGUSTO RIVADENEYRA',215),(1346,'CONONACO',215),(1347,'SANTA MARÍA DE HUIRIRIMA',215),(1348,'TIPUTINI',215),(1349,'YASUNÍ',215),(1350,'LA JOYA DE LOS SACHAS',216),(1351,'ENOKANQUI',216),(1352,'POMPEYA',216),(1353,'SAN CARLOS',216),(1354,'SAN SEBASTIÁN DEL COCA',216),(1355,'LAGO SAN PEDRO',216),(1356,'RUMIPAMBA',216),(1357,'TRES DE NOVIEMBRE',216),(1358,'UNIÓN MILAGREÑA',216),(1359,'LORETO',217),(1360,'AVILA (CAB. EN HUIRUNO)',217),(1361,'PUERTO MURIALDO',217),(1362,'SAN JOSÉ DE PAYAMINO',217),(1363,'SAN JOSÉ DE DAHUANO',217),(1364,'SAN VICENTE DE HUATICOCHA',217),(1365,'ABRAHAM CALAZACÓN',218),(1366,'BOMBOLÍ',218),(1367,'CHIGUILPE',218),(1368,'RÍO TOACHI',218),(1369,'RÍO VERDE',218),(1370,'SANTO DOMINGO DE LOS COLORADOS',218),(1371,'ZARACAY',218),(1372,'SANTO DOMINGO DE LOS COLORADOS',218),(1373,'ALLURIQUÍN',218),(1374,'PUERTO LIMÓN',218),(1375,'LUZ DE AMÉRICA',218),(1376,'SAN JACINTO DEL BÚA',218),(1377,'VALLE HERMOSO',218),(1378,'EL ESFUERZO',218),(1379,'SANTA MARÍA DEL TOACHI',218),(1380,'BALLENITA',219),(1381,'SANTA ELENA',219),(1382,'SANTA ELENA',219),(1383,'ATAHUALPA',219),(1384,'COLONCHE',219),(1385,'CHANDUY',219),(1386,'MANGLARALTO',219),(1387,'SIMÓN BOLÍVAR (JULIO MORENO)',219),(1388,'SAN JOSÉ DE ANCÓN',219),(1389,'LA LIBERTAD',220),(1390,'CARLOS ESPINOZA LARREA',221),(1391,'GRAL. ALBERTO ENRÍQUEZ GALLO',221),(1392,'VICENTE ROCAFUERTE',221),(1393,'SANTA ROSA',221),(1394,'SALINAS',221),(1395,'ANCONCITO',221),(1396,'JOSÉ LUIS TAMAYO (MUEY)',221);
/*!40000 ALTER TABLE `parroquia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `presentacion`
--

DROP TABLE IF EXISTS `presentacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `presentacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `abreviatura` varchar(10) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presentacion`
--

LOCK TABLES `presentacion` WRITE;
/*!40000 ALTER TABLE `presentacion` DISABLE KEYS */;
INSERT INTO `presentacion` VALUES (1,'Quintal','Qm','Quintal'),(2,'Unidad','ud','Unida'),(3,'Tonelada','Tn','Tonelada'),(4,'Libra','lb','Libra de Producto');
/*!40000 ALTER TABLE `presentacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pvp` decimal(9,2) DEFAULT NULL,
  `pcp` decimal(9,2) DEFAULT NULL,
  `stock` int NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `presentacion_id` int NOT NULL,
  `producto_base_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `producto_presentacion_id_15185bfb_fk_presentacion_id` (`presentacion_id`),
  KEY `producto_producto_base_id_0f2b6bb5_fk_producto_base_id` (`producto_base_id`),
  CONSTRAINT `producto_presentacion_id_15185bfb_fk_presentacion_id` FOREIGN KEY (`presentacion_id`) REFERENCES `presentacion` (`id`),
  CONSTRAINT `producto_producto_base_id_0f2b6bb5_fk_producto_base_id` FOREIGN KEY (`producto_base_id`) REFERENCES `producto_base` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,8.40,6.00,60,'producto/imagen/holcim_fuerte1.png',1,1),(2,11.20,8.00,3,'producto/imagen/martillo.jpg',2,2),(3,1.40,1.00,2,'producto/imagen/fleo_IoshJvt.jpg',2,4),(11,7.00,5.00,18,'producto/imagen/Serrote.png',2,3);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto_base`
--

DROP TABLE IF EXISTS `producto_base`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto_base` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `categoria_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `producto_base_categoria_id_87d8a24f_fk_categoria_id` (`categoria_id`),
  CONSTRAINT `producto_base_categoria_id_87d8a24f_fk_categoria_id` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto_base`
--

LOCK TABLES `producto_base` WRITE;
/*!40000 ALTER TABLE `producto_base` DISABLE KEYS */;
INSERT INTO `producto_base` VALUES (1,'Cemento Chimborazo','Cemento Chimborazo',1),(2,'Martillo','Martillo',2),(3,'Serrucho','Serrucho',2),(4,'Flexometro','Flexometro',2),(5,'Arena','Arena de construccion',1);
/*!40000 ALTER TABLE `producto_base` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `tipo` int NOT NULL,
  `num_doc` varchar(13) NOT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `telefono` varchar(10) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `num_doc` (`num_doc`),
  UNIQUE KEY `telefono` (`telefono`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` VALUES (1,'Cemento Chimborazo',1,'0604551580001','ventas@gmail.com','0994695485','Km 5.5 via Colta, Riobamba','2021-02-08'),(2,'Ferrisariato',0,'0604551580','evega87@gmail.com','0994695748','Av. 17 de Septiembre, Shopping Milagro','2021-02-08');
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provincia`
--

DROP TABLE IF EXISTS `provincia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provincia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provincia`
--

LOCK TABLES `provincia` WRITE;
/*!40000 ALTER TABLE `provincia` DISABLE KEYS */;
INSERT INTO `provincia` VALUES (1,'AZUAY'),(2,'BOLIVAR'),(3,'CAÑAR'),(4,'CARCHI'),(5,'COTOPAXI'),(6,'CHIMBORAZO'),(7,'EL ORO'),(8,'ESMERALDAS'),(9,'GUAYAS'),(10,'IMBABURA'),(11,'LOJA'),(12,'LOS RIOS'),(13,'MANABI'),(14,'MORONA SANTIAGO'),(15,'NAPO'),(16,'PASTAZA'),(17,'PICHINCHA'),(18,'TUNGURAHUA'),(19,'ZAMORA CHINCHIPE'),(20,'GALAPAGOS'),(21,'SUCUMBIOS'),(22,'ORELLANA'),(23,'SANTO DOMINGO DE LOS TSACHILAS'),(24,'SANTA ELENA');
/*!40000 ALTER TABLE `provincia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respaldo_datos`
--

DROP TABLE IF EXISTS `respaldo_datos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `respaldo_datos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `archive` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `respaldo_datos_user_id_176f4541_fk_usuario_id` (`user_id`),
  CONSTRAINT `respaldo_datos_user_id_176f4541_fk_usuario_id` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respaldo_datos`
--

LOCK TABLES `respaldo_datos` WRITE;
/*!40000 ALTER TABLE `respaldo_datos` DISABLE KEYS */;
/*!40000 ALTER TABLE `respaldo_datos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sitio`
--

DROP TABLE IF EXISTS `sitio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sitio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(50) NOT NULL,
  `mision` varchar(500) NOT NULL,
  `vision` varchar(500) NOT NULL,
  `acerca` varchar(500) DEFAULT NULL,
  `coordenadas` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sitio`
--

LOCK TABLES `sitio` WRITE;
/*!40000 ALTER TABLE `sitio` DISABLE KEYS */;
INSERT INTO `sitio` VALUES (1,'Sistema de informacion','Descripcion Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, natus. Doloribus neque tempore qui saepe voluptate. eserunt nihil doloribus facilis quos eos, tempore magni iure magnam impedit reiciendis eligendi dignissimos.  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus nostrum ipsam officiis iste odit. Magnam corporis, assumenda ullam illum at voluptatem totam iure explicabo nesciunt sed neque officia odio in. Odit sunt harum expedita, sint quasi corporis','Descripción Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, natus. Doloribus neque tempore qui saepe voluptate. eserunt nihil doloribus facilis quos eos, tempore magni iure magnam impedit reiciendis eligendi dignissimos.  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus nostrum ipsam officiis iste odit. Magnam corporis, assumenda ullam illum at voluptatem totam iure explicabo nesciunt sed neque officia odio in. Odit sunt harum expedita, sint quasi corporis',NULL,NULL);
/*!40000 ALTER TABLE `sitio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_gasto`
--

DROP TABLE IF EXISTS `tipo_gasto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_gasto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_gasto`
--

LOCK TABLES `tipo_gasto` WRITE;
/*!40000 ALTER TABLE `tipo_gasto` DISABLE KEYS */;
INSERT INTO `tipo_gasto` VALUES (1,'Pago de Agua');
/*!40000 ALTER TABLE `tipo_gasto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `cedula` varchar(10) NOT NULL,
  `celular` varchar(10) DEFAULT NULL,
  `telefono` varchar(9) DEFAULT NULL,
  `direccion` varchar(500) DEFAULT NULL,
  `sexo` int NOT NULL,
  `estado` int NOT NULL,
  `tipo` int NOT NULL,
  `token` char(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `cedula` (`cedula`),
  UNIQUE KEY `celular` (`celular`),
  UNIQUE KEY `telefono` (`telefono`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'pbkdf2_sha256$216000$X8CNXPzMM5Sy$wDWx7Zj4p54wotJQgO+8g9GJY54y++J+V8AC7hlaFCU=','2025-08-28 16:10:25.775975',1,'admin','Administrador','General','admin@gmail.com',1,1,'2021-02-06 19:30:44.000000','','0604551580','0994695413','099469541','Rosa Maria 2',1,1,1,NULL),(2,'pbkdf2_sha256$216000$Ts3yIa7RMoKj$9F5rSijwuukvoNOsbhTEA1n8bDF9lNgaKYySyZLj//o=',NULL,0,'cliente','Christian','General','gerencia@gmail.com',0,1,'2021-05-09 01:23:14.345000','','0104071758','0994695415',NULL,'Milagro',1,1,0,NULL),(18,'pbkdf2_sha256$216000$NnzL8LQXbsMK$Oz4kbZb0JupWWAtny5xYzcdIWHk2Fe4eARBNJ+Da4Ok=','2021-05-17 20:07:51.714000',0,'0601899396','Daniel Antonio','Calderon Avila','laca@gmail.com',0,1,'2021-05-09 16:23:43.056000','','0601899396','0994695417',NULL,'Milagro',1,1,0,NULL),(19,'pbkdf2_sha256$216000$hMoldMYFcuW1$UEpXuI2tVNDjAuUuHAP1SFMmyErIo1y2nqQucyHq//s=','2021-05-18 14:12:54.920000',0,'0942445511','Maria Fernanada','Vergara Merelo','hola@hotmail.com',0,1,'2021-05-17 20:23:15.172000','','0942445511','0959554575','032954247','Milagro',0,1,0,NULL),(20,'pbkdf2_sha256$216000$PYia2Vc5vTxP$62Iw7s6lZMPVHRUCNHGf36dcD7NpEv0fohkillgCbRM=',NULL,0,'0911924116','Maia de Lourdes','Mendoza Mendez','vemema18@gmail.com',0,1,'2021-05-18 21:58:07.145000','','0911924116','0981327628','042721010','Naranjito',0,1,0,NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_groups`
--

DROP TABLE IF EXISTS `usuario_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_groups_user_id_group_id_a743d7e7_uniq` (`user_id`,`group_id`),
  KEY `usuario_groups_group_id_c67c8651_fk_auth_group_id` (`group_id`),
  CONSTRAINT `usuario_groups_group_id_c67c8651_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `usuario_groups_user_id_bf125d45_fk_usuario_id` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_groups`
--

LOCK TABLES `usuario_groups` WRITE;
/*!40000 ALTER TABLE `usuario_groups` DISABLE KEYS */;
INSERT INTO `usuario_groups` VALUES (1,1,1);
/*!40000 ALTER TABLE `usuario_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_user_permissions`
--

DROP TABLE IF EXISTS `usuario_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_user_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_user_permissions_user_id_permission_id_30490d1f_uniq` (`user_id`,`permission_id`),
  KEY `usuario_user_permiss_permission_id_a8893ce7_fk_auth_perm` (`permission_id`),
  CONSTRAINT `usuario_user_permiss_permission_id_a8893ce7_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `usuario_user_permissions_user_id_96a81eab_fk_usuario_id` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_user_permissions`
--

LOCK TABLES `usuario_user_permissions` WRITE;
/*!40000 ALTER TABLE `usuario_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `subtotal` decimal(9,2) NOT NULL,
  `iva` decimal(9,2) NOT NULL,
  `total` decimal(9,2) NOT NULL,
  `estado` int NOT NULL,
  `cliente_id` int NOT NULL,
  `tipo_pago` int NOT NULL,
  `tipo_venta` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `venta_cliente_id_23062742_fk_usuario_id` (`cliente_id`),
  CONSTRAINT `venta_cliente_id_23062742_fk_usuario_id` FOREIGN KEY (`cliente_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
INSERT INTO `venta` VALUES (29,'2021-05-08',8.40,1.01,9.41,1,2,0,0),(30,'2021-05-17',1.40,0.17,1.57,1,1,0,0),(31,'2021-05-17',1.40,0.17,1.57,1,1,0,0),(32,'2021-05-17',1.40,0.17,1.57,1,1,0,0),(33,'2021-05-17',11.20,1.34,12.54,1,1,0,0),(34,'2021-05-17',12.60,1.51,14.11,2,18,0,0),(35,'2021-05-17',9.80,1.18,10.98,1,18,0,0),(36,'2021-05-17',95.20,11.42,106.62,1,18,0,0),(37,'2021-05-17',8.40,1.01,9.41,1,18,0,0),(38,'2021-05-17',1.40,0.17,1.57,1,19,0,0),(39,'2021-05-18',7.00,0.84,7.84,1,19,0,1),(40,'2021-05-18',7.00,0.84,7.84,1,19,1,0);
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-28 12:54:10
