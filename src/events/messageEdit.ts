//TODO make this work on older messages

import { Events, EmbedBuilder, Client } from "discord.js";

export default {
	name: Events.MessageUpdate,
	execute(client: Client, oldMessage, newMessage) {
		//if message edited is not from main guild
		if (newMessage.guild?.id != process.env.GUILD_ID) return;

		//if text content hasn't changed
		if (oldMessage.content === newMessage.content) return;

		const temporaryLogChannel = newMessage.guild.channels.cache.get(
			process.env.TEMPORARY_LOG_CHANNEL_ID
		);

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
