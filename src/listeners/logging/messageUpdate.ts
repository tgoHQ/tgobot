import { Listener } from "@sapphire/framework";

import env from "../../lib/util/env.js";
import { Message, EmbedBuilder } from "discord.js";
import { CHANNEL_LOG } from "../../lib/discord/loadDiscordObjects.js";

export class MessageUpdateListener extends Listener {
	public async run(oldMessage: Message, newMessage: Message) {
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

		(await CHANNEL_LOG()).send({ embeds: [embed] });
	}
}

//TODO make this work on older messages
