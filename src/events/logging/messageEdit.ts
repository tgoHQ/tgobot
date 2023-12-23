//TODO make this work on older messages

import env from "../../util/env.js";
import { Events, EmbedBuilder, TextChannel } from "discord.js";

export default {
	name: Events.MessageUpdate,
	execute(client, oldMessage, newMessage) {
		if (newMessage.guild?.id != env.GUILD_ID) return; //if message edited is not from main guild, return

		if (oldMessage.content === newMessage.content) return; //if text content of message hasn't changed, return

		const logChannel = newMessage.guild.channels.cache.get(env.CHANNEL_LOG_ID);

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

		logChannel.send({ embeds: [embed] });
	},
};
