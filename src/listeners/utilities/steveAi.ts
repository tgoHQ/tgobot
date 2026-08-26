import { Events, Listener } from "@sapphire/framework";

import { Message, TextChannel } from "discord.js";
import { chatbot, type ChatbotMessage } from "../../lib/llm/chatbot.js";
import { env } from "../../env.js";

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

		const context: ChatbotMessage[] = [];
		let currentMessage = message;

		// check up the reply chain for context
		while (true) {
			const messageIsFromBot =
				currentMessage.author.id === message.client.user.id;

			context.push({
				role: messageIsFromBot ? "assistant" : "user",
				content: currentMessage.content,
			});

			const replyInfo = currentMessage.reference;
			if (!replyInfo?.messageId) break;

			const replyChannel = currentMessage.client.channels.cache.get(
				replyInfo.channelId,
			);
			if (!replyChannel) break;
			if (!(replyChannel instanceof TextChannel))
				throw new Error("Reply channel is not a text channel");

			//new current message is now the reply
			currentMessage = await replyChannel.messages.fetch(replyInfo.messageId);
		}

		const { text } = await chatbot({
			messages: context.reverse(),
			currentChannel: message.channel,
		});

		await message.reply(text);
	}
}
