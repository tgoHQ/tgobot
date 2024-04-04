import { GuildTextBasedChannel, User } from "discord.js";
import modToolLog from "./moderationToolLog.js";
import humanizeDuration from "humanize-duration";
import { Emoji } from "../../emoji.js";

export default async function slowmode({
	channel,
	reason,
	author,
	interval,
}: {
	channel: GuildTextBasedChannel;
	reason: string;
	author: User;
	interval: number; //slowmode interval in seconds;
}) {
	channel.setRateLimitPerUser(interval, reason);

	const string = `${Emoji.Slowmode} Set slowmode to ${humanizeDuration(
		interval * 1000
	)} in ${channel}`;
	//multiply by 1000 to get ms, then humanize into string

	await modToolLog({
		string,
		author,
		reason,
	});

	return string;
}
