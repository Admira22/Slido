CREATE TABLE users
(
    id        serial primary key,
    user_type varchar(100) not null
);
INSERT INTO users(id, user_type)
VALUES (1, 'admin');

SELECT *
FROM users;

INSERT INTO users(id, user_type)
VALUES (2, 'teacher');
INSERT INTO users(id, user_type)
VALUES (3, 'quest');

CREATE TABLE admin
(
    id       serial primary key,
    email    varchar(250) UNIQUE NOT NULL,
    password varchar(250)        NOT NULL,
    user_id  int                 not null,
    foreign key (user_id)
        REFERENCES users (id)

);
CREATE TABLE teacher
(
    id       serial primary key,
    email    varchar(250) UNIQUE NOT NULL,
    password varchar(250)        NOT NULL,
    user_id  int                 not null,
    foreign key (user_id)
        REFERENCES users (id)

);

CREATE TABLE quest
(
    id      serial primary key,
    email   varchar(250) UNIQUE NOT NULL,
    user_id int                 not null,
    foreign key (user_id)
        REFERENCES users (id)

);
CREATE TABLE lecture
(
    id        serial primary key,
    code      varchar(250) not null,
    name      varchar(250) not null,
    time      time         not null,
    frequency int          not null,
    cover     int          not null
);

CREATE TABLE forbidden_words
(
    id   serial primary key,
    word varchar(250) not null
);
CREATE TABLE questions
(
    id              serial primary key,
    text            varchar(250) not null,
    reactions       int          not null,
    isHide          boolean,
    forbidden_words int          not null,
    lecture_id      int          not null,
    FOREIGN KEY (lecture_id)
        REFERENCES lecture (id),
    FOREIGN KEY (forbidden_words)
        REFERENCES forbidden_words (id)
);
ALTER TABLE teacher
    ADD COLUMN lecture_id int not null;

ALTER TABLE teacher
    ADD FOREIGN KEY (lecture_id) REFERENCES lecture (id);

ALTER TABLE quest
    ADD COLUMN lecture_id int not null;

ALTER TABLE quest
    ADD FOREIGN KEY (lecture_id) REFERENCES lecture (id);


ALTER TABLE admin
    ADD COLUMN forbidden_words_id int not null,
    ADD COLUMN teacher_id         int not null,
    ADD COLUMN lecture_id         int not null,
    ADD COLUMN quest_id           int not null;

ALTER TABLE admin
    ADD FOREIGN KEY (forbidden_words_id) REFERENCES forbidden_words (id);
ALTER TABLE admin
    ADD FOREIGN KEY (teacher_id) REFERENCES teacher (id);
ALTER TABLE admin
    ADD FOREIGN KEY (quest_id) REFERENCES quest (id);

ALTER TABLE admin
    ADD COLUMN lecture_id int not null;
ALTER TABLE admin
    ADD FOREIGN KEY (lecture_id) REFERENCES lecture (id);

ALTER TABLE users
    ADD COLUMN email varchar(250);

ALTER TABLE users
    ADD COLUMN password int;

INSERT INTO users(id, user_type, email, password)
VALUES (4, 'teacher', 'admira.bakal@gmail.com', '3');

INSERT INTO lecture(id, code, name, time, frequency, cover)
VALUES (1, '2E3', 'Node', '12:00:00', 2, 1);

INSERT INTO lecture(id, code, name, time, frequency, cover)
VALUES (2, '2E7', 'DSA', '14:00:00', 2, 1);

INSERT INTO lecture(id, code, name, time, frequency, cover)
VALUES (3, '2E3', 'DB', '16:00:00', 2, 1);

SELECT *
FROM lecture;

INSERT INTO forbidden_words(id, word)
VALUES (1, 'fuck');

INSERT INTO questions(id, text, reactions, ishide, forbidden_words, lecture_id)
VALUES (1, 'What is this?', 3, false, 1, 1);

SELECT *
FROM users;


ALTER TABLE lecture
    DROP COLUMN cover;
DELETE
FROM lecture
WHERE id = 1;
SELECT *
FROM lecture;

SELECT *
FROM questions;

ALTER TABLE questions
    DROP COLUMN lecture_id;

CREATE TABLE hiddenQuestions
(
    id   serial primary key,
    text varchar(250)
);

INSERT INTO hiddenQuestions(text)
VALUES ('Question with forbidden word');

SELECT *
FROM hiddenQuestions;

SELECT *
FROM lecture
ORDER BY time;


SELECT *
FROM users;

INSERT INTO hiddenQuestions(text)
VALUES ('Forbidden question');

ALTER TABLE users
    ALTER COLUMN password type varchar(500);



ALTER TABLE questions
    ADD COLUMN lecture_code int references lecture (id);

ALTER TABLE questions
    DROP COLUMN lecture_code;

SELECT *
FROM questions;

-- code primary--
ALTER TABLE lecture
    ADD CONSTRAINT lecture_code UNIQUE (code);

ALTER TABLE questions
    ADD COLUMN lecture_code varchar references lecture (code);

--ALTER TABLE questions DROP COLUMN teacher_id;

ALTER TABLE admin
    DROP COLUMN lecture_id;

DROP TABLE admin;

ALTER TABLE quest
    DROP COLUMN lecture_id;

ALTER TABLE teacher
    DROP COLUMN lecture_id;

DROP TABLE teacher;

DELETE
FROM users
WHERE id = '38';
SELECT *
FROM lecture;


DELETE
FROM lecture
WHERE teacher_id = '38';

DROP TABLE quest;

ALTER TABLE questions
    ADD COLUMN reaction int;

SELECT *
FROM lecture
ORDER BY time DESC;

SELECT *
FROM lecture
ORDER BY frequency DESC;

ALTER TABLE lecture
    ADD COLUMN mark int;

SELECT *
FROM questions;

SELECT *
FROM lecture;

UPDATE questions
SET reaction = 0
WHERE reaction is null;

ALTER TABLE questions
    DROP COLUMN reaction;

ALTER TABLE questions
    ADD COLUMN reaction integer;

ALTER TABLE questions
    ALTER COLUMN reaction SET DEFAULT 0;

ALTER TABLE lecture
    DROP COLUMN mark;

CREATE TABLE lecture_mark
(
    lecture_code varchar references lecture (code),
    mark         integer
);


SELECT *
FROM questions;

SELECT *
FROM lecture_mark;



SELECT *
FROM users;

ALTER TABLE lecture
    ADD CONSTRAINT teacher_id
        FOREIGN KEY (teacher_id)
            REFERENCES users (id)
            ON DELETE CASCADE;


SELECT *
FROM lecture;
SELECT *
FROM questions;


SELECT *
FROM forbidden_words;

INSERT INTO forbidden_words(word)
VALUES ('motherfucker');


ALTER TABLE lecture
    ADD COLUMN numberOfAnswers integer;

SELECT *
FROM lecture;

UPDATE lecture
SET numberOfAnswers = 0
WHERE lecture.numberOfAnswers is null;

SELECT *
FROM lecture;


SELECT COUNT(*)
FROM questions
WHERE questions.lecture_code = '25';

SELECT *
FROM lecture
         INNER JOIN questions q on lecture.code = q.lecture_code
WHERE lecture_code = '25';


SELECT *
FROM questions
WHERE questions.reaction >= 7;

SELECT *
FROM lecture_mark;


SELECT *
FROM lecture_mark
WHERE lecture_code = '25';
---SUM ---

INSERT INTO hiddenQuestions(text)
VALUES ('One more hidden question');


SELECT *
FROM lecture;

CREATE TABLE lecture_cover
(
    id           serial,
    lecture_code varchar,
    cover_name   varchar(200),
    cover_url    varchar(200),
    cover_number int,
    PRIMARY KEY (id, lecture_code),
    FOREIGN KEY (lecture_code) REFERENCES lecture (code)
);

ALTER TABLE lecture
    DROP COLUMN numberOfAnswers;

SELECT *
FROM lecture_cover;


CREATE TABLE answers
(
    id          serial,
    answer      int,
    question_id int,
    PRIMARY KEY (id),
    FOREIGN KEY (question_id) REFERENCES questions (id)
);

SELECT *
FROM answers;

ALTER TABLE questions
    ADD COLUMN isHidden boolean DEFAULT false;

UPDATE questions
SET isHidden = false
WHERE isHidden is null;



SELECT *
FROM lecture_cover;



SELECT cover_url
FROM lecture_cover
WHERE lecture_code = '45';

SELECT *
FROM users;

ALTER TABLE users
    ADD COLUMN status varchar(20);

UPDATE users
SET status = 'active'
WHERE status is null;

CREATE TABLE blocked_users
(
    user_id int,
    period  timestamp,
    primary key (user_id),
    foreign key (user_id) references users (id)
);


ALTER TABLE users
    ALTER COLUMN status SET DEFAULT 'active';


SELECT *
FROM users;

ALTER TABLE lecture
    ADD COLUMN number int;

ALTER TABLE lecture
    ALTER COLUMN number SET DEFAULT 1;

SELECT *
FROM lecture;

UPDATE lecture
SET number = 0
WHERE number = 1;

ALTER TABLE lecture
    ADD COLUMN answers int;

ALTER TABLE lecture
    ALTER COLUMN answers SET DEFAULT 0;

UPDATE lecture
SET answers = 0
WHERE answers is null;

DELETE
FROM lecture_mark
WHERE lecture_code = '25';

DELETE
FROM lecture
WHERE code = '25';

DELETE
FROM lecture_mark
WHERE lecture_code = '26';
DELETE
FROM lecture_cover
WHERE lecture_code = '26';
DELETE
FROM lecture
WHERE code = '26';

DELETE
FROM lecture_mark
WHERE lecture_code = '45';
DELETE
FROM lecture_cover
WHERE lecture_code = '45';
DELETE
FROM lecture
WHERE code = '45';

DELETE
FROM lecture_mark
WHERE lecture_code = '34';
DELETE
FROM lecture_cover
WHERE lecture_code = '34';
DELETE
FROM lecture
WHERE code = '34';


SELECT *
FROM lecture;

SELECT *
FROM questions;

SELECT *
FROM answers;

DROP TABLE answers;
DROP TABLE hiddenQuestions;


UPDATE lecture
SET answers = 0
WHERE teacher_id = 39;
UPDATE lecture
SET number = 0
WHERE teacher_id = 39;


SELECT email
FROM users
         INNER JOIN lecture l ON l.teacher_id = users.id;


SELECT *
FROM users;

ALTER TABLE users
    ADD COLUMN blocked timestamp;

ALTER TABLE users
    ADD COLUMN unblocked timestamp;

SELECT NOW() + interval '30' day;

SELECT NOW()::date < '2023-12-1';

CREATE OR REPLACE FUNCTION unblockUser(user_id integer) RETURNS BOOLEAN
AS
$$
DECLARE
    blockedUntil timestamp;

BEGIN
    SELECT unblocked FROM users WHERE users.id = user_id INTO blockedUntil;

    IF blockedUntil < NOW() THEN
        UPDATE users SET status = 'active' WHERE id = user_id;
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$
    LANGUAGE plpgsql;

SELECT * FROM users;

UPDATE users SET blocked = NOW() - Interval '11' day WHERE id = 45;

SELECT unblockUser(42);

UPDATE users SET status = 'inactive', blocked = NOW() + interval '15' day WHERE id = 45;

SELECT * FROM forbidden_words;

SELECT * FROM users;

UPDATE lecture SET answers = 1 WHERE id = 37;

SELECT * FROM lecture;

SELECT * FROM questions;