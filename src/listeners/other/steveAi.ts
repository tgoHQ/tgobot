import { Events, Listener } from "@sapphire/framework";

import { Message } from "discord.js";
import { chatbot, type ChatbotMessage } from "#lib/llm/chatbot";
import { env } from "#env";
import type { FilePart } from "ai";

export class SteveAiMessageListener extends Listener {
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
		// check if the message pings steve (this will also trigger on replies with ping turned on)
		const steveTag = message.mentions.users.has(message.client.user.id);
		if (!steveTag) return;

		// ignore messages from bots
		if (message?.member?.user.bot) return;

		if (!message.channel || message.channel.isDMBased()) return;

		//ignore if they don't have access
		const allowedToUse = message.member?.roles.cache.some(
			(role) => role.id === env.ROLE_PERKS_ID,
		);
		if (!allowedToUse) {
			return;
		}

		if (message.channel.isSendable()) {
			await message.channel.sendTyping();
		}

		const history: ChatbotMessage[] = [];
		let currentMessage = message;

		async function processMessage(message: Message) {
			const images: FilePart[] = [...message.attachments.values()].flatMap(
				(attachment) => {
					console.log(attachment.contentType);
					
					if (!attachment.contentType) return [];

					if (!attachment.contentType.startsWith("image/")) {
						return [];
					}

					return [
						{
							type: "file",
							mediaType: attachment.contentType,
							fileName: attachment.name,
							data: new URL(attachment.url),
						},
					];
				},
			);

			console.log(images);

			const data: ChatbotMessage = {
				role:
					message.author.id === message.client.user.id ? "assistant" : "user",
				content: [
					{
						type: "text",
						text: message.content,
					},
					...images,
				],
			};

			const repliedTo = message.reference?.messageId
				? await message.channel.messages.fetch(message.reference.messageId)
				: null;

			return {
				chatbotMessage: data,
				repliedTo,
			};
		}

		// walk up the reply chain to reconstruct the message history
		while (true) {
			const { chatbotMessage, repliedTo } =
				await processMessage(currentMessage);

			history.push(chatbotMessage);

			if (!repliedTo) break;
			currentMessage = repliedTo;
		}

		const { text } = await chatbot({
			messages: history.reverse(),
			currentChannel: message.channel,
			cache: true,
		});

		await message.reply(text);
	}
}
