import { Events, Listener } from "@sapphire/framework";

import { Message, TextChannel } from "discord.js";
import { type OpenAI } from "openai";
import { chatbot } from "../../lib/chatbot.js";
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
		// check if the message tags steve
		const steveTag = message.mentions.users.has(message.client.user?.id);
		if (!steveTag) return;

		// ignore messages from bots
		if (message?.member?.user.bot) return;

		//ignore if they don't have access
		const allowedToUse = message.member?.roles.cache.some(
			(role) =>
				role.id === env.ROLE_MODERATOR_ID ||
				role.id === env.ROLE_EXPERT_ID ||
				role.id === env.ROLE_BOOSTER_ID,
		);

		if (!allowedToUse) {
			// await message.reply(
			// 	"You don't have access to use this command! You can boost the server to gain access.",
			// );
			return;
		}

		if (message.channel.isSendable()) {
			await message.channel.sendTyping();
		}

		let context: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming["messages"] =
			[];
		let currentMessage = message;

		// check up the reply chain for context
		while (true) {
			const messageIsFromBot =
				currentMessage.author.id === message.client.user?.id;

			context.push({
				role: messageIsFromBot ? "assistant" : "user",
				content: currentMessage.content,
				name: `${currentMessage.author.username
					.replaceAll(".", "-")
					.replaceAll(" ", "-")}`,
			});

			const replyInfo = currentMessage.reference;
			if (!replyInfo?.messageId) break;

			const replyChannel = currentMessage.client.channels.cache.get(
				replyInfo.channelId,
			) as TextChannel | undefined;
			if (!replyChannel) break;
			//current message is now the reply
			currentMessage = await replyChannel.messages.fetch(replyInfo.messageId);
		}

		const completion = await chatbot(context.reverse());

		await message.reply(completion);
	}
}
