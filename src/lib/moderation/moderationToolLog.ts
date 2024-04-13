//logs use of moderator tools that don't target a specific user (clean, slowmode, lockdown, etc.)
//only for sending messages to log channel. does not need to be stored in DB

import { User, EmbedBuilder } from "discord.js";
import { CHANNEL_MODLOG } from "../discord/loadDiscordObjects.js";

export default async function modToolLog({
	string,
	author,
	reason,
}: {
	string: string;
	author: User;
	reason: string;
}) {
	const embed = new EmbedBuilder()
		.setColor("#137c5a")
		.setAuthor({
			name: author.username,
			iconURL: author.displayAvatarURL(),
		})
		.setDescription(string)
		.addFields({ name: "Reason", value: reason });

	return await (await CHANNEL_MODLOG.send({ embeds: [embed] })).crosspost();
}
