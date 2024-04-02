//TODO make this work on older messages

import { Events, EmbedBuilder } from "discord.js";
import type { Event } from "../index.js";
import { CHANNEL_LOG, GUILD } from "../../lib/loadDiscordObjects.js";

export default {
	name: Events.MessageBulkDelete,
	execute(messages, channel) {
		if (channel.guild !== GUILD) return; //if message deleted is not from main guild, return

		const deletedMessageStrings = messages.map((message) => {
			return `[${message.createdAt.toUTCString()}] ${
				message.author?.globalName
			} (${message.author?.id}): ${
				message.content || "Message could not be displayed."
			}`;
		});

		const oneString = deletedMessageStrings.join("\n");

		const buffer = Buffer.from(oneString);

		CHANNEL_LOG.send({
			embeds: [
				new EmbedBuilder()
					.setColor("#ff3131")
					.setTitle("Messages Bulk Deleted")
					.setDescription(`${messages.size} messages deleted in ${channel}.`),
			],
			files: [{ name: "messages.txt", attachment: buffer }],
		});
	},
} satisfies Event<Events.MessageBulkDelete>;
