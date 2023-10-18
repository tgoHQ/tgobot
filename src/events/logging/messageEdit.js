//TODO make this work on older messages

import { Events, EmbedBuilder, Client } from "discord.js";

export default {
	name: Events.MessageUpdate,
	execute(client, oldMessage, newMessage) {
		if (newMessage.guild?.id != process.env.GUILD_ID) return; //if message edited is not from main guild, return

		if (oldMessage.content === newMessage.content) return; //if text content of message hasn't changed, return

		const temporaryLogChannel = newMessage.guild.channels.cache.get(
			process.env.TEMPORARY_LOG_CHANNEL_ID
		);

		if (!(temporaryLogChannel instanceof TextChannel)) {
			throw new Error(
				"Temporary log channel is not a valid text channel. Check your env variable TEMPORARY_LOG_CHANNEL_ID."
			);
		}

		const embed = new EmbedBuilder()
			.setColor("#4a78fc")
			.setTitle("Message Edited")
			.setURL(newMessage.url)
			.setDescription(
				`Message edited by ${newMessage.author} in ${newMessage.channel}.`
			)
			.setFields(
				{ name: "Before", value: oldMessage.content },
				{ name: "After", value: newMessage.content }
			);

		temporaryLogChannel.send({ embeds: [embed] });
	},
};
