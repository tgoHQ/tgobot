import { GuildTextBasedChannel, User } from "discord.js";
import { modlog } from "../modlog.js";
import humanizeDuration from "humanize-duration";
import { Emoji } from "../../../../util/emoji.js";

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
		interval,
	)} in ${targetChannel}`;

	await modlog.postToolRun({ string, author, reason });

	return string;
}
