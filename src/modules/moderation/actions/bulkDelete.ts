import { GuildTextBasedChannel, User } from "discord.js";
import modToolLog from "../moderationToolLog.js";

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
	const string = `<:delete:1049226132622409749> Bulk deleted ${messages.size} messages in ${channel}`;

	await modToolLog({
		string,
		author,
		reason,
	});

	return string;
}
