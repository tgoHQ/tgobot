import { User } from "discord.js";
import env from "../../../env.js";
import client from "../../../client.js";
import userModerationLog from "../userModerationLog.js";
import humanizeDuration from "humanize-duration";
import { Emoji } from "../../../emoji.js";

export default async function timeout({
	user,
	reason,
	author,
	duration,
}: {
	user: User;
	reason: string;
	author: User;
	duration: number; //duration in ms
}) {
	const string = `${Emoji.Timeout} Timed out ${user} for ${humanizeDuration(
		duration
	)}`;

	await userModerationLog({ user, author, string, reason });

	const guild = await client.guilds.fetch(env.GUILD_ID);
	const member = await guild.members.fetch(user);
	await member.timeout(duration, reason);

	return string;
}
