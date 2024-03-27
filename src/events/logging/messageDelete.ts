//TODO make this work on older messages

import env from "../../lib/env.js";
import { Events, EmbedBuilder, BaseGuildTextChannel } from "discord.js";
import type { Event } from "../index.js";

export default {
	name: Events.MessageDelete,
	execute(message) {
		if (!message.guild || message.guild.id != env.GUILD_ID) return; //if message deleted is not from main guild, return

		const logChannel = message.guild.channels.cache.get(env.CHANNEL_LOG_ID);

		if (!(logChannel instanceof BaseGuildTextChannel)) {
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
} satisfies Event<Events.MessageDelete>;
