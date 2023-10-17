import { sql } from "drizzle-orm";
import { text, integer, sqliteTable, index, uniqueIndex } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    username: text("username"),
    email: text("email"),
    password: text("password").notNull(),
    salt: text("salt").notNull(),
    avatar: text("avatar"),
    created: text("created").default(sql`CURRENT_TIMESTAMP`),
    last_login: text("last_login").default(sql`CURRENT_TIMESTAMP`),
}, (users) => {
    return {
        nameIdx: uniqueIndex("username_idx").on(users.username),
        emailIdx: uniqueIndex("email_idx").on(users.email),
    }
});
