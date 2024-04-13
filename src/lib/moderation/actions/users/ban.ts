import userModerationLog from "../../userModerationLog.js";
import type { User } from "discord.js";
import { GUILD } from "../../../discord/loadDiscordObjects.js";
import { Emoji } from "../../../util/emoji.js";

export default async function ban({
	user,
	reason,
	author,
	execute,
}: {
	user: User;
	reason?: string;
	author: User;
	execute: boolean;
}) {
	if (execute) await GUILD.bans.create(user, { reason });

	const string = `${Emoji.Ban} Banned ${user}`;
	await userModerationLog({ user, author, string, reason });
	return string;
}
