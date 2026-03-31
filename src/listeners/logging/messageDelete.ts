import { Listener } from "@sapphire/framework";

import { EmbedBuilder, Message } from "discord.js";
import { CHANNEL_LOG, GUILD } from "../../lib/loadDiscordObjects.js";
import { colors } from "../../util/colors.js";

export class MessageDeleteListener extends Listener {
	public async run(message: Message) {
		if (!message.guild || message.guild !== (await GUILD())) return; //if message deleted is not from main guild, return

		const logChannel = await CHANNEL_LOG();

		if (message.channel === logChannel) return; //if message deleted is from the log channel, return

		const embed = new EmbedBuilder()
			.setColor(colors.red.hex)
			.setTitle("Message Deleted")
			.setURL(message.url)
			.setDescription(
				`Message by ${message.author} deleted in ${message.channel}.`,
			)
			.setFields(
				{
					name: "Content",
					value:
						message.content || "Message did not contain text (embed or media).",
				},
				{
					name: "Timestamp",
					value: `Posted ${`<t:${Math.round(message.createdTimestamp / 1000)}:F>.`}`,
				},
			);

		logChannel.send({ embeds: [embed] });
	}
}
