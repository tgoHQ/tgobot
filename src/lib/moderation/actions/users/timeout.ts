import { User } from "discord.js";
import { GUILD } from "../../../loadDiscordObjects.js";
import { Emoji } from "../../../../util/emoji.js";

import { modlog } from "../../modlog.js";
import humanizeDuration from "humanize-duration";

export default async function timeout({
	targetUser,
	reason,
	author,
	duration,
	loggingOnly,
}: {
	targetUser: User;
	reason: string;
	author: User;
	/** Timeout duration in milliseconds */
	duration: number;
	loggingOnly?: boolean;
}) {
	const string = `${
		Emoji.Timeout
	} Timed out ${targetUser} for ${humanizeDuration(duration)}`;

	//todo dm the user
	await modlog.postUserAction({ targetUser, string, author, reason });

	if (!loggingOnly) {
		const guild = await GUILD();
		const member = await guild.members.fetch(targetUser);
		await member.timeout(duration, reason);
	}

	return string;
}
