import { UserNote } from "../../userNotes.js";
import type { User } from "discord.js";

export async function logUserActionToNotes({
	targetUser,
	string,
	reason,
	author,
}: {
	targetUser: User;
	string: string;
	reason?: string;
	author: User;
}) {
	UserNote.create({
		author,
		content: `${string}\n${reason ?? "No reason provided."}`,
		targetUser,
	});
}
