//TODO make this work on older messages

import { Events, EmbedBuilder, Client, Message, TextChannel } from "discord.js";

export default {
	name: Events.MessageDelete,
	execute(client, message) {
		//if message deleted is not from main guild
		if (!message.guild || message.guild.id != process.env.GUILD_ID) return;

		if (!process.env.TEMPORARY_LOG_CHANNEL_ID) {
			return;
		}

		const temporaryLogChannel = message.guild.channels.cache.get(
			process.env.TEMPORARY_LOG_CHANNEL_ID
		);

		if (!(temporaryLogChannel instanceof TextChannel)) {
			throw new Error(
				"Temporary log channel is not a valid text channel. Check your env variable TEMPORARY_LOG_CHANNEL_ID."
			);
		}

		const embed = new EmbedBuilder()
			.setColor("#ff3131")
			.setTitle("Message Deleted")
			.setURL(message.url)
			.setDescription(
				`Message deleted by ${message.author} in ${message.channel}.`
			)
			.setFields({ name: "Content", value: message.content });

		temporaryLogChannel.send({ embeds: [embed] });
	},
};
