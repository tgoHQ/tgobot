import { Listener } from "@sapphire/framework";

import {
	Collection,
	EmbedBuilder,
	GuildChannel,
	Message,
	Snowflake,
} from "discord.js";
import { CHANNEL_LOG, GUILD } from "../../lib/loadDiscordObjects.js";
import { colors } from "../../util/constants.js";

export class ReadyListener extends Listener {
	public async run(
		messages: Collection<Snowflake, Message>,
		channel: GuildChannel,
	) {
		if (channel.guild !== (await GUILD())) return; //if not from main guild, return

		const deletedMessageStrings = messages.map((message) => {
			return `[${message.createdAt.toUTCString()}] ${
				message.author?.globalName
			} (${message.author?.id}): ${
				message.content || "Message could not be displayed."
			}`;
		});

		const oneString = deletedMessageStrings.join("\n");

		const buffer = Buffer.from(oneString);

		(await CHANNEL_LOG()).send({
			embeds: [
				new EmbedBuilder()
					.setColor(colors.red.hex)
					.setTitle("Messages Bulk Deleted")
					.setDescription(`${messages.size} messages deleted in ${channel}.`),
			],
			files: [{ name: "messages.txt", attachment: buffer }],
		});
	}
}
