DROP DATABASE IF EXISTS profit;
CREATE DATABASE IF NOT EXISTS profit;

USE profit;

DROP TABLE IF EXISTS REWIEWS;
DROP TABLE IF EXISTS HASHTAGS;
DROP TABLE IF EXISTS OFFER;
DROP TABLE IF EXISTS USER;

CREATE TABLE USER(
	USER_ID int NOT NULL UNIQUE AUTO_INCREMENT,
	USERNAME varchar(32) NOT NULL UNIQUE,
    ISVENDOR bool,
    PASSWORD varchar(32) NOT NULL,
	PRIMARY KEY(USER_ID)
);

LOCK TABLES USER WRITE;
INSERT INTO USER(USERNAME, PASSWORD, ISVENDOR) VALUES ('Pavel1 Klapatiuk', '1levaP', TRUE);
INSERT INTO USER(USERNAME, PASSWORD, ISVENDOR) VALUES ('Pavel2 Klapatiuk', '2levaP', TRUE);
INSERT INTO USER(USERNAME, PASSWORD, ISVENDOR) VALUES ('Pavel3 Klapatiuk', '3levaP', TRUE);
INSERT INTO USER(USERNAME, PASSWORD, ISVENDOR) VALUES ('Pavel4 Klapatiuk', '4levaP', FALSE);
INSERT INTO USER(USERNAME, PASSWORD, ISVENDOR) VALUES ('Pavel5 Klapatiuk', '5levaP', TRUE);
INSERT INTO USER(USERNAME, PASSWORD, ISVENDOR) VALUES ('Pavel6 Klapatiuk', '6levaP', FALSE);
INSERT INTO USER(USERNAME, PASSWORD, ISVENDOR) VALUES ('Pavel7 Klapatiuk', '7levaP', FALSE);
INSERT INTO USER(USERNAME, PASSWORD, ISVENDOR) VALUES ('Pavel8 Klapatiuk', '8levaP', FALSE);
INSERT INTO USER(USERNAME, PASSWORD, ISVENDOR) VALUES ('Pavel9 Klapatiuk', '9levaP', FALSE);
UNLOCK TABLES;




CREATE TABLE OFFER(
	OFFER_ID int NOT NULL UNIQUE AUTO_INCREMENT,
    USER_ID int NOT NULL,
    OFFER_NAME varchar(100) NOT NULL,
    DESCRIPTION varchar(250) NOT NULL,
    VENDOR_LINK varchar(250),
    VALID_UNTIL date,
    DISCOUNT int NOT NULL,
    CREATED_AT datetime NOT NULL,
    PHOTO_LINK text,
    PRIMARY KEY(OFFER_ID),
	FOREIGN KEY (USER_ID) REFERENCES USER(USER_ID) ON DELETE CASCADE
);

LOCK TABLES OFFER WRITE;

INSERT INTO OFFER(USER_ID, OFFER_NAME, DESCRIPTION, VENDOR_LINK, VALID_UNTIL, DISCOUNT, CREATED_AT, PHOTO_LINK) VALUES (1, 'Скидка на шкафы - до 79%', 'Получите скидку на шкафы до 79%', 'https://coollockers.ua', '2022-01-21 20:12:32', 79, curdate(), 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg');
INSERT INTO OFFER(USER_ID, OFFER_NAME, DESCRIPTION, VENDOR_LINK, VALID_UNTIL, DISCOUNT, CREATED_AT, PHOTO_LINK) VALUES (1, 'Скидка на шкафы - до 78%', 'Получите скидку на шкафы до 78%', 'https://coollockers.ua', '2023-01-21 20:12:32', 78, curdate(), 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg');
INSERT INTO OFFER(USER_ID, OFFER_NAME, DESCRIPTION, VENDOR_LINK, VALID_UNTIL, DISCOUNT, CREATED_AT, PHOTO_LINK) VALUES (1, 'Скидка на шкафы - до 77%', 'Получите скидку на шкафы до 77%', 'https://coollockers.ua', '2024-01-21 20:12:32', 77, '2021-05-01 20:12:32', 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg');
INSERT INTO OFFER(USER_ID, OFFER_NAME, DESCRIPTION, VENDOR_LINK, VALID_UNTIL, DISCOUNT, CREATED_AT, PHOTO_LINK) VALUES (1, 'Скидка на шкафы - до 76%', 'Получите скидку на шкафы до 76%', 'https://coollockers.ua', '2025-01-21 20:12:32', 76, '2018-01-21 20:12:32', 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg');
INSERT INTO OFFER(USER_ID, OFFER_NAME, DESCRIPTION, VENDOR_LINK, VALID_UNTIL, DISCOUNT, CREATED_AT, PHOTO_LINK) VALUES (2, 'Скидка на шкафы - до 75%', 'Получите скидку на шкафы до 75%', 'https://coollockers.ua', '2026-01-21 20:12:32', 75, '2017-01-21 20:12:32', 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg');
INSERT INTO OFFER(USER_ID, OFFER_NAME, DESCRIPTION, VENDOR_LINK, VALID_UNTIL, DISCOUNT, CREATED_AT, PHOTO_LINK) VALUES (2, 'Скидка на шкафы - до 74%', 'Получите скидку на шкафы до 74%', 'https://coollockers.ua', '2027-01-21 20:12:32', 74, '2016-01-21 20:12:32', 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg');
INSERT INTO OFFER(USER_ID, OFFER_NAME, DESCRIPTION, VENDOR_LINK, VALID_UNTIL, DISCOUNT, CREATED_AT, PHOTO_LINK) VALUES (2, 'Скидка на шкафы - до 73%', 'Получите скидку на шкафы до 73% Получите скидку на шкафы до 73% Получите скидку на шкафы до 73% Получите скидку на шкафы до 73% Получите скидку на шкафы до 73%', 'https://coollockers.ua', '2028-01-21 20:12:32', 73, '2015-03-01 20:12:32', 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg');
INSERT INTO OFFER(USER_ID, OFFER_NAME, DESCRIPTION, VENDOR_LINK, VALID_UNTIL, DISCOUNT, CREATED_AT, PHOTO_LINK) VALUES (5, 'Скидка на шкафы - до 72%', 'Получите скидку на шкафы до 72%', 'https://coollockers.ua', '2029-01-21 20:12:32', 72, '2014-01-21 20:12:32', 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg');
INSERT INTO OFFER(USER_ID, OFFER_NAME, DESCRIPTION, VENDOR_LINK, VALID_UNTIL, DISCOUNT, CREATED_AT, PHOTO_LINK) VALUES (5, 'Скидка на шкафы - до 71%', 'Получите скидку на шкафы до 71%', 'https://coollockers.ua', '2030-01-21 20:12:32', 71, '2013-01-21 20:12:32', 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg');
INSERT INTO OFFER(USER_ID, OFFER_NAME, DESCRIPTION, VENDOR_LINK, VALID_UNTIL, DISCOUNT, CREATED_AT, PHOTO_LINK) VALUES (1, 'Скидка на шкафы - до 70%', 'Получите скидку на шкафы до 70%', 'https://coollockers.ua', '2031-01-21 20:12:32', 70, '2021-05-02 20:12:32', 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg');

UNLOCK TABLES;

CREATE TABLE HASHTAGS(
	OFFER_ID int NOT NULL,
    TAG varchar(20),
	FOREIGN KEY (OFFER_ID) REFERENCES OFFER(OFFER_ID) ON DELETE CASCADE
);

LOCK TABLES HASHTAGS WRITE;
INSERT INTO HASHTAGS(OFFER_ID, TAG) VALUES (1, 'wood');
INSERT INTO HASHTAGS(OFFER_ID, TAG) VALUES (1, 'furniture');
INSERT INTO HASHTAGS(OFFER_ID, TAG) VALUES (2, 'wood');
INSERT INTO HASHTAGS(OFFER_ID, TAG) VALUES (2, 'furniture');
INSERT INTO HASHTAGS(OFFER_ID, TAG) VALUES (3, 'wood');
INSERT INTO HASHTAGS(OFFER_ID, TAG) VALUES (3, 'locker');
INSERT INTO HASHTAGS(OFFER_ID, TAG) VALUES (4, 'wood');
INSERT INTO HASHTAGS(OFFER_ID, TAG) VALUES (5, 'wood');
INSERT INTO HASHTAGS(OFFER_ID, TAG) VALUES (6, 'wood');
INSERT INTO HASHTAGS(OFFER_ID, TAG) VALUES (7, 'wood');
UNLOCK TABLES;

CREATE TABLE REVIEWS(
	USERNAME varchar(32),
    OFFER_ID int,
    REWIEW text,
    RATING int NOT NULL,
    review_date datetime NOT NULL,
    foreign key (OFFER_ID) references OFFER(OFFER_ID) ON DELETE CASCADE
);

LOCK TABLES REVIEWS WRITE;
INSERT INTO REVIEWS(USERNAME, OFFER_ID, REWIEW, RATING, review_date) VALUES ('Pavel1 Klapatiuk', 5, 'Ваши шкафы ломаются!', 2, curdate());
INSERT INTO REVIEWS(USERNAME, OFFER_ID, REWIEW, RATING, review_date) VALUES ('Pavel2 Klapatiuk', 1, 'Ваши шкафы ломаются!', 3, '2020-05-09 20:12:32');
INSERT INTO REVIEWS(USERNAME, OFFER_ID, REWIEW, RATING, review_date) VALUES ('Pavel2 Klapatiuk', 2, 'Ваши шкафы ломаются!', 2, '2020-05-10 20:12:32');
INSERT INTO REVIEWS(USERNAME, OFFER_ID, REWIEW, RATING, review_date) VALUES ('Pavel1 Klapatiuk', 9, 'Ваши шкафы шикарны!', 4, curdate());
INSERT INTO REVIEWS(USERNAME, OFFER_ID, REWIEW, RATING, review_date) VALUES ('Pavel1 Klapatiuk', 8, 'Ваши шкафы шикарны!', 5, '2020-05-08 20:12:32');
INSERT INTO REVIEWS(USERNAME, OFFER_ID, REWIEW, RATING, review_date) VALUES ('Pavel5 Klapatiuk', 1, 'Ваши шкафы ломаются!', 2, curdate());
INSERT INTO REVIEWS(USERNAME, OFFER_ID, REWIEW, RATING, review_date) VALUES ('Pavel1 Klapatiuk', 7, 'Ваши шкафы ломаются!', 2, '2020-05-10 20:12:32');
INSERT INTO REVIEWS(USERNAME, OFFER_ID, REWIEW, RATING, review_date) VALUES ('Pavel3 Klapatiuk', 1, 'Ваши шкафы шикарны!', 4, '2020-05-09 20:12:32');
INSERT INTO REVIEWS(USERNAME, OFFER_ID, REWIEW, RATING, review_date) VALUES ('Pavel3 Klapatiuk', 2, 'Ваши шкафы ломаются!', 2, curdate());
INSERT INTO REVIEWS(USERNAME, OFFER_ID, REWIEW, RATING, review_date) VALUES ('Pavel3 Klapatiuk', 1, 'Ваши шкафы нормальные!', 4, curdate());
UNLOCK TABLES;
