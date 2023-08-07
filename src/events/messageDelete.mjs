//TODO make this work on older messages

import { Events, EmbedBuilder } from "discord.js";

export default {
	name: Events.MessageDelete,
	execute(client, message) {
		if (message.guild?.id != process.env.GUILD_ID) {
			console.log("message deleted from outside main guild");
			return;
		}

		const temporaryLogChannel = message.guild.channels.cache.get(
			process.env.TEMPORARY_LOG_CHANNEL_ID
		);

		const embed = new EmbedBuilder()
			.setColor("ff3131")
			.setTitle("Message Deleted")
			.setURL(message.url)
			.setDescription(
				`Message deleted by ${message.author} in ${message.channel}.`
			)
			.setFields({ name: "Content", value: message.content });

		temporaryLogChannel.send({ embeds: [embed] });
	},
};
