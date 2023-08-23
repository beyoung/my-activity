
DROP TABLE IF EXISTS sports;
CREATE TABLE IF NOT EXISTS sports (record json, created datetime);
CREATE INDEX sports_created_index ON sports (created);
INSERT INTO sports (record, created) VALUES (JSON_INSERT('{}', '$.push_up', 20, '$.cycling', 1232, '$.jump', 102), '2023-08-19 21:00:00');
