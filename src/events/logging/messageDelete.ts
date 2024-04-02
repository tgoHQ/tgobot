//TODO make this work on older messages

import { Events, EmbedBuilder } from "discord.js";
import type { Event } from "../index.js";
import { CHANNEL_LOG, GUILD } from "../../lib/loadDiscordObjects.js";

export default {
	name: Events.MessageDelete,
	execute(message) {
		if (!message.guild || message.guild !== GUILD) return; //if message deleted is not from main guild, return

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

		CHANNEL_LOG.send({ embeds: [embed] });
	},
} satisfies Event<Events.MessageDelete>;
