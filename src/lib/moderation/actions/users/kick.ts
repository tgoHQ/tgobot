import type { User } from "discord.js";
import { modlog } from "../modlog.js";
import { GUILD } from "../../../loadDiscordObjects.js";
import { Emoji } from "../../../../util/emoji.js";
import { modActionDmUser } from "./dmUser.js";
import { logUserActionToNotes } from "./logUserActionToNotes.js";

export default async function kick({
	targetUser,
	reason,
	author,
	loggingOnly,
}: {
	targetUser: User;
	reason?: string;
	author: User;
	loggingOnly?: boolean;
}) {
	const string = `${Emoji.Kick} Kicked ${targetUser}`;

	await logUserActionToNotes({ targetUser, string, reason, author });
	await modActionDmUser({ targetUser, string, author, reason });
	await modlog.postUserAction({ targetUser, string, author, reason });

	if (!loggingOnly) {
		const guild = await GUILD();
		await guild.members.kick(targetUser);
	}

	return string;
}
