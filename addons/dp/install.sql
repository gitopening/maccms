-- ----------------------------
-- Table structure for danmaku_list
-- ----------------------------
DROP TABLE IF EXISTS `danmaku_list`;
CREATE TABLE `danmaku_list` (
                                `id` varchar(32) NOT NULL COMMENT '弹幕池id',
                                `cid` int(8) NOT NULL AUTO_INCREMENT COMMENT '弹幕id',
                                `type` varchar(128) NOT NULL COMMENT '弹幕类型',
                                `text` varchar(128) NOT NULL COMMENT '弹幕内容',
                                `color` varchar(128) NOT NULL COMMENT '弹幕颜色',
                                `size` varchar(128) NOT NULL COMMENT '弹幕大小',
                                `videotime` float(24,3) NOT NULL COMMENT '时间点',
    `ip` varchar(128) NOT NULL COMMENT '用户ip',
    `time` int(10) NOT NULL COMMENT '发送时间',
    `comment_status` tinyint(1) UNSIGNED NOT NULL DEFAULT '1' ,
    PRIMARY KEY (`cid`),
    KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 ;