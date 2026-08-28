import type { GuildTextBasedChannel, User } from "discord.js";
import { Emoji } from "#util/emoji";
import { handleToolModAction } from "#lib/moderation/actions/tools/index";

/** mod action to bulk delete messages in a channel */
export async function bulkDelete({
	targetChannel,
	reason,
	author,
	number,
}: {
	targetChannel: GuildTextBasedChannel;
	reason: string;
	author: User;
	number: number;
}) {
	const messages = await targetChannel.bulkDelete(number);

	const string = `${Emoji.Delete} Bulk deleted ${messages.size} messages in ${targetChannel}`;

	await handleToolModAction({ string, author, reason });

	return string;
}
