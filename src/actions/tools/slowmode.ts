import { GuildTextBasedChannel, User } from "discord.js";
import modToolLog from "../../lib/moderation/moderationToolLog.js";
import humanizeDuration from "humanize-duration";
import { Emoji } from "../../lib/util/emoji.js";

export default async function slowmode({
	targetChannel,
	reason,
	author,
	interval,
}: {
	targetChannel: GuildTextBasedChannel;
	reason: string;
	author: User;
	/** Slowmode interval in milliseconds */
	interval: number;
}) {
	targetChannel.setRateLimitPerUser(interval / 1000, reason);

	const string = `${Emoji.Slowmode} Set slowmode to ${humanizeDuration(
		interval
	)} in ${targetChannel}`;
	//multiply by 1000 to get ms, then humanize into string

	await modToolLog({
		string,
		author,
		reason,
	});

	return string;
}
