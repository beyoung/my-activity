INSERT INTO users (username, email, password, salt) VALUES (
	'youth', 'tuwenyoung@gmail.com' ,'', '111111'
);

INSERT INTO records (user_id, record, created)
VALUES (
		1,
		JSON_INSERT (
			'{}',
			'$.push_up',
			20,
			'$.cycling',
			1232,
			'$.jump',
			102
		),
		'2023-08-19'
	);