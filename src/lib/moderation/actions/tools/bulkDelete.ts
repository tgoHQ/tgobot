import { GuildTextBasedChannel, User } from "discord.js";
import { Emoji } from "../../../util/emoji.js";
import { modToolLogEmbed } from "../../modLog.js";

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

	await modToolLogEmbed(string, author, reason);

	return string;
}
