import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/** moderation notes about a user */
export const userNotes = pgTable("user_notes", {
	/** synthetic primary key */
	id: serial("id").primaryKey(),
	/** ID of the Discord user that this note is about */
	userId: text("user_id").notNull(),
	/** ID of the Discord user who created the note */
	authorId: text("author_id").notNull(),
	/** the actual text content of the note */
	content: text("content").notNull(),
	/** creation timestamp of the note */
	createdAt: timestamp("created_at").notNull().defaultNow(),
});

/** users who should trigger a mod alert if they join the guild */
export const joinAlerts = pgTable("join_alerts", {
	/** synthetic primary key */
	id: serial("id").primaryKey(),
	/** ID of the Discord user to alert on when they join */
	userId: text("user_id").notNull().unique(),
	/** ID of the moderator who added this join alert */
	authorId: text("author_id").notNull(),
	/** optional reason for the join alert */
	reason: text("reason"),
	/** creation timestamp of the join alert */
	createdAt: timestamp("created_at").notNull().defaultNow(),
});
