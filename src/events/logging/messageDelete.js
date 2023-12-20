//TODO make this work on older messages

import config from "../../config";
import { Events, EmbedBuilder, TextChannel } from "discord.js";

export default {
	name: Events.MessageDelete,
	execute(client, message) {
		if (!message.guild || message.guild.id != config.GUILD_ID) return; //if message deleted is not from main guild, return

		const logChannel = message.guild.channels.cache.get(config.LOG_CHANNEL_ID);

		if (!(logChannel instanceof TextChannel)) {
			throw new Error(
				"Log channel is not a valid text channel. Check your env variable LOG_CHANNEL_ID."
			);
		}

		const embed = new EmbedBuilder()
			.setColor("#ff3131")
			.setTitle("Message Deleted")
			.setURL(message.url)
			.setDescription(
				`Message by ${message.author} deleted in ${message.channel}.`
			)
			.setFields({
				name: "Content",
				value: message.content || "Message could not be displayed.",
			});

		logChannel.send({ embeds: [embed] });
	},
};
