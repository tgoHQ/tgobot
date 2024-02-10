//logs use of moderator tools that don't target a specific user (clean, slowmode, lockdown, etc.)
//only for sending messages to log channel. does not need to be stored in DB

import { User, EmbedBuilder } from "discord.js";
import postModLogChannel from "../moglogchannel.js";

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

	//todo import channel from somewhere already validated and use channel.send right here
	postModLogChannel(embed);
}
