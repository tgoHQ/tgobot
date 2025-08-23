import db from "../../db/drizzle";
import { eq } from "drizzle-orm";
import { userNotes } from "../../db/schema.js";
import { User } from "discord.js";

export class UserNote {
	readonly id: number;
	readonly userId: string;
	readonly authorId: string;
	readonly content: string;
	readonly createdAt: Date;

	async delete() {
		await db.delete(userNotes).where(eq(userNotes.id, this.id));
	}

	private constructor(dbObj: typeof userNotes.$inferSelect) {
		this.id = dbObj.id;
		this.userId = dbObj.userId;
		this.authorId = dbObj.authorId;
		this.content = dbObj.content;
		this.createdAt = dbObj.createdAt;
	}

	static async create(opts: UserNoteOpts) {
		await db.insert(userNotes).values({
			userId: opts.targetUser.id,
			authorId: opts.author.id,
			content: opts.content,
		});
	}

	static async getById(id: number) {
		const row = await db.query.userNotes.findFirst({
			where: eq(userNotes.id, id),
		});

		if (!row) return null;

		return new UserNote(row);
	}

	static async getByUser(id: string) {
		const rows = await db.query.userNotes.findMany({
			where: eq(userNotes.userId, id),
		});

		return rows.map((row) => new UserNote(row));
	}
}

type UserNoteOpts = {
	targetUser: User;
	author: User;
	content: string;
};
