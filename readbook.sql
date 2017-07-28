SET NAMES UTF8;
DROP DATABASE IF EXISTS readbook;
CREATE DATABASE readbook CHARSET=UTF8;
USE readbook;


/*用户表*/
CREATE TABLE read_user(
    uid INT PRIMARY KEY AUTO_INCREMENT,/*用户编号*/
    uname VARCHAR(32),      /*邮箱*/
    phone VARCHAR(11),      /*手机号*/
    upwd VARCHAR(32),       /*密码*/
    nickname VARCHAR(32),   /*昵称*/
    sex VARCHAR(1),         /*性别,男-M，女-F*/
    age VARCHAR(3),         /*年龄*/
    edu VARCHAR(32),        /*学历*/
    job VARCHAR(32)         /*职业*/
);
INSERT INTO read_user VALUES
(1,'admin','13555555555','111111','','','','',''),
(2,'test@126.com','13666666666','123456','','','','','');
CREATE TABLE read_consult(
cid INT PRIMARY KEY AUTO_INCREMENT,
type VARCHAR(6),
content VARCHAR(32)
);

INSERT INTO read_consult VALUES
(NULL,'【公告】','网络文学行业自律提倡书'),
(NULL,'【活动】','2016中国原创文学风云榜颁奖盛典'),
(NULL,'【活动】','异世界10天生存大挑战'),
(NULL,'【活动】','2017新春，好书看过瘾，好礼拿不停'),
(NULL,'【咨询】','联想乐商店2016搜索大数据');
CREATE TABLE original_man(
omid INT PRIMARY KEY AUTO_INCREMENT,
omimg VARCHAR(32),
omtitle VARCHAR(16),
omauthor VARCHAR(16),
omintro VARCHAR(16)
);
INSERT INTO original_man VALUES
(NULL,'images/sanjie.jpg','三界独尊','犁天','天才?顺我者天,逆我者渣'),
(NULL,'images/xiaoyuan.jpg','校园修真高手','木榆','修炼异能,贴身保护校花！'),
(NULL,'images/tianyu.jpg','天域苍穹','风凌天下','六荒八合,唯我称雄');
