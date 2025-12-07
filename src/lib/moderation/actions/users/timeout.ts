import { User } from "discord.js";
import { GUILD } from "../../../loadDiscordObjects.js";
import { Emoji } from "../../../../util/emoji.js";
import humanizeDuration from "humanize-duration";
import { handleUserModAction } from "./index.js";

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

	await handleUserModAction({ targetUser, string, reason, author });

	if (!loggingOnly) {
		const guild = await GUILD();
		const member = await guild.members.fetch(targetUser);
		await member.timeout(duration, reason);
	}

	return string;
}
