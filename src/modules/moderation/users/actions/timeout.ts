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
	duration: number;
}) {
	const string = `<:timeout:1049257820882747432> Timed out ${user} for ${humanizeDuration(
		duration
	)}`;

	await userModerationLog({ user, author, string, reason });

	return string;
}
