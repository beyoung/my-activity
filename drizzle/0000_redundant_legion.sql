CREATE TABLE `records` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`record` text,
	`created` text DEFAULT CURRENT_DATE,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text,
	`email` text,
	`password` text NOT NULL,
	`salt` text NOT NULL,
	`avatar` text,
	`created` text DEFAULT CURRENT_TIMESTAMP,
	`last_login` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE INDEX `created` ON `records` (`created`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_date_unique` ON `records` (`user_id`,`created`);--> statement-breakpoint
CREATE UNIQUE INDEX `username_idx` ON `users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `email_idx` ON `users` (`email`);