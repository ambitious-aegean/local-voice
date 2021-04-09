-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- to use this file to set up your database do the following:
-- 1. log into your msql database
-- 2. run this command: set global local_infile=true;
-- 3. log out
-- 4. run this command mysql -u [your mysql username] < schema.sql


DROP DATABASE IF EXISTS local_voice;

CREATE DATABASE local_voice;

USE local_voice;

DROP TABLE IF EXISTS `issues`;

CREATE TABLE `issues` (
  `issue_id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER NULL DEFAULT NULL,
  `title` VARCHAR(50) NULL DEFAULT NULL,
  `text` VARCHAR(1000) NULL DEFAULT NULL,
  `lat` DECIMAL(9,4) NULL DEFAULT NULL,
  `lng` DECIMAL(9,4) NULL DEFAULT NULL,
  `rep_name` VARCHAR(50) NULL DEFAULT NULL,
  `rep_email` VARCHAR(50) NULL DEFAULT NULL,
  `rep_photo_url` VARCHAR(1000) NULL DEFAULT NULL,
  `resolved` INTEGER NULL DEFAULT 0,
  `date` VARCHAR(50) NULL DEFAULT NULL,
  `up_vote` INTEGER NULL DEFAULT 0,
  `flag_count` INTEGER NULL DEFAULT 0,
  `resolver` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`issue_id`)
);

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` INTEGER AUTO_INCREMENT,
  `username` VARCHAR(50) NULL DEFAULT NULL,
  `email` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`)
);

-- ---
-- Table 'comments'
--
-- ---

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `comment_id` INTEGER AUTO_INCREMENT,
  `issue_id` INTEGER NULL DEFAULT NULL,
  `text` VARCHAR(1000) NULL DEFAULT NULL,
  `user_id` INTEGER NULL DEFAULT NULL,
  `date` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`comment_id`)
);

-- ---
-- Table 'issues_category'
--
-- ---

DROP TABLE IF EXISTS `issues_category`;

CREATE TABLE `issues_category` (
  `issue_cat_id` INTEGER AUTO_INCREMENT,
  `issue_id` INTEGER NULL DEFAULT NULL,
  `cat_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`issue_cat_id`)
);

-- ---
-- Table 'watched_issues'
--
-- ---

DROP TABLE IF EXISTS `watched_issues`;

CREATE TABLE `watched_issues` (
  `watched_issue_id` INTEGER AUTO_INCREMENT,
  `user_id` INTEGER NULL DEFAULT NULL,
  `issue_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`watched_issue_id`)
);

-- ---
-- Table 'dispute_issues'
--
-- ---

DROP TABLE IF EXISTS `dispute_issues`;

CREATE TABLE `dispute_issues` (
  `dispute_issue_id` INTEGER AUTO_INCREMENT,
  `issue_id` INTEGER NULL DEFAULT NULL,
  `user_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`dispute_issue_id`)
);

-- ---
-- Table 'user_up_vote'
--
-- ---

DROP TABLE IF EXISTS `user_up_vote`;

CREATE TABLE `user_up_vote` (
  `user_vote_id` INTEGER AUTO_INCREMENT,
  `user_id` INTEGER NULL DEFAULT NULL,
  `issue_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`user_vote_id`)
);

-- ---
-- Table 'user_flag'
--
-- ---

DROP TABLE IF EXISTS `user_flag`;

CREATE TABLE `user_flag` (
  `user_flag_id` INTEGER AUTO_INCREMENT,
  `user_id` INTEGER NULL DEFAULT NULL,
  `issue_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`user_flag_id`)
);

-- ---
-- Table 'user_resolved'
--
-- ---

DROP TABLE IF EXISTS `user_resolved`;

CREATE TABLE `user_resolved` (
  `user_resolved_id` INTEGER AUTO_INCREMENT,
  `user_id` INTEGER NULL DEFAULT NULL,
  `issue_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`user_resolved_id`)
);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `photo_id` INTEGER AUTO_INCREMENT,
  `issue_id` INTEGER NULL DEFAULT NULL,
  `photo_info` VARCHAR(1000) NULL DEFAULT NULL,
  PRIMARY KEY (`photo_id`)
);

-- ---
-- Table 'categories'
--
-- ---

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `cat_id` INTEGER AUTO_INCREMENT,
  `cat_name` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`cat_id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `issues` ADD FOREIGN KEY (user_id) REFERENCES `users` (`user_id`);
ALTER TABLE `comments` ADD FOREIGN KEY (issue_id) REFERENCES `issues` (`issue_id`);
ALTER TABLE `comments` ADD FOREIGN KEY (user_id) REFERENCES `users` (`user_id`);
ALTER TABLE `issues_category` ADD FOREIGN KEY (issue_id) REFERENCES `issues` (`issue_id`);
ALTER TABLE `issues_category` ADD FOREIGN KEY (cat_id) REFERENCES `categories` (`cat_id`);
ALTER TABLE `watched_issues` ADD FOREIGN KEY (user_id) REFERENCES `users` (`user_id`);
ALTER TABLE `watched_issues` ADD FOREIGN KEY (issue_id) REFERENCES `issues` (`issue_id`);
ALTER TABLE `dispute_issues` ADD FOREIGN KEY (issue_id) REFERENCES `issues` (`issue_id`);
ALTER TABLE `dispute_issues` ADD FOREIGN KEY (user_id) REFERENCES `users` (`user_id`);
ALTER TABLE `user_up_vote` ADD FOREIGN KEY (user_id) REFERENCES `users` (`user_id`);
ALTER TABLE `user_up_vote` ADD FOREIGN KEY (issue_id) REFERENCES `issues` (`issue_id`);
ALTER TABLE `user_flag` ADD FOREIGN KEY (user_id) REFERENCES `users` (`user_id`);
ALTER TABLE `user_flag` ADD FOREIGN KEY (issue_id) REFERENCES `issues` (`issue_id`);
ALTER TABLE `user_resolved` ADD FOREIGN KEY (user_id) REFERENCES `users` (`user_id`);
ALTER TABLE `user_resolved` ADD FOREIGN KEY (issue_id) REFERENCES `issues` (`issue_id`);
ALTER TABLE `photos` ADD FOREIGN KEY (issue_id) REFERENCES `issues` (`issue_id`);


-- ---
-- Loading data
-- ---

LOAD DATA LOCAL INFILE './sample_data/users.csv'
INTO TABLE users
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE './sample_data/issues.csv'
INTO TABLE issues
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE './sample_data/comments.csv'
INTO TABLE comments
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE './sample_data/categories.csv'
INTO TABLE categories
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE './sample_data/issues_category.csv'
INTO TABLE issues_category
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE './sample_data/photos.csv'
INTO TABLE photos
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE './sample_data/watched_issues.csv'
INTO TABLE watched_issues
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- ---
-- Table Properties
-- ---

ALTER TABLE `issues` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `comments` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `issues_category` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `watched_issues` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `dispute_issues` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `user_up_vote` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `user_flag` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `user_resolved` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `categories` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `issues` (`issue_id`,`user_id`,`text`,`lat`,`lng`,`rep_name`,`rep_email`,`rep_photo_url`,`resolved`,`date`,`up_vote`,`flag_count`) VALUES
-- ('','','','','','','','','','','','');
-- INSERT INTO `users` (`user_id`,`username`,`email`) VALUES
-- ('','','');
-- INSERT INTO `comments` (`comment_id`,`issue_id`,`text`,`user_id`,`date`) VALUES
-- ('','','','','');
-- INSERT INTO `issues_category` (`issue_cat_id`,`issue_id`,`cat_id`) VALUES
-- ('','','');
-- INSERT INTO `watched_issues` (`watched_issue_id`,`user_id`,`issue_id`) VALUES
-- ('','','');
-- INSERT INTO `dispute_issues` (`dispute_issue_id`,`issue_id`,`user_id`) VALUES
-- ('','','');
-- INSERT INTO `user_up_vote` (`user_vote_id`,`user_id`,`issue_id`) VALUES
-- ('','','');
-- INSERT INTO `user_flag` (`user_flag_id`,`user_id`,`issue_id`) VALUES
-- ('','','');
-- INSERT INTO `user_resolved` (`user_resolved_id`,`user_id`,`issue_id`) VALUES
-- ('','','');
-- INSERT INTO `photos` (`photo_id`,`issue_id`,`photo_info`) VALUES
-- ('','','');
-- INSERT INTO `categories` (`cat_id`,`cat_name`) VALUES
-- ('','');