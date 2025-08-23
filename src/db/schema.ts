import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const gearLists = pgTable("gear_lists", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	url: text("url").notNull(),
	discordUserId: text("discord_user_id").notNull(),
});

export const userNotes = pgTable("user_notes", {
	id: serial("id").primaryKey(),
	userId: text("user_id").notNull(),
	authorId: text("author_id").notNull(),
	content: text("content").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});
