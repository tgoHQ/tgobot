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
		// ignore bots (the regular bot role includes attachment perms)
		if (message.author.bot) return;

		// ignore messages that don't have text content
		if (!message.content) return;

		// if this message itself has an attachment,
		// that means they are actively in the process of triggering the attachment spammer honeypot
		// so don't give them the role
		if (message.attachments.size > 0) return;

		// this is just typescript ceremony
		if (!message.member) return;

		// get the role
		const attachmentsRole = await ROLE_ATTACHMENTS();

		// only add the role if they don't already have it
		if (message.member.roles.cache.has(attachmentsRole.id)) return;

		await message.member.roles.add(attachmentsRole);
	}
}
