import userModLogEmbed from "../../lib/moderation/modlogUserEmbed.js";
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
	//todo dm the user

	if (execute) await GUILD.bans.create(targetUser, { reason });

	const string = `${Emoji.Ban} Banned ${targetUser}`;
	await userModLogEmbed({ targetUser: targetUser, author, string, reason });
	return string;
}
