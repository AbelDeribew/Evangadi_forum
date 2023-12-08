CREATE DATABASE IF NOT EXISTS evangadi;

USE evangadi;

CREATE TABLE users(
    userid INT(20) NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY(userid)
);

CREATE TABLE questions(
    id INT(20) NOT NULL AUTO_INCREMENT,
    questionid VARCHAR(100) NOT NULL UNIQUE,
    user_id INT(20) NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
    tag VARCHAR(20),
    PRIMARY KEY(id, questionid),
    FOREIGN KEY(user_id) REFERENCES users(userid)
);

CREATE TABLE answers(
    answerid INT(20) NOT NULL AUTO_INCREMENT,
    user_id INT(20) NOT NULL,
    question_id VARCHAR(100) NOT NULL,
    answer VARCHAR(200) NOT NULL,
    PRIMARY KEY(answerid),
    FOREIGN KEY(question_id) REFERENCES questions(questionid),
    FOREIGN KEY(user_id) REFERENCES users(userid)
);