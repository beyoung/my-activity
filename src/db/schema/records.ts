import { sql } from "drizzle-orm";
import { text, sqliteTable, integer, index, unique } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const records = sqliteTable("records", {
    id: integer("id", { mode: 'number' }).primaryKey({ autoIncrement: true }),
    user_id: integer("user_id").references(() => users.id),
    record: text("record", { mode: "json" }),
    created: text("created").default(sql`CURRENT_DATE`),
}, (records) => {
    return {
        createdIdx: index("created").on(records.created),
        userDateUnique: unique("user_date_unique").on(records.user_id, records.created)
    }
});