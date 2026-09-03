import { db } from "#db/drizzle";
import { eq } from "drizzle-orm";
import { joinAlerts } from "#db/schema";
import { User } from "discord.js";

export async function createJoinAlert(opts: {
	targetUser: User;
	author: User;
	reason: string | null;
}) {
	const [row] = await db
		.insert(joinAlerts)
		.values({
			userId: opts.targetUser.id,
			authorId: opts.author.id,
			reason: opts.reason,
		})
		.returning();

	return row!;
}

export async function getJoinAlertByUser(userId: string) {
	const row = await db.query.joinAlerts.findFirst({
		where: eq(joinAlerts.userId, userId),
	});

	return row ?? null;
}

export async function getAllJoinAlerts() {
	return db.query.joinAlerts.findMany();
}

export async function deleteJoinAlert(id: number) {
	await db.delete(joinAlerts).where(eq(joinAlerts.id, id));
}
