import { User } from "discord.js";
import env from "../../lib/util/env.js";
import client from "../../lib/discord/client.js";
import { Emoji } from "../../lib/util/emoji.js";

import userModerationLog from "../../lib/moderation/userModerationLog.js";
import humanizeDuration from "humanize-duration";

export default async function timeout({
	targetUser,
	reason,
	author,
	duration,
}: {
	targetUser: User;
	reason: string;
	author: User;
	duration: number; //duration in ms
}) {
	//dm the user

	const string = `${
		Emoji.Timeout
	} Timed out ${targetUser} for ${humanizeDuration(duration)}`;

	await userModerationLog({ user: targetUser, author, string, reason });

	const guild = await client.guilds.fetch(env.GUILD_ID);
	const member = await guild.members.fetch(targetUser);
	await member.timeout(duration, reason);

	return string;
}
