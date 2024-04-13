import { GuildTextBasedChannel, User } from "discord.js";
import modToolLog from "../../lib/moderation/moderationToolLog.js";
import { Emoji } from "../../lib/util/emoji.js";

export default async function bulkDelete({
	channel,
	reason,
	author,
	number,
}: {
	channel: GuildTextBasedChannel;
	reason: string;
	author: User;
	number: number;
}) {
	const messages = await channel.bulkDelete(number);

	const string = `${Emoji.Delete} Bulk deleted ${messages.size} messages in ${channel}`;

	await modToolLog({
		string,
		author,
		reason,
	});

	return string;
}