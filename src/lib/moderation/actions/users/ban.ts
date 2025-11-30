import type { User } from "discord.js";
import { modlog } from "../../modlog.js";
import { GUILD } from "../../../loadDiscordObjects.js";
import { Emoji } from "../../../../util/emoji.js";
import getDuration from "../../../../util/getDuration.js";

export default async function ban({
	targetUser,
	reason,
	author,
	loggingOnly,
	deleteMessages,
}: {
	targetUser: User;
	reason?: string;
	author: User;
	loggingOnly?: boolean;
	deleteMessages: boolean;
}) {
	const string = `${Emoji.Ban} Banned ${targetUser}`;

	//todo dm the user
	await modlog.postUserAction({ targetUser, string, author, reason });

	if (!loggingOnly) {
		const guild = await GUILD();
		await guild.bans.create(targetUser, {
			reason,
			deleteMessageSeconds: deleteMessages ? getDuration.days(7) / 1000 : 0,
		});
	}

	return string;
}
