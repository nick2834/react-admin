/*
 Navicat MySQL Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : localhost:3306
 Source Schema         : blog

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : 65001

 Date: 02/03/2021 15:55:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '索引',
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '标题',
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '作者',
  `content` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '内容',
  `category_id` int(0) NOT NULL COMMENT '分类id',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '描述',
  `create_time` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '发布时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `category_id`(`category_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (9, '31314', 'nick', '测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据', 1, '测试分页数据', '2020-04-13 11:22:37');
INSERT INTO `article` VALUES (10, '123sdas', 'nick', '测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据', 1, '测试分页数据', '2020-04-13 11:22:42');
INSERT INTO `article` VALUES (11, '7890yhkl', 'nick', '测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据', 1, '测试分页数据', '2020-04-13 11:22:47');
INSERT INTO `article` VALUES (12, '89hlhdsadad', 'nick', '测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据', 1, '测试分页数据', '2020-04-13 11:22:52');
INSERT INTO `article` VALUES (13, 'jhihlsdaada', 'nick', '测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据', 1, '测试分页数据', '2020-04-13 11:23:00');
INSERT INTO `article` VALUES (14, '2混合结构框架', 'nick', '测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据测试分页数据', 1, '测试分页数据', '2020-04-13 11:44:05');
INSERT INTO `article` VALUES (15, 'descriptiondescriptiondescription', 'nick', '%3Cdiv%3E%0A%3Ch1%20style%3D%22text-align%3A%20center%3B%22%3Edescription%3C%2Fh1%3E%0A%3C%2Fdiv%3E', 1, 'description', '2020-04-14 14:34:56');
INSERT INTO `article` VALUES (16, 'longtext', 'nick', '<h1 style=\"text-align: center;\">Nodejs</h1>\n<hr />\n<table style=\"border-collapse: collapse; width: 100%;\" border=\"1\">\n<tbody>\n<tr>\n<td style=\"width: 50%;\">&nbsp;</td>\n<td style=\"width: 50%;\">&nbsp;</td>\n</tr>\n</tbody>\n</table>', 1, 'description', '2020-04-14 14:36:03');

SET FOREIGN_KEY_CHECKS = 1;
