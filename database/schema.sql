DROP DATABASE IF EXISTS game_state;

CREATE DATABASE game_state;
USE game_state;

CREATE TABLE current_state (
	id INT(1) AUTO_INCREMENT PRIMARY KEY,
	state varchar(9) NOT NULL,
	turn INT(2) NOT NULL
);
INSERT INTO current_state (state, turn) VALUES('X---X-OO-', 4);
UPDATE current_state SET state='---------', turn=0 WHERE id=1;