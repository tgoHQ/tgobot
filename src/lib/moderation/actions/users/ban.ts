import { modUserLogEmbed } from "../../modLog.js";
import type { User } from "discord.js";
import { GUILD } from "../../../discord/loadDiscordObjects.js";
import { Emoji } from "../../../util/emoji.js";

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

	if (execute) await (await GUILD()).bans.create(targetUser, { reason });

	const string = `${Emoji.Ban} Banned ${targetUser}`;
	await modUserLogEmbed(targetUser, string, author, reason);
	return string;
}
