import { Events, Listener } from "@sapphire/framework";
import { Message } from "discord.js";
import { ROLE_ATTACHMENTS } from "../../lib/loadDiscordObjects.js";
import { timeout } from "../../lib/moderation/actions/users/timeout.js";

const timeoutLength = 6 * 60 * 60 * 1000;

export class AttachmentHoneypotListener extends Listener {
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

		// only care about messages with a file attachment
		if (message.attachments.size === 0) return;

		if (!message.member) return;

		const attachmentsRole = await ROLE_ATTACHMENTS();

		// if they already have the attachments role, they're trusted
		if (message.member.roles.cache.has(attachmentsRole.id)) return;

		await timeout({
			targetUser: message.author,
			author: message.client.user,
			reason: "Triggered the attachment spammer honeypot",
			duration: timeoutLength,
		});
	}
}
