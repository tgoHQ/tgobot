//TODO make this work on older messages

import env from "../../lib/env.js";
import { Events, EmbedBuilder, BaseGuildTextChannel } from "discord.js";
import type { Event } from "../index.js";
import { CHANNEL_LOG } from "../../lib/loadDiscordObjects.js";

export default {
	name: Events.MessageUpdate,
	execute(oldMessage, newMessage) {
		if (newMessage.guild?.id != env.GUILD_ID) return; //if message edited is not from main guild, return

		if (oldMessage.content === newMessage.content) return; //if text content of message hasn't changed, return
		if (!oldMessage.content || !newMessage.content) return; //if messages don't have content, return

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

		CHANNEL_LOG.send({ embeds: [embed] });
	},
} satisfies Event<Events.MessageUpdate>;
