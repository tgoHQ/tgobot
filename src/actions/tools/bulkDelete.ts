import { GuildTextBasedChannel, User } from "discord.js";
import modlogToolEmbed from "../../lib/moderation/modlogToolEmbed.js";
import { Emoji } from "../../lib/util/emoji.js";

export default async function bulkDelete({
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

	await modlogToolEmbed({
		string,
		author,
		reason,
	});

	return string;
}
