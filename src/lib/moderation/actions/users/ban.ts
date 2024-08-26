import { modUserLogEmbed } from "../../modLog.js";
import type { User } from "discord.js";
import { GUILD } from "../../../discord/loadDiscordObjects.js";
import { Emoji } from "../../../util/emoji.js";
import getDuration from "../../../util/getDuration.js";

export default async function ban({
	targetUser,
	reason,
	author,
	execute,
	deleteMessages,
}: {
	targetUser: User;
	reason?: string;
	author: User;
	execute: boolean;
	deleteMessages: boolean;
}) {
	//todo dm the user

	if (execute)
		await (
			await GUILD()
		).bans.create(targetUser, {
			reason,
			deleteMessageSeconds: deleteMessages ? getDuration.days(7) / 1000 : 0,
		});

	const string = `${Emoji.Ban} Banned ${targetUser}`;
	await modUserLogEmbed(targetUser, string, author, reason);
	return string;
}
