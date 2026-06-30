import { Listener } from "@sapphire/framework";

import {
	type Collection,
	EmbedBuilder,
	type GuildChannel,
	type Message,
	type Snowflake,
	Events,
} from "discord.js";
import { CHANNEL_LOG, GUILD } from "../../lib/loadDiscordObjects.js";
import { colors } from "../../util/colors.js";

export class BulkDeleteListener extends Listener {
	public constructor(
		context: Listener.LoaderContext,
		options: Listener.Options,
	) {
		super(context, {
			...options,
			event: Events.MessageBulkDelete,
		});
	}

	public async run(
		messages: Collection<Snowflake, Message>,
		channel: GuildChannel,
	) {
		// Only log deletions from the main guild
		if (channel.guild !== (await GUILD())) return;

		// Format each deleted message into a single human-readable line
		const deletedMessageStrings = messages.map((message) => {
			return `[${message.createdAt.toUTCString()}] ${
				message.author?.globalName
			} (${message.author?.id}): ${
				message.content || "Message could not be displayed."
			}`;
		});

		// Attach the full message log as a text file (embeds can't hold it all)
		const buffer = Buffer.from(deletedMessageStrings.join("\n"));

		// Deduplicate authors by id so each affected user is listed once
		const affectedUsers = [
			...new Map(
				messages
					.filter((message) => message.author != null)
					.map((message) => [message.author!.id, message.author!]),
			).values(),
		];

		await (
			await CHANNEL_LOG()
		).send({
			embeds: [
				new EmbedBuilder()
					.setColor(colors.red.hex)
					.setTitle("Messages Bulk Deleted")
					.setDescription(`${messages.size} messages deleted in ${channel}.`)
					.addFields({
						name: "Users affected",
						value: affectedUsers.map((user) => user.toString()).join(", "),
					}),
			],
			files: [{ name: "messages.txt", attachment: buffer }],
		});
	}
}

//todo log who did the deletion
//todo post to modlog too, ignoring ones done by tgobot itself, because those are already handled directly
