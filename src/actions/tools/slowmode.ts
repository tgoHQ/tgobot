import { GuildTextBasedChannel, User } from "discord.js";
import modToolLog from "../../lib/moderation/moderationToolLog.js";
import humanizeDuration from "humanize-duration";
import { Emoji } from "../../lib/util/emoji.js";

export default async function slowmode({
	channel,
	reason,
	author,
	interval,
}: {
	channel: GuildTextBasedChannel;
	reason: string;
	author: User;
	interval: number; //slowmode interval in ms;
}) {
	channel.setRateLimitPerUser(interval / 1000, reason);

	const string = `${Emoji.Slowmode} Set slowmode to ${humanizeDuration(
		interval
	)} in ${channel}`;
	//multiply by 1000 to get ms, then humanize into string

	await modToolLog({
		string,
		author,
		reason,
	});

	return string;
}
