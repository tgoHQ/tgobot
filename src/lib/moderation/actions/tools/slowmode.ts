import type { GuildTextBasedChannel, User } from "discord.js";
import { handleToolModAction } from "./index.js";
import humanizeDuration from "humanize-duration";
import { Emoji } from "../../../../util/emoji.js";

/** mod action to set the slowmode in a channel */
export async function slowmode({
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

	await handleToolModAction({ string, author, reason });

	return string;
}
