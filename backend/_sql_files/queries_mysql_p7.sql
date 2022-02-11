SET PATH=%PATH%;C:/"Program Files"/MySQL/"MySQL Server 8.0"/bin
mysql -u root -p

CREATE DATABASE p7_bdd CHARACTER SET 'utf8';

-- création utilisateur base de donnée
CREATE USER 'p7_main_user'@'localhost' IDENTIFIED BY 'p7_main_mdp';
GRANT ALL PRIVILEGES ON p7_bdd.* TO 'p7_main_user'@'localhost';

mysql -u p7_main_user -p

-- utilisation de la BDD
USE p7_bdd;
DESCRIBE users; -- première table
DESCRIBE topic_messages; -- deuxième table
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS topic_messages;

-- création de la table 1 :  users :
CREATE TABLE IF NOT EXISTS p7_bdd.users (
    u_id INT NOT NULL AUTO_INCREMENT,
    u_pseudo VARCHAR(30) UNIQUE NOT NULL,
    u_email VARCHAR(50) UNIQUE NOT NULL,
    u_password VARCHAR(100) NOT NULL,
    u_level INT(1) NOT NULL DEFAULT 1 COMMENT 'niveau 0 = moderateur, niveau 1 = usager',
    u_registration_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (u_id)
) ENGINE = InnoDB;

-- création de la table 2 : topic + messages :
CREATE TABLE p7_bdd.topic_messages (
    tm_id INT NOT NULL AUTO_INCREMENT,
    tm_parent INT NOT NULL COMMENT '0 = topic, >0 = réponses',
    tm_title VARCHAR(50) NOT NULL,
    tm_content VARCHAR(500) NOT NULL,
    tm_posting_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    tm_user_id INT NOT NULL,
    tm_picture_url VARCHAR(100) NULL,
    tm_moderation INT NOT NULL DEFAULT 0 COMMENT '0 = non modéré, 1 = accepté, 2 = refusé',
    PRIMARY KEY (tm_id)
) ENGINE = InnoDB;

-- récupération de la BDD mysqldump

-- copie sur un fichier
SET PATH=%PATH%;C:/"Program Files"/MySQL/"MySQL Server 5.6"/bin
mysqldump -u root -p p7_bdd > PATH -- PATH = E:/Web_Dev/p7_bdd.sql
-- puis enter password => bdd copiée en local

-- récupération de la BDD 
mysql -u root -p p7_bdd < "PATH"/backend/_sql_files/p7_bdd.sql