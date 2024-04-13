import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const gearLists = pgTable("gear_lists", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	url: text("url").notNull(),
	discordUserId: text("discord_user_id").notNull(),
});
