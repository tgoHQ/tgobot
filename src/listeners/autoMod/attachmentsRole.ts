import { Events, Listener } from "@sapphire/framework";
import { Message } from "discord.js";
import { ROLE_ATTACHMENTS } from "../../lib/loadDiscordObjects.js";

export class AttachmentsRoleListener extends Listener {
	public constructor(
		context: Listener.LoaderContext,
		options: Listener.Options,
	) {
		super(context, {
			...options,
			event: Events.MessageCreate,
		});
	}

	public async run(message: Message) {
		if (message.author.bot) return;

		// ignore messages that don't have text content
		if (!message.content) return;

		if (!message.member) return;

		const attachmentsRole = await ROLE_ATTACHMENTS();

		// only add the role if they don't already have it
		if (message.member.roles.cache.has(attachmentsRole.id)) return;

		await message.member.roles.add(attachmentsRole);
	}
}
