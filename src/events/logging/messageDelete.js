//TODO make this work on older messages

import { Events, EmbedBuilder } from "discord.js";

export default {
	name: Events.MessageDelete,
	execute(client, message) {
		if (!message.guild || message.guild.id != process.env.GUILD_ID) return; //if message deleted is not from main guild, return

		const embed = new EmbedBuilder()
			.setColor("#ff3131")
			.setTitle("Message Deleted")
			.setURL(message.url)
			.setDescription(
				`Message deleted by ${message.author} in ${message.channel}.`
			)
			.setFields({ name: "Content", value: message.content });

		client.env.temporaryLogChannel.send({ embeds: [embed] });
	},
};
