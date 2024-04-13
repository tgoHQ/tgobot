import userModerationLog from "../../lib/moderation/userModerationLog.js";
import type { User } from "discord.js";
import { GUILD } from "../../lib/discord/loadDiscordObjects.js";
import { Emoji } from "../../lib/util/emoji.js";

export default async function ban({
	targetUser,
	reason,
	author,
	execute,
}: {
	targetUser: User;
	reason?: string;
	author: User;
	execute: boolean;
}) {
	//dm the user
	await targetUser
		.send(`You have been banned from ${GUILD.name} for ${reason}`)
		.catch();

	if (execute) await GUILD.bans.create(targetUser, { reason });

	const string = `${Emoji.Ban} Banned ${targetUser}`;
	await userModerationLog({ user: targetUser, author, string, reason });
	return string;
}
