import type { User } from "discord.js";
import { modlog } from "../../modlog.js";
import { GUILD } from "../../../loadDiscordObjects.js";
import { Emoji } from "../../../../util/emoji.js";

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

	//todo dm the user
	await modlog.postUserAction({ targetUser, string, author, reason });

	if (!loggingOnly) {
		const guild = await GUILD();
		await guild.members.kick(targetUser);
	}

	return string;
}
