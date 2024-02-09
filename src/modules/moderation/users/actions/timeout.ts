import env from "../../../../util/env.js";
import client from "../../../../util/client.js";
import { User } from "discord.js";
import userModerationLog from "../userModerationLog.js";
import humanizeDuration from "humanize-duration";

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
	const string = `<:timeout:1049257820882747432> Timed out ${user} for ${humanizeDuration(
		duration
	)}`;

	await userModerationLog({ user, author, string, reason });

	//todo timeout the user
	const guild = await client.guilds.fetch(env.GUILD_ID);
	const member = await guild.members.fetch(user);
	await member.timeout(duration, reason);

	return string;
}
