
DROP TABLE IF EXISTS sports;
CREATE TABLE IF NOT EXISTS sports (name TEXT NOT NULL, value INTEGER NOT NULL, created datetime);
CREATE INDEX sports_created_index ON sports (created);
INSERT INTO sports (name, value, created) VALUES ('push up', 10, '2023-08-19 21:00:00');