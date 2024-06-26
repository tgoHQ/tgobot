import { Listener } from "@sapphire/framework";

import { EmbedBuilder, Message } from "discord.js";
import { CHANNEL_LOG, GUILD } from "../../lib/discord/loadDiscordObjects.js";

export class MessageDeleteListener extends Listener {
	public async run(message: Message) {
		if (!message.guild || message.guild !== await GUILD()) return; //if message deleted is not from main guild, return

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

		(await CHANNEL_LOG()).send({ embeds: [embed] });
	}
}

//TODO make this work on older messages
