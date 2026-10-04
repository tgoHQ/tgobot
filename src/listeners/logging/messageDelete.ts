import { extname } from "node:path";
import { Listener } from "@sapphire/framework";

import {
	ContainerBuilder,
	MediaGalleryBuilder,
	Message,
	MessageFlags,
	TextDisplayBuilder,
	type PartialMessage,
} from "discord.js";
import { CHANNEL_LOG, GUILD } from "#lib/loadDiscordObjects";
import { colors } from "#util/colors";
import { removeTabs } from "#util/removeTabs";

export class MessageDeleteListener extends Listener {
	public async run(message: Message | PartialMessage) {
		if (message.partial) return; //todo handle partials here by refetching the message. this will allow for logging of older message that are uncached
		if (!message.guild || message.guild !== (await GUILD())) return; //if message deleted is not from main guild, return

		const logChannel = await CHANNEL_LOG();

		if (message.channel === logChannel) return; //if message deleted is from the log channel, return

		//deleted attachments get purged from the cdn, so re-upload them to keep them viewable in the log
		const images = message.attachments
			.filter((attachment) => attachment.contentType?.startsWith("image/"))
			.map((attachment, id) => ({
				attachment: attachment.url,
				name: `image-${id}${extname(attachment.name)}`,
				spoiler: attachment.spoiler,
			}));

		//text displays cap at 4000 chars total, so leave room for the surrounding text
		const component = new ContainerBuilder()
			.addTextDisplayComponents([
				new TextDisplayBuilder().setContent(
					removeTabs(`
				## [Message Deleted](${message.url})
				Message by ${message.author} deleted in ${message.channel}.
				### Content
				${message.content.slice(0, 3500) || "Message did not contain text (embed or media)."}
				### Timestamp
				Posted <t:${Math.round(message.createdTimestamp / 1000)}:F>.
			`),
				),
			])
			.setAccentColor(colors.red.decimal);

		if (images.length > 0) {
			component.addMediaGalleryComponents(
				new MediaGalleryBuilder().addItems(
					images.map(
						(image) => (item) =>
							item
								.setURL(`attachment://${image.name}`)
								.setSpoiler(image.spoiler),
					),
				),
			);
		}

		await logChannel.send({
			components: [component],
			files: images.map(({ attachment, name }) => ({ attachment, name })),
			flags: [MessageFlags.IsComponentsV2],
			allowedMentions: {},
		});
	}
}
